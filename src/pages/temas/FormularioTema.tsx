/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect, useState } from 'react'; // Removido React
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { atualizar, buscar, cadastrar } from '@/services/Service';
import type Tema from '@/models/Tema';
import { AuthContext } from '@/contexts/AuthContext';
import { ToastAlerta } from '@/utils/ToastAlerta';
import { Spinner } from '@phosphor-icons/react/dist/icons/Spinner';

// O Schema Zod agora usa z.coerce.number() para lidar com a conversão do ID de forma mais robusta
const temaSchema = z.object({
  // z.coerce.number() tenta converter o valor para um número.
  // .optional() permite que o valor seja undefined (para novos cadastros).
  // Se o input for string vazia, z.coerce.number() resultaria em NaN, mas optional() lida com undefined.
  // É importante que o input hidden tenha um valor vazio string para novos cadastros.
  id: z.coerce.number().optional(),
  descricao: z.string()
    .min(1, { message: 'A descrição do tema é obrigatória.' })
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres.' })
    .max(255, { message: 'A descrição deve ter no máximo 255 caracteres.' }),
});

type TemaFormInputs = z.infer<typeof temaSchema>;

function FormularioTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TemaFormInputs>({
    resolver: zodResolver(temaSchema),
    defaultValues: {
      id: undefined, 
      descricao: '',
    },
  });

  async function buscarTemaPorId(temaId: string) {
    if (token === '') {
      ToastAlerta('Sua sessão expirou, faça login novamente', 'erro');
      handleLogout();
      navigate('/login');
      return;
    }

    try {
      // Busca o tema pelo ID
      await buscar(`/temas/${temaId}`, (data: Tema) => {
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

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId(id);
    }
  }, [id]);

  const onSubmit = async (temaData: TemaFormInputs) => {
    if (!token) {
      toast.error('Operação não permitida sem login. Faça login.');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    console.log("Dados do tema sendo enviados:", temaData); // Log para depuração

    try {
      if (id !== undefined) {
        await atualizar(`/temas`, temaData, () => {}, {
          headers: { Authorization: token },
        });
        ToastAlerta('Tema atualizado com sucesso! 🎉', 'sucesso');
      } else {
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
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Erros de validação do formulário:", errors); // Log para depuração
    }
  }, [errors]);

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner
            size={80}
            className="animate-spin text-[var(--primary)]"
          />
        </div>
      )}

      <div className="flex justify-center items-center h-screen w-screen bg-[var(--background)] relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>

        <form
          onSubmit={handleSubmit(onSubmit)} // handleSubmit é chamado diretamente aqui
          className="flex flex-col w-full max-w-lg p-8 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm gap-6 border-4 border-[var(--secondary)] z-10 animate-fade-in-up transform transition-all duration-300 hover:scale-[1.02]"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary)] text-center mb-6 drop-shadow-lg">
            {id ? 'Editar Tema! ✏️' : 'Novo Tema! ✨'}
          </h1>

          <input type="hidden" {...register('id')} />

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="descricao" className="text-[var(--primary)] font-semibold text-lg">
              Nome do Tema:
            </label>
            <input
              id="descricao"
              type="text"
              className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
              placeholder="Ex: Aventuras, Amizade, Descobertas"
              {...register('descricao')}
            />
            {errors.descricao && (
              <p className="mt-1 text-sm text-[var(--destructive)]">{errors.descricao.message}</p>
            )}
          </div>

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
              disabled={isSubmitting}
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
