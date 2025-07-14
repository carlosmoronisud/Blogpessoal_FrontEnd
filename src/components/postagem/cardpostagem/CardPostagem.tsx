import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem' // Certifique-se de que este caminho está correto

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagens({ postagem }: CardPostagensProps) {
    return (
        // Container principal do card: estilizado com cores do Pocoyo, arredondamento e sombra
        <div
            className="bg-[var(--card)] border-2 border-[var(--border)] 
                       flex flex-col rounded-2xl overflow-hidden justify-between 
                       shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
        >
            <div>
                {/* Cabeçalho do card com informações do usuário */}
                <div className="flex w-full bg-[var(--muted)] py-3 px-4 items-center gap-4 border-b border-[var(--border)]">
                    <img
                        src={postagem.usuario?.foto || 'https://placehold.co/48x48/cfe2ff/007bff?text=P'} // Fallback para foto
                        className="h-12 w-12 rounded-full object-cover border-2 border-[var(--primary)] shadow-md" // Borda colorida na foto e sombra
                        alt={postagem.usuario?.nome || 'Usuário'}
                    />
                    <h3 className="text-lg font-bold text-[var(--primary)] uppercase drop-shadow-sm">
                        {postagem.usuario?.nome}
                    </h3>
                </div>

                {/* Conteúdo da postagem */}
                <div className="p-4 flex flex-col gap-2">
                    <h4 className="text-xl font-bold text-[var(--primary)] drop-shadow-sm mb-1"> {/* Adicionado mb-1 */}
                        {postagem.titulo}
                    </h4>
                    <p className="text-[var(--foreground)] text-base leading-relaxed">{postagem.texto}</p> {/* Adicionado leading-relaxed */}
                    
                    {/* Tag de Tema */}
                    <div className="flex items-center mt-2"> {/* Adicionado mt-2 */}
                        <span className="text-sm font-semibold text-[var(--primary)] bg-[var(--secondary)] px-3 py-1 rounded-full shadow-sm"> {/* Estilização de tag */}
                            Tema: {postagem.tema?.descricao}
                        </span>
                    </div>

                    <p className="text-[var(--muted-foreground)] text-xs mt-2"> {/* Adicionado mt-2 */}
                        Data:{' '}
                        {new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(postagem.data))}
                    </p>
                </div>
            </div>

            {/* Seção de botões de ação (Editar/Deletar) */}
            <div className="flex w-full mt-auto"> {/* mt-auto para empurrar para o final */}
                <Link
                    to={`/editarpostagem/${postagem.id}`}
                    className="w-full text-[var(--secondary-foreground)] bg-[var(--secondary)] 
                               hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] 
                               flex items-center justify-center py-2.5 font-bold rounded-bl-2xl 
                               transition-all duration-300 shadow-md gap-2" // Ajustado hover e shadow
                >
                    Editar ✏️
                </Link>
                <Link 
                    to={`/deletarpostagem/${postagem.id}`} 
                    className='w-full text-[var(--primary-foreground)] bg-[var(--destructive)] 
                               hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] 
                               flex items-center justify-center py-2.5 font-bold rounded-br-2xl 
                               transition-all duration-300 shadow-md gap-2' // Ajustado hover e shadow
                >
                    Deletar 🗑️
                </Link>
            </div>
        </div>
    )
}

export default CardPostagens
