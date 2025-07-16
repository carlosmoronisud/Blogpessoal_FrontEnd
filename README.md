# Blog Pessoal do Pocoyo - 🎈  
<div align="center">
<img src="https://ik.imagekit.io/8h7kfljfc/imagem/img/pocoyo-e-amigos.png?updatedAt=1752335000000" title="Pocoyo e amigos se divertindo" width="50%"/>
</div>

<div align="center">
<img src="https://img.shields.io/github/languages/top/carlosmoronisud/Blogpessoal_FrontEnd?style=flat-square" alt="Linguagem Top"/>
<img src="https://img.shields.io/github/repo-size/carlosmoronisud/Blogpessoal_FrontEnd?style=flat-square" alt="Tamanho do Repositório"/>
<img src="https://img.shields.io/github/languages/count/carlosmoronisud/Blogpessoal_FrontEnd?style=flat-square" alt="Contagem de Linguagens"/>
<img src="https://img.shields.io/github/last-commit/carlosmoronisud/Blogpessoal_FrontEnd?style=flat-square" alt="Último Commit"/>
<img src="https://img.shields.io/github/issues/carlosmoronisud/Blogpessoal_FrontEnd?style=flat-square" alt="Issues Abertas"/>
<img src="https://img.shields.io/github/issues-pr/carlosmoronisud/Blogpessoal_FrontEnd?style=flat-square" alt="Pull Requests Abertos"/>
<img src="https://img.shields.io/badge/status-pronto%20para%20diversão-green?style=flat-square" alt="Status: Pronto para Diversão"/>
</div>

## 1. 🌟 Bem-vindo ao Blog Pessoal do Pocoyo - Frontend!

Este é um projeto vibrante e divertido, desenvolvido com **React** e **TypeScript**, que te convida a explorar o mundo de Pocoyo e seus amigos. Nossa missão é consumir e exibir as aventuras e pensamentos de uma **API REST** construída com **Spring Boot**, permitindo que você visualize, crie, edite e delete postagens, tudo categorizado por temas e vinculado a usuários autenticados. É um playground digital para suas ideias! 🥳

### Funcionalidades que você vai adorar:
- **Cadastro e Login de Aventureiros**: Crie sua conta e entre no mundo Pocoyo!
- **Listagem e Gerenciamento de Postagens**: Veja todas as aventuras e gerencie as suas.
- **Criação, Edição e Exclusão de Temas**: Organize suas postagens com temas coloridos.
- **Associação Mágica**: Conecte postagens, temas e seus autores de forma intuitiva.
- **Navegação Sem Limites**: Explore o blog com o React Router Dom.
- **Comunicação Secreta**: Consumo de API com o poderoso Axios.
- **Estilo Divertido**: Tudo estilizado com a flexibilidade do Tailwind CSS, com um toque especial Pocoyo!

## 2. 🔐 Autenticação e Validação de Token JWT 

### Fluxo de Autenticação ✨
- O usuário entra com seu e-mail e senha secreta.
- A aplicação faz uma requisição para a API, que retorna um **token JWT** (seu passe mágico para o mundo Pocoyo!).
- O token é guardado na **Context API** (e no `localStorage` para persistência!) para ser usado em todas as suas futuras requisições autenticadas.
- Nas rotas protegidas, validamos seu token antes de permitir o acesso aos tesouros do blog.

### Controle de Autenticação 🚨
- Se o seu passe mágico (token) expirar ou for inválido, você será redirecionado de volta para a página de login para pegar um novo.

## 3. 🚀 Tecnologias Utilizadas

| Tecnologia       | Finalidade                                     |
|------------------|------------------------------------------------|
| React            | A biblioteca mágica para interfaces interativas |
| TypeScript       | Superpoderes de tipagem para um código seguro   |
| Tailwind CSS     | Estilização rápida e flexível com classes utilitárias |
| Axios            | Nosso mensageiro para conversar com as APIs REST |
| React Router DOM | O mapa para navegar entre as páginas do blog    |
| Vite             | O construtor super-rápido para o nosso projeto  |
| Zod              | Validação de dados divertida e robusta          |
| React Hook Form  | Gerenciamento de formulários sem estresse        |
| Phosphor Icons   | Ícones leves e expressivos                      |
| React Toastify   | Mensagens de alerta fofas e informativas         |
| Reactjs-Popup    | Modais e popups com estilo                      |

