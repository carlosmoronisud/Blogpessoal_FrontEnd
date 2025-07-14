import { createContext, useState, type ReactNode } from 'react'
import { ToastAlerta } from '../utils/ToastAlerta' // Certifique-se de que este caminho está correto
import type UsuarioLogin from '@/types/UsuarioLogin' // Certifique-se de que este caminho está correto
import { login } from '@/services/Service' // Certifique-se de que este caminho está correto


interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
    // Função auxiliar para carregar o usuário do localStorage
    const getStoredUser = (): UsuarioLogin => {
        try {
            const storedUser = localStorage.getItem('usuario');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
        } catch (error) {
            console.error("Erro ao carregar usuário do localStorage:", error);
            // Se houver um erro ao parsear, retorna um objeto vazio para evitar crash
        }
        // Retorna um objeto UsuarioLogin padrão se não houver no localStorage ou se houver erro
        return {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        };
    };

    // Inicializa o estado do usuário tentando carregar do localStorage
    const [usuario, setUsuario] = useState<UsuarioLogin>(getStoredUser());

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleLogin(usuarioLogin: UsuarioLogin ) {
        setIsLoading(true)

        try {
            const response = await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            // Salva o objeto completo do usuário no localStorage após o login bem-sucedido
            localStorage.setItem('usuario', JSON.stringify(response));
            ToastAlerta('O Usuário foi autenticado com sucesso! 🎉', 'sucesso');
        } catch (error) {
            ToastAlerta('O dados do Usuário estão incorretos! 😢', 'erro');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        // Limpa o estado do usuário
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        });
        // Remove o usuário do localStorage
        localStorage.removeItem('usuario');
        ToastAlerta('O usuário foi desconectado com sucesso! 👋', 'info');
    }
    
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
