import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type Usuario from '../../models/Usuario'; // Certifique-se de que este caminho está correto
import { useNavigate } from 'react-router-dom'; // Certifique-se de que 'react-router-dom' está instalado
import { cadastrarUsuario } from '../../services/Service'; // Certifique-se de que este caminho está correto
import { ToastAlerta } from '@/utils/ToastAlerta'; // Certifique-se de que este caminho está correto
import { Spinner } from '@phosphor-icons/react/dist/ssr/Spinner'; // Certifique-se de que '@phosphor-icons/react' está instalado

function Cadastro() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  // Efeito para redirecionar após o cadastro bem-sucedido
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]); // Dependência 'usuario' para reagir a mudanças no objeto

  // Função para retornar à página de login
  function retornar() {
    navigate('/login');
  }

  // Função para atualizar o estado do formulário
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  // Função para lidar com a confirmação de senha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  // Função assíncrona para cadastrar um novo usuário
  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true); // Inicia o spinner de carregamento

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        // Chama o serviço para cadastrar o usuário
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
        ToastAlerta('Cadastro concluído com sucesso! Bem-vindo(a) ao mundo Pocoyo! 🎉', 'sucesso');
        // O redirecionamento ocorre via useEffect após o setUsuario
      } catch (error) {
        ToastAlerta('Ops! Algo deu errado ao cadastrar. Tente novamente!', 'erro');
        console.error(error);
        // Limpa os campos de senha em caso de erro
        setUsuario({ ...usuario, senha: '' });
        setConfirmaSenha('');
      }
    } else {
      ToastAlerta('A senha e a confirmação devem ser iguais e ter no mínimo 8 caracteres. Verifique!', 'erro');
      setUsuario({ ...usuario, senha: '' }); // Limpa o campo de senha
      setConfirmaSenha(''); // Limpa o campo de confirmação
    }
    setIsSubmitting(false); // Para o spinner de carregamento
  }

  return (
    <>
      {/* Contêiner principal da página de cadastro */}
      {/* Ajustado o grid para dividir a tela ao meio em telas grandes (50/50) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-screen place-items-center bg-[var(--background)] relative overflow-hidden">
        {/* Lado Esquerdo - Imagem de Destaque com Pocoyo de costas (visível apenas em telas grandes) */}
        <div
          className="hidden lg:flex justify-center items-center h-full w-full bg-[var(--muted)] p-8 relative overflow-hidden"
        >
          <img
            src="https://ik.imagekit.io/8h7kfljfc/imagem/img/pdecostas-removebg-preview.png?updatedAt=1749648288210"
            alt="Pocoyo de costas acenando"
            // Aumentado ligeiramente o tamanho da imagem em telas grandes
            className="max-w-full h-auto drop-shadow-2xl animate-float-slow lg:scale-110 transform transition-transform duration-300"
          />
          {/* Elementos decorativos animados (bolhas coloridas) */}
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[var(--chart-2)] rounded-full opacity-60 animate-blob" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)] rounded-full opacity-50 animate-blob" style={{ animationDelay: '1.5s', animationDuration: '6s' }}></div>
          <div className="absolute bottom-5 left-20 w-20 h-20 bg-[var(--chart-5)] rounded-full opacity-70 animate-blob" style={{ animationDelay: '0.2s', animationDuration: '7s' }}></div>
        </div>

        {/* Lado Direito - Formulário de Cadastro com Fundo de Playground */}
        <div
          className="flex justify-center items-center h-full w-full bg-cover bg-center p-8 relative overflow-y-auto" // Permite rolagem vertical se o conteúdo exceder a altura
          style={{ backgroundImage: `url(https://ik.imagekit.io/8h7kfljfc/imagem/fundo%20paltado.jpg?updatedAt=1752329446363)` }}
        >
          <div className="absolute inset-0 bg-[var(--muted)] opacity-70"></div> {/* Overlay suave no fundo */}
          <form
            // Largura do formulário mantida como max-w-lg
            className="flex justify-center items-center flex-col w-full max-w-lg p-4 lg:p-6 bg-[var(--card)] rounded-3xl shadow-2xl backdrop-blur-sm gap-3 lg:gap-4 border-4 border-[var(--secondary)] z-10 animate-fade-in-up transform transition-all duration-300 hover:scale-105"
            onSubmit={cadastrarNovoUsuario}
          >
            <h2 className="text-[var(--primary)] text-4xl lg:text-5xl font-extrabold mb-3 text-center drop-shadow-lg">
              Junte-se à Turma! 🥳
            </h2>
            {/* Campo Nome */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="nome" className="text-[var(--primary)] font-semibold text-lg">Seu Nome Mágico</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Ex: Pato Aventureiro"
                className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                value={usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
            {/* Campo E-mail */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="usuario" className="text-[var(--primary)] font-semibold text-lg">Seu E-mail Secreto</label>
              <input
                type="email"
                id="usuario"
                name="usuario"
                placeholder="Ex: elly@parquinho.com"
                className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
            {/* Campo Foto */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="foto" className="text-[var(--primary)] font-semibold text-lg">Foto do Seu Amiguinho (URL)</label>
              <input
                type="text"
                id="foto"
                name="foto"
                placeholder="Uma foto divertida!"
                className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                value={usuario.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            {/* Campo Senha */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="senha" className="text-[var(--primary)] font-semibold text-lg">Sua Senha Divertida</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Pelo menos 8 segredos!"
                className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
            {/* Campo Confirmar Senha */}
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="confirmarSenha" className="text-[var(--primary)] font-semibold text-lg">Confirme sua Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Repita o segredo!"
                className="border-2 border-[var(--border)] rounded-xl p-2.5 focus:ring-4 focus:ring-[var(--ring)] focus:border-[var(--ring)] transition-all duration-300 outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                value={confirmaSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                required
              />
            </div>
            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row justify-between w-full gap-4 mt-4">
              <button
                type="button"
                className="flex-1 rounded-full text-[var(--secondary-foreground)] bg-[var(--secondary)] hover:bg-[var(--secondary-foreground)] hover:text-[var(--secondary)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md transform hover:scale-105"
                onClick={retornar}
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition duration-300 ease-in-out py-2.5 text-lg font-bold shadow-md flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner size={24} className="animate-spin text-[var(--primary-foreground)]" />
                ) : (
                  'Criar Conta! ✨'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
