/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthContext } from '@/contexts/AuthContext' // Certifique-se de que este caminho está correto
import type Tema from '@/models/Tema' // Certifique-se de que este caminho está correto
import { buscar, deletar } from '@/services/Service' // Certifique-se de que este caminho está correto
import { ToastAlerta } from '@/utils/ToastAlerta' // Certifique-se de que este caminho está correto
import { Spinner } from '@phosphor-icons/react/dist/ssr/Spinner' // Certifique-se de que '@phosphor-icons/react' está instalado
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'




function DeletarTema() {
	const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [isSubmitting, setisSubmitting] = useState<boolean>(false)

    const [tema, setTema] = useState<Tema>({} as Tema)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Função para buscar o tema pelo ID
    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao buscar tema para deletar. Tente novamente!', "erro");
            }
        }
    }

    // Efeito para verificar o token do usuário ao carregar a página
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token, navigate]) // Adicionado 'navigate' às dependências

    // Efeito para buscar o tema se um ID for fornecido
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId(id)
        }
    }, [id]) // Adicionado 'id' às dependências

    // Função assíncrona para deletar o tema
    async function deletarTema() {
        setisSubmitting(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: { Authorization: token },
            })

            ToastAlerta('Tema excluído com sucesso! 🗑️', "sucesso")
        } catch (error: any) {
            if (error.toString().includes('401')) { // Alterado de 403 para 401 para consistência com o handleLogout
                handleLogout()
            } else {
                ToastAlerta('Ops! Erro ao excluir o tema. Tente novamente!', "erro")
                console.error(error)
            }
        }

        setisSubmitting(false)
        retornar() // Retorna para a página de temas após a tentativa de exclusão
    }

    // Função para retornar à página de temas
    function retornar() {
        navigate('/temas')
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-[var(--background)] relative overflow-hidden">
            {/* Elementos decorativos animados (bolhas coloridas), consistentes com as outras páginas */}
            <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
            <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>

            {/* Contêiner do formulário de deleção */}
            <div className='flex flex-col w-full max-w-lg p-8 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm gap-6 border-4 border-[var(--secondary)] z-10 animate-fade-in-up transform transition-all duration-300 hover:scale-[1.02]'>
                
                <h1 className='text-4xl lg:text-5xl font-extrabold text-[var(--primary)] text-center mb-4 drop-shadow-lg'>
                    Apagar Tema? 💥
                </h1>

                <p className='text-center text-xl font-semibold mb-4 text-[var(--foreground)]'>
                    Você tem certeza de que deseja apagar o tema a seguir?
                </p>

                {/* Card de exibição do tema a ser deletado */}
                <div className='bg-[var(--muted)] border-2 border-[var(--border)] flex flex-col rounded-xl overflow-hidden justify-between shadow-md'>
                    <header
                        className='py-2 px-6 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xl rounded-t-lg'>
                        Detalhes do Tema
                    </header>
                    <p className="p-4 text-xl font-semibold text-[var(--primary)] bg-[var(--card)]"> {/* Fundo do p ajustado para card */}
                        {tema.descricao}
                    </p>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4 mt-4">
                    <button
                        className='flex-1 rounded-full text-[var(--secondary-foreground)] bg-[var(--secondary)] hover:bg-[var(--secondary-foreground)] hover:text-[var(--secondary)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md transform hover:scale-105'
                        onClick={retornar}>
                        Não, Voltar! 👈
                    </button>
                    <button
                        className='flex-1 rounded-full text-[var(--primary-foreground)] bg-[var(--destructive)] hover:bg-[var(--primary)] hover:text-[var(--destructive)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105'
                        onClick={deletarTema}
                        disabled={isSubmitting} // Desabilita o botão enquanto a submissão está em andamento
                    >
                        {isSubmitting ? (
                            <Spinner size={24} className="animate-spin text-[var(--primary-foreground)]" />
                        ) : (
                            'Sim, Apagar! 💥'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema
