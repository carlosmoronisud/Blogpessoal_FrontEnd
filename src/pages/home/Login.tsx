/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Login.tsx
import { login, type Credenciais, type UsuarioLogado } from "@/services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Credenciais>({
    usuario: "",
    senha: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const usuarioLogado: UsuarioLogado = await login(formData);
      localStorage.setItem("token", usuarioLogado.token);
      navigate("/postagens");
   
    } catch (err: any) {
      setError("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    if (token) {
      localStorage.setItem("token", `Bearer ${token}`);
      navigate("/postagens");
    }
  };

  const handleGoogleError = () => {
    setError("Erro ao fazer login com o Google.");
  };

const { login: authLogin } = useAuth();

const handleGoogleSuccess = (credentialResponse: any) => {
  const token = credentialResponse.credential;
  if (token) {
    try {
      const decoded: any = jwtDecode(token); // você pode tipar melhor se quiser
      const userData = {
        token: `Bearer ${token}`,
        nome: decoded.name,
        usuario: decoded.email,
        foto: decoded.picture,
      };

      authLogin(userData);
      navigate("/postagens");
    } catch (err) {
      setError("Erro ao processar token do Google.");
    }
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-600">
              Usuário (e-mail)
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-600">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Separador visual */}
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">ou</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Botão Google */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
function jwtDecode(token: any): any {
    throw new Error("Function not implemented.");
}

