/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { loginLocal, loginGoogle } from '../../services/Service'; // <<< Importa do Service.ts

import axios from 'axios';
import type { LoginRequestDTO } from '@/dtos/LoginRequestDTO';
import type { GoogleLoginRequestDTO } from '@/dtos/GoogleRequestDTO';



function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    console.log('Login do Google bem-sucedido!', credentialResponse);
    console.log('ID Token:', credentialResponse.credential);

    if (credentialResponse.credential) {
      try {
        const requestBody: GoogleLoginRequestDTO = { idToken: credentialResponse.credential };
        // Usa a função do Service.ts, que já usa a instância 'api'
        const authResponse = await loginGoogle(requestBody);

        console.log('Resposta do backend (Google Login):', authResponse);
        login(authResponse);
        toast.success('Login com Google realizado com sucesso!');
        navigate('/home');

      } catch (error: any) {
        console.error('Erro ao enviar ID Token para o backend:', error.response?.data || error.message);
        toast.error('Erro ao fazer login com Google. Verifique o console.');
      }
    }
  };

  const handleGoogleLoginError = () => {
    console.log('Login do Google falhou.');
    toast.error('Falha no login com Google. Tente novamente.');
  };

  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestBody: LoginRequestDTO = { usuario: email, senha: password };
      // Usa a função do Service.ts
      const authResponse = await loginLocal(requestBody);

      console.log('Login local bem-sucedido!', authResponse);
      login(authResponse);
      toast.success('Login local realizado com sucesso!');
      navigate('/home');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            toast.error('Credenciais inválidas. Verifique seu email e senha.');
        } else {
            console.error('Erro no login local:', error.response?.data || error.message);
            toast.error('Ocorreu um erro ao tentar fazer login. Tente novamente.');
        }
    }
  };

  return (
    // ... (o restante do JSX permanece o mesmo)
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login na sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLocalLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-600">Ou</p>
          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Não tem uma conta? <Link to="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;