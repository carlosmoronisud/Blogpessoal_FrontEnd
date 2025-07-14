import { useContext, type ReactNode, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext" // Certifique-se de que este caminho está correto
import { ToastAlerta } from "../../utils/ToastAlerta" // Certifique-se de que este caminho está correto
import { List, X, UserCircle } from '@phosphor-icons/react'; // Importar ícones Phosphor

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    // Estado para controlar a visibilidade do menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Estado para controlar a visibilidade do dropdown do perfil
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Fallback para a foto do usuário
    const avatarFallback = 'https://placehold.co/40x40/cfe2ff/007bff?text=U';
    const displayAvatar = usuario.foto && usuario.foto.trim() !== '' ? usuario.foto : avatarFallback;

    // Função para lidar com o logout do usuário
    function logout() {
        handleLogout();
        ToastAlerta("O usuário foi desconectado com sucesso! 👋", "info");
        navigate("/"); // Redireciona para a página inicial (login/cadastro)
        setIsProfileDropdownOpen(false); // Fecha o dropdown ao sair
    }

    let component: ReactNode;

    // Renderiza a Navbar apenas se o usuário estiver logado (token não vazio)
    if (usuario.token !== "") {
        component = (
            <div className='w-full flex justify-center py-4 px-4 lg:px-8
                         bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg rounded-b-2xl relative z-50'> {/* Adicionado relative e z-50 */}
                
                <div className="container flex justify-between items-center text-lg">
                    {/* Título do Blog */}
                    <Link to="/home" className="text-2xl lg:text-3xl font-extrabold drop-shadow-sm hover:scale-105 transition-transform duration-200">
                        Blog Pocoyo! 🎈
                    </Link>

                    {/* Ícone do Menu Sanduíche (visível apenas em mobile) */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[var(--primary-foreground)] focus:outline-none p-2 rounded-md hover:bg-[var(--muted)] transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? <X size={32} /> : <List size={32} />}
                        </button>
                        {/* Foto do usuário no mobile (fora do menu sanduíche) */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="focus:outline-none rounded-full overflow-hidden border-2 border-[var(--secondary)] shadow-sm"
                            >
                                <img
                                    src={displayAvatar}
                                    alt="Foto de Perfil"
                                    className="h-10 w-10 object-cover"
                                />
                            </button>
                            {/* Dropdown de Perfil no Mobile */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] text-[var(--foreground)] rounded-lg shadow-xl py-2 z-50 origin-top-right animate-fade-in-down">
                                    <Link to="/perfil" className="block px-4 py-2 hover:bg-[var(--muted)] transition-colors duration-200" onClick={() => setIsProfileDropdownOpen(false)}>
                                        <div className="flex items-center gap-2">
                                            <UserCircle size={20} className="text-[var(--primary)]" /> Perfil
                                        </div>
                                    </Link>
                                    <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-[var(--muted)] transition-colors duration-200">
                                        Sair 🚪
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Links de Navegação (Desktop) */}
                    <div className="hidden md:flex flex-wrap justify-end gap-4 text-base lg:text-lg font-semibold items-center">
                        <Link 
                            to='/postagens' 
                            className='hover:underline hover:text-[var(--secondary)] transition-colors duration-200'
                        >
                            Postagens
                        </Link>
                        <Link 
                            to='/temas' 
                            className='hover:underline hover:text-[var(--secondary)] transition-colors duration-200'
                        >
                            Temas
                        </Link>
                        <Link 
                            to='/cadastrartema' 
                            className='hover:underline hover:text-[var(--secondary)] transition-colors duration-200'
                        >
                            Cadastrar Tema
                        </Link>
                        {/* Foto do usuário e dropdown no Desktop */}
                        <div className="relative ml-4"> {/* Adicionado ml-4 para espaçamento */}
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="focus:outline-none rounded-full overflow-hidden border-2 border-[var(--secondary)] shadow-sm"
                            >
                                <img
                                    src={displayAvatar}
                                    alt="Foto de Perfil"
                                    className="h-10 w-10 object-cover"
                                />
                            </button>
                            {/* Dropdown de Perfil no Desktop */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] text-[var(--foreground)] rounded-lg shadow-xl py-2 z-50 origin-top-right animate-fade-in-down">
                                    <Link to="/perfil" className="block px-4 py-2 hover:bg-[var(--muted)] transition-colors duration-200" onClick={() => setIsProfileDropdownOpen(false)}>
                                        <div className="flex items-center gap-2">
                                            <UserCircle size={20} className="text-[var(--primary)]" /> Perfil
                                        </div>
                                    </Link>
                                    <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-[var(--muted)] transition-colors duration-200">
                                        Sair 🚪
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Menu Mobile (Dropdown) */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[var(--primary)] shadow-lg rounded-b-lg py-4 z-40 animate-fade-in-down">
                        <div className="flex flex-col items-center gap-4 text-lg font-semibold">
                            <Link to='/postagens' className='hover:underline hover:text-[var(--secondary)] transition-colors duration-200' onClick={() => setIsMobileMenuOpen(false)}>
                                Postagens
                            </Link>
                            <Link to='/temas' className='hover:underline hover:text-[var(--secondary)] transition-colors duration-200' onClick={() => setIsMobileMenuOpen(false)}>
                                Temas
                            </Link>
                            <Link to='/cadastrartema' className='hover:underline hover:text-[var(--secondary)] transition-colors duration-200' onClick={() => setIsMobileMenuOpen(false)}>
                                Cadastrar Tema
                            </Link>
                            {/* Perfil e Sair estão no dropdown da foto de perfil no mobile */}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
           { component }
        </>
    );
}

export default Navbar;
