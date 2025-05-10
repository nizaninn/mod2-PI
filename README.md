Plataforma de Eventos com Check-in e Pontuação

Descrição do Sistema
Este sistema é uma plataforma web de gerenciamento de eventos, permitindo que usuários se cadastrem como criadores de eventos ou participantes.

Funcionalidades:
Cadastro e autenticação de usuários (criador ou participante)
Criação de eventos por categoria (shows, negócios, cultura etc.)
Inscrição de participantes em eventos
Check-in via QR Code nos eventos
Sistema de pontos por participação
Visualização de inscritos por criadores
Painel de pontuação por participante

Estrutura de Pastas e Arquivos
/projeto
│
├── controllers/
│   ├── usuarioController.js
│   ├── eventoController.js
│   └── inscricaoController.js
│
├── models/
│   ├── usuarioModel.js
│   ├── eventoModel.js
│   └── inscricaoModel.js
│
├── routes/
│   ├── usuarioRoutes.js
│   ├── eventoRoutes.js
│   └── inscricaoRoutes.js
│
├── views/
│   └── eventos.ejs
│
├── public/
│   ├── css/
│   ├── js/
│   └── imagens/
│
├── config/
│   └── database.js
│
├── server.js
├── package.json
└── .env
 
 
 Como Executar o Projeto Localmente

1. Clone o repositório:
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

2. Instale as dependências:
npm install

3. Configure o ambiente:
Crie um arquivo .env com o seguinte conteúdo:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

4. Inicie o servidor:
node server.js
Ou com auto-reload para desenvolvimento:

npx nodemon server.js
5. Acesse no navegador:
http://localhost:3000

Requisitos
Node.js v18+
Banco de dados MySQL ou PostgreSQL
Navegador moderno (Chrome, Firefox, Edge etc.)
