/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { atualizar, buscar, cadastrar } from '@/services/Service';
import type Tema from '@/models/Tema';
import { AuthContext } from '@/contexts/AuthContext';
import { ToastAlerta } from '@/utils/ToastAlerta';
import { Spinner } from '@phosphor-icons/react/dist/icons/Spinner'; // Usando o Spinner que você importou

// O Schema Zod agora usa z.preprocess para lidar com a conversão do ID
const temaSchema = z.object({
  // z.preprocess:
  // 1. Recebe o valor (val) do input (que pode ser string ou undefined/null)
  // 2. Se for uma string vazia, retorna undefined (para novos cadastros)
  // 3. Caso contrário, tenta converter para Number
  // 4. O z.number().optional() então valida o resultado (number ou undefined)
  id: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().optional()),
  descricao: z.string()
    .min(1, { message: 'A descrição do tema é obrigatória.' })
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres.' })
    .max(255, { message: 'A descrição deve ter no máximo 255 caracteres.' }),
});

type TemaFormInputs = z.infer<typeof temaSchema>;

function FormularioTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // O isLoading do formulário para controlar o spinner de submissão
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Use o setValue para preencher o formulário quando estiver em modo de edição
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TemaFormInputs>({
    resolver: zodResolver(temaSchema),
    defaultValues: {
      id: undefined, 
      descricao: '',
    },
  });

  // Função para buscar o tema e preencher o formulário
  async function buscarTemaPorId(temaId: string) {
    if (token === '') { // Verifica o token antes de buscar
      ToastAlerta('Sua sessão expirou, faça login novamente', 'erro');
      handleLogout();
      navigate('/login'); // Redireciona para login se não tiver token
      return;
    }

    try {
      const response = await buscar(`/temas/${temaId}`, (data: Tema) => {
        setValue('id', data.id);
        setValue('descricao', data.descricao);
      }, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
        ToastAlerta('Sua sessão expirou, faça login novamente', 'erro');
      } else {
        ToastAlerta('Erro ao buscar o tema.', 'erro');
        console.error(error);
      }
    }
  }

  // Efeito para carregar os dados do tema se for uma edição
  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId(id);
    }
  }, [id, token, navigate, handleLogout]); // Adicione navigate e handleLogout como dependências

  // Função de submissão que será chamada pelo handleSubmit do react-hook-form
  const onSubmit = async (temaData: TemaFormInputs) => { // Renomeado para temaData para evitar conflito com o tipo Tema
    if (!token) {
      toast.error('Operação não permitida sem login. Faça login.');
      navigate('/login');
      return;
    }

    setIsSubmitting(true); // Ativa o spinner antes de enviar a requisição

    // Adicionado console.log para verificar os dados enviados
    console.log("Dados do tema sendo enviados:", temaData);

    try {
      if (id !== undefined) {
        // Para atualização, o ID deve ser enviado no corpo da requisição
        await atualizar(`/temas`, temaData, () => {}, {
          headers: { Authorization: token },
        });
        ToastAlerta('Tema atualizado com sucesso! 🎉', 'sucesso');
      } else {
        // Para cadastro, o ID não deve ser enviado (será gerado pelo backend)
        // O temaData já terá id: undefined, o que é o comportamento esperado.
        await cadastrar(`/temas`, temaData, () => {}, {
          headers: { Authorization: token },
        });
        ToastAlerta('Tema cadastrado com sucesso! ✨', 'sucesso');
      }
      navigate('/temas');
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
        ToastAlerta('Sua sessão expirou, faça login novamente', 'erro');
      } else {
        ToastAlerta('Erro ao salvar o tema!', 'erro');
        console.error(error);
      }
    } finally {
      setIsSubmitting(false); // Desativa o spinner após a requisição (sucesso ou erro)
    }
  };

  // Adicionado useEffect para logar os erros de validação
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Erros de validação do formulário:", errors);
    }
  }, [errors]); // Dispara sempre que o objeto 'errors' mudar

  return (
    <>
      {/* Spinner global para submissão */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner
            size={80}
            className="animate-spin text-[var(--primary)]" // Cor do spinner ajustada
          />
        </div>
      )}

      {/* Contêiner principal da página do formulário de tema */}
      <div className="flex justify-center items-center h-screen w-screen bg-[var(--background)] relative overflow-hidden">
        {/* Elementos decorativos animados (bolhas coloridas), consistentes com as outras páginas */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>

        {/* Formulário de Tema */}
        <form
          onSubmit={(event) => {
            console.log("Form submission initiated.");
            handleSubmit(onSubmit)(event);
          }}
          className="flex flex-col w-full max-w-lg p-8 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm gap-6 border-4 border-[var(--secondary)] z-10 animate-fade-in-up transform transition-all duration-300 hover:scale-[1.02]"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary)] text-center mb-6 drop-shadow-lg">
            {id ? 'Editar Tema! ✏️' : 'Novo Tema! ✨'}
          </h1>

          {/* O input hidden para o ID, sem valueAsNumber: true, pois o preprocess cuida disso */}
          <input type="hidden" {...register('id')} />

          {/* Campo Descrição do Tema */}
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="descricao" className="text-[var(--primary)] font-semibold text-lg">
              Nome do Tema:
            </label>
            <input
              id="descricao"
              type="text"
              className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
              placeholder="Ex: Aventuras, Amizade, Descobertas"
              {...register('descricao')} // Conecta o input ao React Hook Form
            />
            {errors.descricao && (
              <p className="mt-1 text-sm text-[var(--destructive)]">{errors.descricao.message}</p>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row justify-between w-full gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate('/temas')}
              className="flex-1 rounded-full text-[var(--secondary-foreground)] bg-[var(--secondary)] hover:bg-[var(--secondary-foreground)] hover:text-[var(--secondary)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md transform hover:scale-105"
            >
              Cancelar 👈
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={isSubmitting} // Desabilita o botão enquanto o formulário está sendo submetido
            >
              {isSubmitting ? (
                <Spinner size={24} className="animate-spin text-[var(--primary-foreground)]" />
              ) : (
                id ? 'Atualizar Tema! ✅' : 'Cadastrar Tema! 🚀'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormularioTema;
