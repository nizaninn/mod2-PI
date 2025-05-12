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
node server.js
```

 
### 5. Acesse no navegador

Abra seu navegador e acesse:

```
http://localhost:3000
```

Estrutura de Pastas do Projeto
````bash


PI/
├── mvc-boilerplate/                    
│   ├── controllers/
|   ├── assets/       
│   ├── models/              
│   ├── routes/             
│   ├── services/           
│   ├── tests/        
│   └── views/
│   └── scripts/
│   └── documentos/
│   └── config/
│   └── .env.example/
│   └── .gitignore/
│   └── .jest.config.js/
│   └── readme.md/
│   └── rest.http/
│   └── server.js/              
│
├── mvc-boilerplate/                    
│   ├── .bin
|   ├── accepts      
│   ├── ansi-styles            
│   ├── async            
│   ├── balanced-match          
│   ├── body-parser       
│   └── brace-expansion
│   └── bytes
│   └── call-bind-apply-help
│   └── call-bound
│   └── chalk
│   └── color-convert
│   └── color-name
│   └── concat-map
│   └── content-disposition
│   └── content-type
│   └── cookie
│   └── cookie-signature
│   └── debug
│   └── depd
│   └── dotenev
│   └── dunder-proto
│   └── ee-first
│   └── ejs
│   └── encodeurl
│   └── es-define-property
│   └── es-errors
│   └── es-object-atoms
│   └── escape-html
│   └── estag
│   └── express
│   └── filelist
│   └── finalhandler
│   └── forwarded
│   └── fresh
│   └── function-bind
│   └── get-intrinsic
│   └── get-proto
│   └── gopd
│   └── has-flag
│   └── has-symbols
│   └── hasown
│   └── http-errors
│   └── iconv-lite
│   └── inherits
│   └── ipaddr.js
│   └── is-promise
│   └── jake
│   └── math-intrinsics
│   └── media-typer
│   └── merge-descripions
│   └── mime-db
│   └── mime-types
│   └── minimatch
│   └── ms
│   └── negociator
│   └── object-inspect
│   └── on-finished
│   └── once
│   └── parseurl
│   └── path-to-regexp
│   └── pg
│   └── pg-cloudflare
│   └── pg-connection-string
│   └── pg-int8
│   └── pg-pool
│   └── pg-protocol
│   └── pg-types
│   └── pgpass
│   └── postgress-aray
│   └── postress-bytea
│   └── prostgress-date
│   └── postgress-interval
│   └── proxy-addr
│   └── qs
│   └── range-parser
│   └── raw-body
│   └── router
│   └── safe-buffer
│   └── saffer-buffer
│   └── send
│   └── serv-static
│   └── setprototypeof
│   └── side-channel
│   └── side-channel-list
│   └── side-channel-map
│   └── side-channel-weak
│   └── split2
│   └── statuses
│   └── supports-color
│   └── toidentifier
│   └── type-is
│   └── unpipe
│   └── vary
│   └── wrappy
│   └── xtend
|
├── package-lock.json/
├── package.json/
│
├──PI-wad.md                  
└── 

