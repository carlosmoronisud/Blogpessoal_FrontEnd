import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/home/Login';
import Home from './pages/home/Home';
import ListaTemas from './pages/temas/ListaTemasPage';
import FormularioTema from './pages/temas/FormularioTema';
import DeletarTema from './pages/temas/DeletarTema';
import ListaPostagensPage from './pages/postagens/ListaPostagensPage';
import FormPostagem from './pages/postagens/FormPostagem';
import DeletarPostagem from './pages/postagens/DeletePostagens';
import PerfilPage from './pages/perfil/PerfilPage';
import Cadastro from './pages/home/Cadastro';
import FormularioUsuario from './pages/perfil/FormularioUsuario';


function App() {
    return (
        <>
            <AuthProvider>
                <ToastContainer />
                <BrowserRouter>
                    <Navbar />
                    <div className="min-h-[80vh]">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<Home />} />                            
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/temas" element={<ListaTemas />} />
                            <Route path="/cadastrartema" element={<FormularioTema />} />
                            <Route path="/editartema/:id" element={<FormularioTema />} />
                            <Route path="/deletartema/:id" element={<DeletarTema />} />
                            <Route path="/postagens" element={<ListaPostagensPage />} />
                            <Route path="/cadastrarpostagem" element={<FormPostagem />} />
                            <Route path="/editarpostagem/:id" element={<FormPostagem />} />
                            <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
                            <Route path="/perfil" element={<PerfilPage />} />
                            <Route path="/editarusuario/:id" element={<FormularioUsuario />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
