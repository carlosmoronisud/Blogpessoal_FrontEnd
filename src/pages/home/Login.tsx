import { Link, useNavigate } from 'react-router-dom';
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Spinner } from '@phosphor-icons/react/dist/ssr/Spinner'; 
import type UsuarioLogin from '@/models/UsuarioLogin'; 


function Login() {
  const navigate = useNavigate();

  
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  });

  const { usuario, handleLogin } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efeito para redirecionar para a home se o usuário já estiver logado
  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/home');
    }
  }, [usuario.token, navigate]); // Adicionado dependências para useEffect

  // Função para atualizar o estado do formulário de login
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  // Função assíncrona para realizar o login
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true); // Inicia o spinner de carregamento
    try {
      await handleLogin(usuarioLogin);
      // O navigate para /home já é tratado no useEffect, então não precisamos duplicar aqui.
    } finally {
      setIsSubmitting(false); // Garante que o spinner pare de girar mesmo em caso de erro
    }
  }

  return (
    <>
      {/* Contêiner principal da página de login, dividido ao meio em telas grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-screen place-items-center bg-[var(--background)] relative overflow-hidden">

        {/* Lado Esquerdo - Imagem de Destaque com Pocoyo acenando (visível apenas em telas grandes) */}
        <div
          className="hidden lg:flex justify-center items-center h-full w-full bg-[var(--muted)] p-8 relative overflow-hidden"
        >
          <img
            src="https://ik.imagekit.io/8h7kfljfc/imagem/img/pacenando-removebg-preview.png?updatedAt=1752330552839"
            alt="Pocoyo acenando, convidando para a diversão"
            // Aumentado ligeiramente o tamanho da imagem em telas grandes para combinar com o cadastro
            className="max-w-full h-auto drop-shadow-2xl animate-float-slow lg:scale-110 transform transition-transform duration-300"
          />
          {/* Elementos decorativos animados (bolhas coloridas), consistentes com a página de cadastro */}
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
          <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>
        </div>

        {/* Lado Direito - Formulário de Login com Fundo de Playground */}
        <div
          className="flex justify-center items-center h-full w-full bg-cover bg-center p-8 relative overflow-y-auto" // Permite rolagem vertical se o conteúdo exceder a altura
          style={{ backgroundImage: `url(https://ik.imagekit.io/8h7kfljfc/imagem/fundo%20paltado.jpg?updatedAt=1752329446363)` }}
        >
          <div className="absolute inset-0 bg-[var(--muted)] opacity-70"></div> {/* Overlay suave no fundo */}
          <form
            // Largura do formulário mantida como max-w-lg e ajustado padding/gap para consistência
            className="flex justify-center items-center flex-col w-full max-w-lg p-4 lg:p-6 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm gap-3 lg:gap-4 border-4 border-[var(--secondary)] z-10 animate-fade-in-up transform transition-all duration-300 hover:scale-105"
            onSubmit={login}
          >
            <h2 className="text-[var(--primary)] text-4xl lg:text-5xl font-extrabold mb-3 text-center drop-shadow-lg">
              Bem-vindo ao Mundo Pocoyo! 🎉
            </h2>
            {/* Campo Usuário (E-mail) */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="usuario" className="text-[var(--primary)] font-semibold text-lg">
                Seu Nome de Aventura
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Onde o Pocoyo te encontra?"
                className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
            {/* Campo Senha */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="senha" className="text-[var(--primary)] font-semibold text-lg">
                Sua Senha Secreta
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Sua senha colorida!"
                className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
            {/* Botão de Login */}
            <button
              type="submit"
              className="rounded-full bg-[var(--primary)] flex justify-center items-center text-[var(--primary-foreground)] w-full py-2.5 mt-4 text-lg font-bold transition-all duration-300 hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner size={24} className="animate-spin text-[var(--primary-foreground)]" />
              ) : (
                'Entrar no Parque! 🚀'
              )}
            </button>

            <hr className="border-[var(--border)] w-full my-4" /> 

            <p className="text-[var(--foreground)] text-base text-center"> 
              Ainda não tem um lugar para brincar?{' '}
              <Link
                to="/cadastro"
                className="text-[var(--primary)] hover:underline font-semibold"
              >
                Crie sua conta agora! ✨
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
