import React from 'react';

const PerfilPage = () => {
  // Dados de exemplo, que seriam carregados de uma API em um app real
  const usuario = {
    nome: "João da Silva",
    email: "joao.silva@example.com",
    bio: "Entusiasta de tecnologia, desenvolvedor front-end e amante de café. Sempre aprendendo algo novo!",
    avatarUrl: "https://via.placeholder.com/150", // URL de imagem de avatar
  };

  return (
    // Container principal da página, centralizado e com estilos de cartão
    <div className="container mx-auto p-6 md:p-10 bg-white shadow-xl rounded-xl mt-6 max-w-2xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Meu Perfil
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Seção do Avatar */}
        <div className="flex-shrink-0">
          <img
            src={usuario.avatarUrl}
            alt="Avatar do Usuário"
            className="w-32 h-32 rounded-full border-4 border-blue-400 object-cover shadow-md"
          />
        </div>

        {/* Detalhes do Perfil */}
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            {usuario.nome}
          </h2>
          <p className="text-gray-600 mb-4 text-lg">
            <span className="font-semibold">Email:</span> {usuario.email}
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            <span className="font-semibold">Bio:</span> {usuario.bio}
          </p>

          {/* Botões de Ação */}
          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300">
              Editar Perfil
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all duration-300">
              Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;