import React from 'react';

const ListaPostagensPage = () => {
  return (
    // Container principal para a página, centralizado e com padding
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg mt-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
        Lista de Postagens
      </h1>

      {/* Área onde as postagens seriam listadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*
          Aqui você listaria suas postagens. Exemplo de um card de postagem:
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Título da Postagem</h2>
            <p className="text-gray-600 text-sm">Breve descrição da postagem...</p>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
              Ler Mais
            </button>
          </div>
        */}
        <p className="text-gray-500 col-span-full">Nenhuma postagem encontrada (ou espaço para suas postagens).</p>
      </div>

      {/* Você pode adicionar paginação ou outros controles aqui */}
    </div>
  );
};

export default ListaPostagensPage;