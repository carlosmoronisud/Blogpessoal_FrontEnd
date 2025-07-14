import ListaPostagensPage from "../postagens/ListaPostagensPage" // Certifique-se de que este caminho está correto
import ModalPostagem from "../postagens/ModalPostagens" // Certifique-se de que este caminho está correto

function Home() {
    return (
        <>
            {/* Seção Hero da Página Home */}
            <div className="relative w-screen h-screen flex justify-center items-center bg-[var(--background)] overflow-hidden">
                {/* Elementos decorativos animados (bolhas coloridas), consistentes com as páginas de login/cadastro */}
                <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
                <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>

                {/* Árvores decorativas */}
                <img
                    src="https://ik.imagekit.io/8h7kfljfc/imagem/img/arvoreverde.png?updatedAt=1752334280330"
                    alt="Árvore verde decorativa"
                    className="absolute bottom-0 left-0 h-1/3 lg:h-1/2 opacity-80 animate-fade-in-up"
                    style={{ animationDelay: '0.8s' }}
                />
                <img
                    src="https://ik.imagekit.io/8h7kfljfc/imagem/img/arvoreamarela.png?updatedAt=1752334280283"
                    alt="Árvore amarela decorativa"
                    className="absolute bottom-0 right-0 h-1/4 lg:h-2/5 opacity-80 animate-fade-in-up"
                    style={{ animationDelay: '1.2s' }}
                />

                {/* Contêiner principal do conteúdo da Hero Section */}
                <div className='container grid grid-cols-1 lg:grid-cols-2 text-[var(--foreground)] p-4 lg:p-8 max-w-7xl mx-auto z-10 h-full'>
                    {/* Lado Esquerdo - Texto e Botão */}
                    <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start justify-center text-center lg:text-left py-8">
                        <h2 className='text-[var(--primary)] text-5xl lg:text-6xl font-extrabold drop-shadow-lg leading-tight'>
                            Bem-vindo ao Mundo Pocoyo! 🎉
                        </h2>
                        <p className='text-[var(--foreground)] text-xl lg:text-2xl max-w-lg'>
                            Um lugar divertido para compartilhar suas ideias e aventuras!
                        </p>

                        <div className="flex justify-center lg:justify-start gap-4 mt-6">
                            
                            
                            <ModalPostagem />                          
                        </div>
                    </div>

                    {/* Lado Direito - Imagem Hero Principal do Pocoyo */}
                    <div className="flex justify-center items-center p-4 lg:p-8">
                        <img
                            src="https://ik.imagekit.io/8h7kfljfc/imagem/img/turmadopocoyo.png?updatedAt=1752334704054" 
                            alt="Pocoyo e amigos se divertindo"
                            className='w-100 max-w-full h-auto drop-shadow-2xl animate-float-slow lg:scale-110 transform transition-transform duration-300'
                        />
                    </div>
                </div>
            </div>

            {/* Seção de Lista de Postagens (abaixo da Hero Section) */}
            <ListaPostagensPage />
        </>
    )
}

export default Home
