/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios'; // Mantenha o axios para isAxiosError
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cadastrarLocal } from '../../services/Service'; // <<< Importa do Service.ts
import type { CadastroRequestDTO } from '@/dtos/CadastroRequestDTO';


// Remova a const API_BASE_URL daqui
// const API_BASE_URL = "https://blogpessoal-esoc.onrender.com";

function CadastroPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [foto, setFoto] = useState('');

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem!');
      return;
    }

    if (senha.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres!');
      return;
    }

    try {
      const requestBody: CadastroRequestDTO = {
        nome: nome,
        usuario: email,
        senha: senha,
        foto: foto || undefined
      };
      // Usa a função do Service.ts
      const response = await cadastrarLocal(requestBody);

      console.log('Cadastro bem-sucedido!', response.data);
      toast.success('Cadastro realizado com sucesso! Agora você pode fazer login.');
      navigate('/login');

    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 400) {
                toast.error(`Erro no cadastro: ${error.response.data.message || 'Verifique se o email já está cadastrado ou os dados informados.'}`);
            } else {
                console.error('Erro no cadastro:', error.response?.data || error.message);
                toast.error('Ocorreu um erro ao tentar cadastrar. Tente novamente.');
            }
        } else {
            console.error('Erro desconhecido no cadastro:', error);
            toast.error('Ocorreu um erro inesperado. Tente novamente.');
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleCadastro}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nome" className="sr-only">Nome</label>
              <input id="nome" name="nome" type="text" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome Completo"
                value={nome} onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={senha} onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirmar Senha</label>
              <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar Senha"
                value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="foto" className="sr-only">Link da Foto</label>
              <input id="foto" name="foto" type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Link da Foto (Opcional)"
                value={foto} onChange={(e) => setFoto(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default CadastroPage;