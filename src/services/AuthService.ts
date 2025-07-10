import axios from "axios";

const API_BASE_URL = "https://blogpessoal-esoc.onrender.com"; 

export interface Credenciais {
  usuario: string;
  senha: string;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  token: string;
}

export const login = async ( dadosLogin: Credenciais): Promise<UsuarioLogado> => {
  const response = await axios.post<UsuarioLogado>(`${API_BASE_URL}/logar`, dadosLogin);
  return response.data;
};
