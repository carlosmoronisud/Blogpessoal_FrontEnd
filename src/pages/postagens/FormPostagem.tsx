/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthContext } from "@/contexts/AuthContext"; // Certifique-se de que este caminho está correto
import type Postagem from "@/models/Postagem"; // Certifique-se de que este caminho está correto
import type Tema from "@/models/Tema"; // Certifique-se de que este caminho está correto
import { atualizar, buscar, cadastrar } from "@/services/Service"; // Certifique-se de que este caminho está correto
import { ToastAlerta } from "@/utils/ToastAlerta"; // Certifique-se de que este caminho está correto
import { Spinner } from "@phosphor-icons/react/dist/ssr/Spinner"; // Certifique-se de que '@phosphor-icons/react' está instalado
import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";


function FormPostagem() {

    const navigate = useNavigate();

    const [isSubmitting, setisSubmitting] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao buscar postagem. Tente novamente!', "erro");
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao buscar tema. Tente novamente!', "erro");
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao buscar temas. Tente novamente!', "erro");
            }
        }
    }

    // Efeito para verificar o token do usuário ao carregar a página
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info");
            navigate('/');
        }
    }, [token, navigate]) // Adicionado 'navigate' às dependências

    // Efeito para buscar temas e postagem (se for edição) ao carregar
    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id]) // Removido 'buscarTemas' e 'buscarPostagemPorId' para evitar loop infinito

    // Efeito para associar o tema à postagem quando o tema muda
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema]) // Adicionado 'postagem' às dependências para evitar warnings

    // Função para atualizar o estado da postagem
    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { // Adicionado HTMLTextAreaElement
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    // Função para retornar à página de postagens
    function retornar() {
        navigate('/postagens');
    }

    // Função assíncrona para gerar (cadastrar ou atualizar) uma nova postagem
    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setisSubmitting(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token
                    },
                });

                ToastAlerta('Postagem atualizada com sucesso! 🎉', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Ops! Erro ao atualizar a Postagem. Tente novamente!', "erro")
                }
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token
                    },
                })

                ToastAlerta('Postagem cadastrada com sucesso! ✨', "sucesso");

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Ops! Erro ao cadastrar a Postagem. Tente novamente!', "erro");
                }
            }
        }

        setisSubmitting(false)
        retornar()
    }

    // Verifica se o tema está sendo carregado para desabilitar o botão de submissão
    const carregandoTema = tema.descricao === '';

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-[var(--background)] relative overflow-hidden">
            {/* Elementos decorativos animados (bolhas coloridas), consistentes com as outras páginas */}
            <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
            <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>

            {/* Formulário de Postagem */}
            <form
                className="flex flex-col w-full max-w-2xl p-8 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm gap-6 border-4 border-[var(--secondary)] z-10 animate-fade-in-up transform transition-all duration-300 hover:scale-[1.02]"
                onSubmit={gerarNovaPostagem}
            >
                <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary)] text-center mb-6 drop-shadow-lg">
                    {id !== undefined ? 'Editar Aventura! ✏️' : 'Compartilhe sua Aventura! ✨'}
                </h1>

                {/* Campo Título da Postagem */}
                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="titulo" className="text-[var(--primary)] font-semibold text-lg">Título da Aventura</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="Ex: Meu dia com Elly e Pato!"
                        required
                        className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                {/* Campo Texto da Postagem (usando textarea para melhor experiência) */}
                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="texto" className="text-[var(--primary)] font-semibold text-lg">O que aconteceu?</label>
                    <textarea // Alterado para textarea para textos maiores
                        id="texto"
                        name="texto"
                        placeholder="Conte-nos todos os detalhes da sua aventura!"
                        required
                        className="border-2 border-[var(--border)] rounded-xl p-2.5 h-32 resize-y focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)} // Tipo de evento ajustado
                    />
                </div>

                {/* Campo Tema da Postagem */}
                <div className="flex flex-col w-full gap-2">
                    <p className="text-[var(--primary)] font-semibold text-lg">Qual o tema da sua aventura?</p>
                    <select
                        name="tema"
                        id="tema"
                        className='border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] bg-[var(--card)]'
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                        value={tema.id} // Controla o valor selecionado
                    >
                        <option value="" disabled>Selecione um Tema</option> {/* Opção padrão */}

                        {temas.map((temaOption) => (
                            <option key={temaOption.id} value={temaOption.id}>
                                {temaOption.descricao}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4 mt-4">
                    <button
                        type="button"
                        className="flex-1 rounded-full text-[var(--secondary-foreground)] bg-[var(--secondary)] hover:bg-[var(--secondary-foreground)] hover:text-[var(--secondary)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md transform hover:scale-105"
                        onClick={retornar}
                    >
                        Voltar 👈
                    </button>
                    <button
                        type='submit'
                        className='flex-1 rounded-full text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105'
                        disabled={carregandoTema || isSubmitting} // Desabilita se o tema estiver carregando ou se já estiver submetendo
                    >
                        {isSubmitting ? (
                            <Spinner size={24} className="animate-spin text-[var(--primary-foreground)]" />
                        ) : (
                            id ? 'Atualizar Aventura! ✅' : 'Publicar Aventura! 🚀'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormPostagem;