## 4. 🎒 Pré-requisitos para a Aventura 

Antes de embarcar nesta jornada, certifique-se de ter os seguintes itens instalados:
- Node.js (versão 16 ou superior)
- Yarn (gerenciador de pacotes)
- Git (para clonar o projeto)
- Visual Studio Code ou outro editor de código de sua preferência

**Backend - Spring Boot (essencial para o funcionamento da API):**  
🔗 Repositório da API Blog Pessoal - Backend Spring Boot

## 5. 🏃‍♀️💨 Como Executar o Projeto Localmente

Siga estes passos para ter o Blog do Pocoyo rodando na sua máquina:

```bash
# Clone o repositório:
git clone https://github.com/carlosmoronisud/Blogpessoal_FrontEnd.git

# Acesse a pasta do projeto:
cd Blogpessoal_FrontEnd

# Instale as dependências:
yarn

# Execute o projeto em modo desenvolvimento:
yarn dev

```

## 6. 🤝 Integração com a API Backend
A aplicação frontend se comunica com a API do projeto backend. Certifique-se de que o backend esteja rodando antes de iniciar o frontend!

🔗 Blog Pessoal - Backend Spring Boot

A URL base da API deve ser configurada em um arquivo de variáveis de ambiente (ex: .env) no seu projeto frontend, geralmente como VITE_API_URL.

## 7. 🌳 Estrutura de Diretórios
A organização do nosso projeto é clara como um dia de sol no parquinho:
```bash
src/
│
├── assets/             → Imagens, ícones e recursos visuais 🎨
├── components/         → Componentes reutilizáveis para construir a UI 🧱
├── contexts/           → Gerenciamento de estado global (como a autenticação!) 🌐
├── models/             → Interfaces e tipos de dados do projeto 🧩
├── pages/              → As diferentes telas e funcionalidades da aplicação 🖥️
├── services/           → Onde configuramos a comunicação com a API (Axios) 📡
├── utils/              → Funções auxiliares e utilitários (ToastAlertas!) 💡
├── App.tsx             → O componente raiz do nosso aplicativo 🌳
├── main.tsx            → O ponto de entrada da aplicação 🚀
└── index.css           → Nossos estilos globais e variáveis de tema com Tailwind ✨
```

## 8. 🚀 Implementações Futuras (Próximas Aventuras!)
O mundo Pocoyo está sempre em evolução! Aqui estão algumas ideias para futuras melhorias:

Upload de Imagem de Perfil: Permita que os usuários enviem suas próprias fotos de perfil.

Responsividade Aprimorada: Otimização contínua para todos os dispositivos.

Validações Avançadas: Mais validações com React Hook Form para uma experiência ainda mais suave.

Testes: Implementação de testes com Jest + React Testing Library para garantir a qualidade.

Modo Escuro: Uma opção para alternar entre temas claro e escuro.

## 9. 💖 Contribuição
Sua ajuda é muito bem-vinda para tornar o Blog do Pocoyo ainda mais divertido!
``` bash
Este projeto foi um estudo incrível, Graças ao apoio de Rafael Queiros e Aimee Thompson, a quem sou muito grato! 🙏
```

Se você encontrou algum problema, tem uma ideia brilhante ou deseja propor melhorias:

Abra uma issue com suas sugestões ou bugs.

Envie um pull request com suas contribuições.

Compartilhe com colegas aprendizes e amigos!

## 10. 📧 Contato
Desenvolvido com carinho por Carlos Moroni.
Dúvidas, sugestões ou apenas quer bater um papo sobre Pocoyo e desenvolvimento?
Sinta-se à vontade para entrar em contato:

🔗 [Carlos Moroni](https://github.com/carlosmoronisud)
