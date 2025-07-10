/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { atualizar, buscar, cadastrar, tratarErro } from '@/services/Service';
import type Tema from '@/models/Tema';
import { useEffect } from 'react';

const temaSchema = z.object({
  id: z.number().optional(),
  descricao: z.string()
    .min(1, { message: 'A descrição do tema é obrigatória.' })
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres.' })
    .max(255, { message: 'A descrição deve ter no máximo 255 caracteres.' }),
});

type TemaFormInputs = z.infer<typeof temaSchema>;

function FormularioTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { userToken } = useAuth(); // Ainda precisamos do token para as chamadas de API

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TemaFormInputs>({
    resolver: zodResolver(temaSchema),
    defaultValues: {
      id: undefined,
      descricao: '',
    },
  });

  // REMOVA ESTE BLOCO useEffect, OU COMENTE-O TEMPORARIAMENTE
  /*
  useEffect(() => {
    if (!userToken) {
      toast.info('Você precisa estar logado para acessar este formulário.');
      navigate('/login');
    }
  }, [userToken, navigate]);
  */

  useEffect(() => {
    if (id) {
      buscarTemaPorId(id);
    }
  }, [id, userToken]); // Mantenha este useEffect para buscarTemaPorId quando o token ou ID mudar

  async function buscarTemaPorId(temaId: string) {
    if (userToken) { // Esta verificação é necessária porque a API exige token
      try {
        const temaExistente = await buscar<Tema>(`/temas/${temaId}`, userToken);
        setValue('id', temaExistente.id);
        setValue('descricao', temaExistente.descricao);
      } catch (error: any) {
        tratarErro(error, 'Erro ao buscar o tema para edição.');
        navigate('/temas');
      }
    } else {
         toast.warn('Token de usuário não disponível. Não foi possível carregar o tema.');
         console.log('Token de usuário não disponível para buscar tema para edição.');
         navigate('/temas'); // Redireciona de volta se não puder carregar
    }
  }

  const onSubmit = async (data: TemaFormInputs) => {
    if (!userToken) { // Verificação extra antes de enviar a requisição
        toast.error('Operação não permitida sem login. Faça login.');
        navigate('/login');
        return;
    }

    try {
      if (id) {
        await atualizar<Tema>(`/temas`, data, userToken);
        toast.success('Tema atualizado com sucesso!');
      } else {
        await cadastrar<Tema>(`/temas`, data, userToken);
        toast.success('Tema cadastrado com sucesso!');
      }
      navigate('/temas');
    } catch (error: any) {
      tratarErro(error, 'Erro ao salvar o tema.');
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh] py-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        {id ? 'Editar Tema' : 'Cadastrar Novo Tema'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <input type="hidden" {...register('id', { valueAsNumber: true })} />

        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
            Descrição do Tema:
          </label>
          <Input
            id="descricao"
            type="text"
            className="mt-1 block w-full"
            placeholder="Insira a descrição do tema"
            {...register('descricao')}
          />
          {errors.descricao && (
            <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/temas')}
            className="px-4 py-2"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {id ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormularioTema;