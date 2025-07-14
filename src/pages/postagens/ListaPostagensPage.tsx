/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@phosphor-icons/react/dist/icons/Spinner'; // Importe o Spinner
import { AuthContext } from '@/contexts/AuthContext'; // Importe o AuthContext
import { buscar } from '@/services/Service'; // Importe a função buscar do seu Service
import { ToastAlerta } from '@/utils/ToastAlerta'; // Importe o ToastAlerta
import type Postagem from '@/models/Postagem'; // Importe o tipo Postagem
import CardPostagens from '@/components/postagem/cardpostagem/CardPostagem';
import { useState, useContext, useEffect } from 'react';


const ListaPostagensPage = () => {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Função para buscar as postagens do backend
  async function buscarPostagens() {
    setIsLoading(true); // Inicia o spinner de carregamento
    try {
      await buscar('/postagens', setPostagens, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
        ToastAlerta('Sua sessão expirou, faça login novamente.', 'erro');
        navigate('/login');
      } else {
        ToastAlerta('Erro ao buscar postagens. Tente novamente!', 'erro');
        console.error(error);
      }
    } finally {
      setIsLoading(false); // Para o spinner de carregamento
    }
  }

  // Efeito para verificar o token e buscar as postagens ao carregar a página
  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info');
      navigate('/login');
    } else {
      buscarPostagens(); 
    }
  }, [token, navigate]); 

  return (
    <>
      {/* Spinner global de carregamento */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner
            size={80}
            className="animate-spin text-[var(--primary)]" // Cor do spinner ajustada
          />
        </div>
      )}

      {/* Container principal para a página, com fundo claro e arredondado, centralizado e com padding */}
      <div className="container mx-auto p-4 md:p-8 lg:p-12 bg-[var(--card)] shadow-2xl rounded-3xl mt-8 mb-8 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--primary)] mb-6 border-b-4 border-[var(--secondary)] pb-3 text-center drop-shadow-sm">
          Nossas Aventuras no Mundo Pocoyo! 🌈
        </h1>

        {/* Área onde as postagens seriam listadas */}
        {postagens.length === 0 && !isLoading ? ( // Mostra a mensagem apenas se não houver postagens e não estiver carregando
          <p className="text-center text-[var(--muted-foreground)] text-lg md:text-xl col-span-full p-8">
            Nenhuma aventura encontrada. Que tal criar uma nova? ✨
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {postagens.map((postagem) => (
              <CardPostagens key={postagem.id} postagem={postagem} />
            ))}
          </div>
        )}

        {/* Você pode adicionar paginação ou outros controles aqui */}
      </div>
    </>
  );
};

export default ListaPostagensPage;
