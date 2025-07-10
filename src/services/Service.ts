/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type Postagem from "@/models/Postagem";
import type Tema from "@/models/Tema";
import axios from "axios";
import { toast } from 'react-toastify';



// URL do seu backend no Render (hardcoded para simplicidade)
const API_BASE_URL = "https://blogpessoal-esoc.onrender.com";

// Instância do Axios que será usada por todas as funções de serviço
const api = axios.create({
    baseURL: API_BASE_URL
});
console.log("Axios API_BASE_URL configurada em Service.ts:", API_BASE_URL);


// --- Funções de Autenticação ---
// setAuthToken é chamado pelo AuthContext para configurar o header em 'api'
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Token JWT definido no Axios:', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        console.log('Token JWT removido do Axios.');
    }
};

// --- Funções Genéricas com segurança exigindo "token" para CRUD (Temas e Postagens) ---
export const buscar = async <T,>(url: string, token: string): Promise<T> => {
  const response = await api.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const cadastrar = async <T,>(url: string, dados: object, token: string): Promise<T> => {
  const response = await api.post<T>(url, dados, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const atualizar = async <T,>(url: string, dados: Object, token: string): Promise<T> => {
  const response = await api.put<T>(url, dados, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deletar = async (url: string, token: string): Promise<void> => {
  await api.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// --- Funções Específicas para Temas e Postagens (usando as genéricas) ---
export const getAllTemas = async (token: string): Promise<Tema[]> => {
  return await buscar<Tema[]>('/temas', token);
};

export const getAllPostagens = async (token: string): Promise<Postagem[]> => {
  return await buscar<Postagem[]>('/postagens', token);
};


// Helper para exibir toasts de erro comuns
export const tratarErro = (error: any, mensagemPadrao: string = "Ocorreu um erro!") => {
    if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
            toast.error("Você não está autorizado. Faça login novamente.");
        } else if (error.response.data && error.response.data.message) {
            toast.error(`Erro: ${error.response.data.message}`);
        } else {
            toast.error(mensagemPadrao);
        }
    } else {
        console.error(error);
        toast.error(mensagemPadrao);
    }
};