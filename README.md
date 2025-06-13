# 🎟Plataforma de Eventos com Check-in e Pontuação

##  Descrição do Sistema

A Plataforma de Eventos com Check-in e Pontuação é um sistema web desenvolvido para facilitar o gerenciamento, inscrição e participação em eventos presenciais e online. O sistema foi pensado para atender tanto criadores de eventos, que desejam organizar e acompanhar suas atividades, quanto participantes, que buscam descobrir e se inscrever em eventos de interesse.

O sistema permite que usuários se registrem com perfis distintos: criador ou participante. Criadores têm acesso a funcionalidades específicas como cadastro de eventos, definição de categorias temáticas (negócios, shows, cultura, etc.) e acompanhamento da lista de inscritos. Participantes, por outro lado, podem explorar eventos disponíveis, realizar inscrições com confirmação automática, fazer check-in no dia do evento utilizando um QR Code único, e ainda acumular pontos por participação, criando uma experiência gamificada e incentivando o engajamento.

 Todo o sistema foi estruturado seguindo o padrão arquitetural MVC (Model-View-Controller), garantindo uma separação clara entre as camadas de dados, lógica de negócio e apresentação. Isso facilita a manutenção, a escalabilidade e a integração com outras ferramentas, como sistemas de pagamento e APIs externas. Com um design modular e responsivo, o sistema é ideal para instituições, comunidades, startups ou organizadores independentes que desejam profissionalizar a gestão de seus eventos, aumentar a participação do público e oferecer uma experiência mais interativa e mensurável para seus usuários.

### Funcionalidades:
- Cadastro e autenticação de usuários (criador ou participante)
- Criação de eventos por categoria (shows, negócios, cultura etc.)
- Inscrição de participantes em eventos
- Check-in via QR Code nos eventos
- Sistema de pontos por participação
- Visualização de inscritos por criadores
- Painel de pontuação por participante



## Como Executar o Projeto Localmente


### 1. Clone o repositório
```bash
git clone https://github.com/nizaninn/PI-mod2
cd PI
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```



### 4. Execute o servidor

Para iniciar o projeto:

```bash
npm start
# ou
node server.js
```

> ⚠️ **Importante**: O projeto foi reorganizado! Agora o `server.js` e `package.json` estão na raiz do projeto, seguindo as melhores práticas do Node.js.

 
### 5. Acesse no navegador

Abra seu navegador e acesse:

```
http://localhost:3000
```

## 📁 Estrutura de Pastas do Projeto (Atualizada)

```bash
checkly-system/
├── server.js                    # 🚀 Servidor principal (movido para raiz)
├── package.json                 # 📦 Dependências e scripts (movido para raiz)
├── package-lock.json           # 🔒 Lock das dependências
├── node_modules/               # 📚 Módulos do Node.js (movido para raiz)
├── README.md                   # 📖 Documentação
│
└── src/                        # 📂 Código fonte
    ├── assets/                 # 🖼️ Arquivos estáticos (imagens, etc.)
    ├── config/                 # ⚙️ Configurações (banco de dados, etc.)
    ├── controllers/            # 🎮 Controladores da aplicação
    ├── models/                 # 📊 Modelos de dados
    ├── routes/                 # 🛣️ Rotas da API
    ├── services/               # 🔧 Serviços auxiliares
    ├── documentos/             # 📄 Documentação adicional
    └── views/                  # 🎨 Templates e interface
        ├── pages/              # 📄 Páginas HTML (EJS)
        ├── css/                # 🎨 Arquivos de estilo
        └── js/                 # ⚡ Scripts JavaScript
```

## 🔧 Melhorias Implementadas

### ✅ Reorganização da Estrutura
- Movido `server.js` e `package.json` para a raiz (padrão Node.js)
- Removido arquivos duplicados
- Estrutura mais limpa e organizada

### ✅ Correções de Autenticação
- Sistema de sessões funcionando corretamente
- Middleware de autenticação com logs detalhados
- Botão "Perfil" agora funciona sem redirecionar para login

### ✅ Melhorias de Interface
- Estilos modernos e responsivos
- Formulários com foco e transições suaves
- Navegação fixa e hover effects
- Animações e feedback visual

### ✅ Funcionalidades Corrigidas
- Login/logout funcionando
- Perfil do usuário acessível
- Todas as rotas protegidas funcionando
- Sistema de pontos e check-in operacional

## 🚀 Como testar

1. Faça login ou cadastre-se
2. Acesse o painel principal
3. Teste a criação de eventos
4. Verifique o sistema de inscrições
5. Teste o check-in com QR Code
6. Acesse as estatísticas

## 📞 Suporte

Se encontrar algum problema, verifique:
- Se o servidor está rodando na porta 3000
- Se todas as dependências foram instaladas
- Se não há conflitos de porta

