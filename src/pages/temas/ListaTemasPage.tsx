import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAllTemas, tratarErro } from '../../services/Service';

import { toast } from 'react-toastify';
import type Tema from '@/models/Tema';

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const { userToken } = useAuth(); // Ainda precisamos do token para as chamadas de API
  const navigate = useNavigate();

  // REMOVA ESTE BLOCO useEffect, OU COMENTE-O TEMPORARIAMENTE
  /*
  useEffect(() => {
    if (!userToken) {
      toast.info('Você precisa estar logado para acessar os temas.');
      navigate('/login');
    }
  }, [userToken, navigate]);
  */

  async function buscarTemas() {
    if (userToken) { // Esta verificação é necessária porque a API exige token
      try {
        const response = await getAllTemas(userToken);
        setTemas(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        tratarErro(error, 'Erro ao buscar temas.');
      }
    } else {
        // Mensagem para o usuário caso não esteja logado e não possa buscar temas
        toast.warn('Token de usuário não disponível. Não foi possível carregar os temas.');
        console.log('Token de usuário não disponível para buscar temas.');
    }
  }

  useEffect(() => {
    buscarTemas();
  }, [userToken]); // Mantenha este useEffect para chamar buscarTemas quando o token (se disponível) mudar

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Temas Cadastrados
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/cadastroTema')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Cadastrar Novo Tema
        </button>
      </div>

      {temas.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">Nenhum tema encontrado. Cadastre um novo!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-100 border-b border-indigo-200">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descrição</th>
                <th className="py-3 px-6 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {temas.map((tema) => (
                <tr key={tema.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-800">{tema.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{tema.descricao}</td>
                  <td className="py-4 px-6 text-center text-sm">
                    <button
                      onClick={() => navigate(`/editarTema/${tema.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => navigate(`/deletarTema/${tema.id}`)}
                      className="text-red-600 hover:text-red-900 transition duration-300"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListaTemas;