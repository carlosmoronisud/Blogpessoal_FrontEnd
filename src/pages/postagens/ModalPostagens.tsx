import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; // Importe o CSS padrão do reactjs-popup
import FormPostagem from './FormPostagem'; // Certifique-se de que este caminho está correto

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    // Botão que abre o modal, estilizado com o tema Pocoyo
                    <button
                        type="button"
                        className="rounded-full text-[var(--primary-foreground)] bg-[var(--primary)] 
                                   hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] 
                                   transition duration-300 ease-in-out py-3 px-6 text-xl font-bold 
                                   shadow-md transform hover:scale-105"
                    >
                        Criar Postagem! ✨
                    </button>
                }
                modal // Ativa o modo modal (overlay e fechamento ao clicar fora)
                nested // Permite que o modal seja aninhado (se houver outros popups)
                // Estilização do overlay (fundo escuro transparente)
                overlayStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro semi-transparente
                    backdropFilter: 'blur(5px)', // Efeito de blur no fundo
                }}
                // Estilização do conteúdo do modal
                contentStyle={{
                    width: 'auto', // Largura automática para o conteúdo
                    maxWidth: '90%', // Largura máxima para responsividade
                    padding: '0', // Remover padding padrão do popup para o FormPostagem gerenciar
                    border: 'none', // Remover borda padrão
                    borderRadius: '1.5rem', // Arredondamento maior para o modal
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Sombra mais proeminente
                    backgroundColor: 'transparent', // Fundo transparente para que o FormPostagem controle o fundo
                    display: 'flex', // Para centralizar o FormPostagem se ele não ocupar 100%
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;
