import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import CadastroPage from './pages/Auth/CadastroPage';
import ListaPostagensPage from './pages/postagens/ListaPostagensPage';
import ListaTemasPage from './pages/temas/ListaTemasPage';
import PerfilPage from './pages/perfil/PerfilPage';
import Navbar from './componetnts/common/Navbar';
import Footer from './componetnts/common/Footer';


function App() {
  return (
    <BrowserRouter>
      {  <Navbar appName="Blogpessoal" /> } { }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rotas Protegidas (serão protegidas mais tarde) */}
        <Route path="/home" element={<HomePage />} /> {/* Redirecionamento de login para /home */}
        <Route path="/postagens" element={<ListaPostagensPage />} />
        <Route path="/temas" element={<ListaTemasPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        {/* Adicione outras rotas conforme necessário (criar/editar post, etc.) */}

        {/* Rota para 404 Not Found (opcional) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      {<Footer /> } {/* Se você criar um Footer, coloque aqui */}
    </BrowserRouter>
  );
}

export default App;