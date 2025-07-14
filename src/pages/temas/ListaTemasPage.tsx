/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import type Tema from '@/models/Tema'; // Certifique-se de que este caminho está correto
import { buscar } from '@/services/Service'; // Certifique-se de que este caminho está correto
import { AuthContext } from '@/contexts/AuthContext'; // Certifique-se de que este caminho está correto
import { ToastAlerta } from '@/utils/ToastAlerta'; // Certifique-se de que este caminho está correto
import { Spinner } from '@phosphor-icons/react/dist/icons/Spinner'; // Certifique-se de que '@phosphor-icons/react' está instalado
import { useState, useContext, useEffect } from 'react';

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  // Função para buscar os temas
  async function buscarTemas() {
    try {
      setIsLoading(true) // Inicia o spinner
      await buscar("/temas", setTemas, {
        headers: { Authorization: token }
      })

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
        ToastAlerta('Você precisa estar logado para acessar os temas.', 'info'); // Usando ToastAlerta
        navigate('/login');
      } else {
        ToastAlerta('Erro ao buscar temas. Tente novamente!', 'erro');
      }
    } finally {
      setIsLoading(false) // Para o spinner
    }
  }

  // Efeito para verificar o token do usuário ao carregar a página
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info")
      navigate("/login")
    }
  }, [token, navigate])

  // Efeito para buscar os temas ao carregar a página (com dependência ajustada)
  useEffect(() => {
    if (token !== "") {
        buscarTemas()
    }
  }, [token])

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

      {/* Contêiner principal da página de temas */}
      <div className="flex justify-center items-center py-8 px-4 lg:px-8 min-h-screen bg-[var(--background)] relative overflow-hidden">
        {/* Elementos decorativos animados (bolhas coloridas), consistentes com as outras páginas */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>

        {/* Card principal da lista de temas */}
        <div className="w-full max-w-4xl p-8 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm gap-6 border-4 border-[var(--secondary)] z-10 animate-fade-in-up transform transition-all duration-300 hover:scale-[1.02]">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-center text-[var(--primary)] mb-6 drop-shadow-lg">
            Nossos Temas de Aventura! 📚
          </h1>

          {/* Botão Cadastrar Novo Tema */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate('/cadastrartema')}
              className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition duration-300 font-bold shadow-md transform hover:scale-105"
            >
              Novo Tema! ✨
            </button>
          </div>

          {temas.length === 0 && !isLoading ? ( // Mostra a mensagem apenas se não houver temas e não estiver carregando
            <p className="text-center text-[var(--muted-foreground)] text-lg md:text-xl mt-8 p-4">
              Nenhum tema encontrado. Cadastre um novo para começar a aventura!
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border-2 border-[var(--border)] shadow-md">
              {/* CORREÇÃO: Removido o espaço em branco entre <table> e <thead> */}
              <table className="min-w-full bg-[var(--background)]">
                {/* CORREÇÃO: Removido o espaço em branco entre <thead> e <tr> */}
                <thead className="bg-[var(--muted)] border-b-2 border-[var(--border)]"><tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">ID</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">Descrição</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">Ações</th>
                </tr></thead>
                <tbody>
                  {temas.map((tema) => (
                    <tr key={tema.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)] transition-colors duration-200">
                      <td className="py-4 px-6 text-base text-[var(--foreground)]">{tema.id}</td>
                      <td className="py-4 px-6 text-base text-[var(--foreground)]">{tema.descricao}</td>
                      <td className="py-4 px-6 text-center text-sm flex justify-center gap-4">
                        <button
                          onClick={() => navigate(`/editarTema/${tema.id}`)}
                          className="text-[var(--primary)] hover:text-[var(--secondary)] font-semibold transition duration-300 transform hover:scale-110"
                        >
                          Editar ✏️
                        </button>
                        <button
                          onClick={() => navigate(`/deletarTema/${tema.id}`)}
                          className="text-[var(--destructive)] hover:text-[var(--primary)] font-semibold transition duration-300 transform hover:scale-110"
                        >
                          Deletar 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
