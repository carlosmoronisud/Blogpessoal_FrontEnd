import {
    GithubLogoIcon,
    LinkedinLogoIcon,
} from '@phosphor-icons/react' // Certifique-se de que '@phosphor-icons/react' está instalado
import { useContext, type ReactNode } from 'react'
import { AuthContext } from '../../contexts/AuthContext' // Certifique-se de que este caminho está correto
import { Link } from 'react-router-dom' // Importe Link para o mapa do site

function Footer() {
    const data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    // Renderiza o Footer apenas se o usuário estiver logado (token não vazio)
    if (usuario.token !== "") {
        component = (
            // Container principal do rodapé: flex-col para empilhar conteúdo e copyright
            // py-12 para aumentar a altura, bg e text para cores da paleta
            <div className="flex flex-col justify-between w-full py-12 px-4 lg:px-8
                         bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg rounded-t-2xl">
                
                {/* Seção principal do conteúdo: Mapa do Site, Agradecimentos, Redes Sociais */}
                {/* flex-grow para ocupar o espaço disponível e empurrar o copyright para baixo */}
                <div className="container flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left gap-6 md:gap-8 flex-grow mb-8"> {/* Adicionado mb-8 para espaçamento */}
                    
                    {/* Mapa do Site (Sitemap) */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-xl font-bold drop-shadow-sm">Navegue no Mundo Pocoyo</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-base">
                            <Link to="/home" className="hover:underline hover:text-[var(--secondary)] transition-colors duration-200">Home</Link>
                            <Link to="/postagens" className="hover:underline hover:text-[var(--secondary)] transition-colors duration-200">Postagens</Link>
                            <Link to="/temas" className="hover:underline hover:text-[var(--secondary)] transition-colors duration-200">Temas</Link>
                            <Link to="/perfil" className="hover:underline hover:text-[var(--secondary)] transition-colors duration-200">Perfil</Link>
                        </div>
                    </div>

                    {/* Agradecimentos */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-xl font-bold drop-shadow-sm">Agradecimentos Especiais</p>
                        <p className="text-base text-center md:text-left">
                           Aos professores que fizeram a diferença, por todo o aprendizado e apoio neste projeto.
                        </p>
                        {/* Container para os links de Rafael e Aimee lado a lado em telas maiores */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center md:justify-start">
                            {/* Rafael Queiros */}
                            <div className="flex flex-col items-center md:items-start gap-1">
                                <p className="text-base font-semibold">Rafael Queiros</p>
                                <div className="flex gap-2">
                                    <a href="https://www.linkedin.com/in/rafaelproinfo/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                                        <LinkedinLogoIcon size={32} weight="bold" className="text-[var(--secondary)] hover:text-[var(--accent)]" />
                                    </a>
									<a href='https://github.com/rafaelproinfo' target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition-transform duration-200'>
										<GithubLogoIcon size={32} weight="bold" className="text-[var(--secondary)] hover:text-[var(--accent)]" />
									</a>
                                </div>
                            </div>

                            {/* Aimee Thompson */}
                            <div className="flex flex-col items-center md:items-start gap-1">
                                <p className="text-base font-semibold">Aimee Thompson</p>
                                <div className="flex gap-2">
                                    <a href="https://www.linkedin.com/in/aimeezita/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                                        <LinkedinLogoIcon size={32} weight="bold" className="text-[var(--secondary)] hover:text-[var(--accent)]" />
                                    </a>
                                    <a href='https://github.com/aimeezita' target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition-transform duration-200'>
                                        <GithubLogoIcon size={32} weight="bold" className="text-[var(--secondary)] hover:text-[var(--accent)]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Redes Sociais */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-xl font-bold drop-shadow-sm">Conecte-se!</p>
                        <div className="flex gap-3">
                            <a href="https://www.linkedin.com/in/carlosmoronigarcia/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                                <LinkedinLogoIcon size={32} weight="bold" className="text-[var(--secondary)] hover:text-[var(--accent)]" />
                            </a>
                            <a href="http://github.com/carlosmoronisud" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                                <GithubLogoIcon size={32} weight="bold" className="text-[var(--secondary)] hover:text-[var(--accent)]" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Informações de Copyright e Autoria - Centralizadas na parte mais baixa */}
                <div className="w-full text-center mt-8 pt-4 border-t border-[var(--border)]"> {/* Adicionado border-t para separação visual */}
                    <p className="text-lg font-bold">
                        Carlos Moroni | Um projeto de estudo pela Generation Brasil
                    </p>
                    <p className="text-base">
                        Copyright: {data}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            { component }
        </>
    )
}

export default Footer
