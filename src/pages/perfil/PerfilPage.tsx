import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@phosphor-icons/react/dist/icons/Spinner'; // Importe o Spinner
import { AuthContext } from '@/contexts/AuthContext'; // Certifique-se de que este caminho está correto
import { ToastAlerta } from '@/utils/ToastAlerta'; // Certifique-se de que este caminho está correto

const PerfilPage = () => {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true); // Adicionado estado de carregamento

  // Simula o carregamento de dados do usuário (em um app real, viria de uma API)
  useEffect(() => {
    // Verifica se o token existe, se não, redireciona para o login
    if (usuario.token === '') {
      ToastAlerta('Você precisa estar logado para acessar seu perfil!', 'info');
      handleLogout(); // Garante que o token seja limpo se for inválido
      navigate('/login');
      return;
    }

    // Simula um atraso para o carregamento dos dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 segundo de atraso para simular busca

    return () => clearTimeout(timer); // Limpa o timer
  }, [usuario.token, navigate, handleLogout]); // Dependências: token do usuário, navigate e handleLogout

  // Fallback para o avatar se a URL estiver vazia
  const avatarFallback = 'https://placehold.co/150x150/cfe2ff/007bff?text=Pocoyo';
  const displayAvatar = usuario.foto && usuario.foto.trim() !== '' ? usuario.foto : avatarFallback;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-[var(--background)]">
        <Spinner size={80} className="animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    // Container principal da página, centralizado e com estilos de cartão Pocoyo
    <div className="flex justify-center items-center min-h-screen w-screen bg-[var(--background)] relative overflow-hidden p-4 md:p-8">
      {/* Elementos decorativos animados (bolhas coloridas), consistentes com as outras páginas */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
      <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>

      <div className="w-full max-w-2xl p-8 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm border-4 border-[var(--secondary)] z-10 animate-fade-in-up">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary)] mb-8 text-center drop-shadow-lg">
          Meu Cantinho Pocoyo! 🌟
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Seção do Avatar */}
          <div className="flex-shrink-0">
            <img
              src={displayAvatar}
              alt="Avatar do Usuário"
              className="w-32 h-32 rounded-full border-4 border-[var(--primary)] object-cover shadow-xl animate-float-slow"
            />
          </div>

          {/* Detalhes do Perfil */}
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-2 drop-shadow-sm">
              {usuario.nome || 'Aventureiro Desconhecido'}
            </h2>
            <p className="text-[var(--foreground)] mb-4 text-lg">
              <span className="font-semibold text-[var(--primary)]">Email:</span> {usuario.usuario || 'N/A'}
            </p>
            

            {/* Botões de Ação */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                onClick={() => navigate(`/editarusuario/${usuario.id}`)} 
                className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-full shadow-md hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
              >
                Editar Perfil ✍️
              </button>
              {/* Botão de Configurações removido */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
