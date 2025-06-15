# Web Application Document - Projeto Individual - Módulo 2 - Inteli
## Nome do Projeto

Projeto Individual de Nicole Zanin Silva - Checkly.

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O Checkly é uma plataforma web para criação e gerenciamento de eventos que inova ao incorporar elementos de gamificação para os participantes. O sistema permite que organizadores criem eventos, cadastrem atividades, gerenciem inscrições e acompanhem em tempo real o engajamento do público.

O participante recebe acesso a um painel personalizado com QR Code, lista de eventos disponíveis e pontuação acumulada. Ao participar dos eventos, os usuários realizam check-ins escaneando seus QR Codes nos dispositivos dos monitores. A pontuação é atualizada automaticamente, promovendo uma experiência dinâmica e interativa.

O organizador pode acompanhar métricas de engajamento, exportar listas de presença e gerar certificados automáticos para os participantes que completarem determinada pontuação. Todos esses recursos estão disponíveis diretamente na plataforma, sem necessidade de aplicativos externos ou planilhas manuais.

A proposta é entregar uma solução leve, intuitiva e atrativa para eventos de pequeno, médio e grade porte, desde feiras acadêmicas até grandes congressos.



## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

![Persona](/src/assets/imagem-1.png)


### 2.2. User Stories (Semana 01)

US01 | Como organizadora de eventos, quero ter acesso às métricas de engajamento do meu evento, para que eu possa entender os intereses dos meus clientes.

US02 | Como estudante universitário, quero algo que me engaje a ir nas palestras da minha universidade, para que eu não perca mais notas por causa do meu desinteresse.

US03 | Como participante de congressos coorporativos, quero encontrar e organizar meus eventos em um só lugar, para que eu não precise perder tempo acessando diversas plataformas de diferentes empresas para realizar minha inscrição.

**INVEST- US03**
| Critério             | Avaliação                                                                                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **I – Independente** |  A história pode ser desenvolvida de forma autônoma, sem depender de outras funcionalidades como gamificação ou check-in.                                                                                |
| **N – Negociável**   |  A forma como os eventos serão agregados pode ser ajustada com base no feedback do usuário e nas limitações técnicas iniciais. |
| **V – Valiosa**      |  Oferece alto valor ao usuário final ao centralizar inscrições e facilitar a organização pessoal, economizando tempo e aumentando o engajamento.                                                         |
| **E – Estimável**    |  É possível estimar o esforço para implementar funcionalidades como painel de eventos salvos, área pessoal e integração com base de dados de eventos.                                                    |
| **S – Pequena**      | Será classificado em áreas menores. Como, por exemplo, uma área de eventos favoritos e separação por temas.                      |
| **T – Testável**     |  Pode ser testada verificando se o usuário consegue ver, organizar e acessar seus eventos a partir de um único local da plataforma.                                                                      |



---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

![model](/src/assets/modelagem.png)
![fisico](/src/assets/print1.png)
![fisico2](/src/assets/print2.png)

### 3.1.1 BD e Models (Semana 5)

Esta seção descreve os Models implementados na plataforma web, com foco em suas entidades, atributos, relacionamentos e função dentro da plataforma.



##  Model: Usuario

**Descrição:** Representa os usuários cadastrados no sistema. Eles podem ser criadores de eventos ou participantes.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único do usuário.
- `nome` (VARCHAR(100)): Nome completo do usuário. 
- `email` (VARCHAR(100)): Endereço de e-mail único. 
- `senha` (VARCHAR(100)): Senha do usuário (armazenada no banco de dados). 
- `role` (VARCHAR(20)): Define o papel do usuário, se sua conta será para exercer a função de `'criador'` de eventos ou `'participante'`, que irá apenas realizar as inscrições. 

**Relacionamentos:**
- Pode ser criador de vários `Eventos`.
- Pode participar de vários `Eventos` por meio de `Inscricoes`.
- Pode ter um `Check_in` por cada evento que o usuário participou.
- Pode ter um único registro de `Pontos`, que vão sendo acumulados na plataforma.



##  Model: Categorias

**Descrição:** Representa as categorias dos eventos, que serão separados em: coorporativos, shows e festas, teatro, standup, gospel, dança, festivais culturais, meetups, bem-estar e acadêmico.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único da categoria.
- `nome` (VARCHAR(100)): Nome da categoria.
- `descricao` (TEXT): Descrição opcional da categoria.

**Relacionamentos:**
- Uma `Categoria` pode estar associada a vários `Eventos`.



##  Model: Eventos

**Descrição:** Representa os eventos criados pelos usuários que se cadastram como criadores.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único do evento.
- `nome` (VARCHAR(100)): Nome do evento.
- `descricao` (TEXT): Descrição detalhada do evento.
- `data` (DATE): Data de realização do evento.
- `local` (VARCHAR(150)): Local do evento.
- `valor` (DECIMAL): Valor da inscrição (se aplicável).
- `criador_id` (INT): Referência ao `Usuario` criador.
- `categoria_id` (INT): Referência à `Categoria` do evento.

**Relacionamentos:**
- Pertence a um `Usuario` (quando for criador).
- Pertence a uma `Categoria`.
- Pode ter várias `Inscricoes`.
- Pode ter vários `Check_in`.



## Model: Inscrições

**Descrição:** Representa as inscrições dos participantes nos eventos.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único da inscrição.
- `data_de_inscricao` (TIMESTAMP): Data/hora da inscrição. 
- `status` (VARCHAR(20)): Estado da inscrição: `'pendente'`, `'confirmado'` ou `'cancelado'`.
- `id_participante` (INT): Referência ao participante (`Usuario`).
- `id_evento` (INT): Referência ao `Evento`.
- `token_de_confirmacao` (VARCHAR(255)): Token gerado para confirmação.

**Relacionamentos:**
- Pertence a um `Usuario`.
- Pertence a um `Evento`.


## Model: Check_in

**Descrição:** Representa o check-in presencial do participante no evento.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único do check-in.
- `data` (DATE): Data do check-in.
- `hora` (TIME): Hora do check-in.
- `local` (VARCHAR(150)): Local de realização do check-in.
- `id_participante` (INT): Referência ao `Usuario`.
- `id_evento` (INT): Referência ao `Evento`.
- `qr_token` (VARCHAR(255)): Token gerado para QR Code do check-in.

**Relacionamentos:**
- Pertence a um `Usuario`.
- Pertence a um `Evento`.



## Model: Pontos

**Descrição:** Representa o total de pontos acumulados por um participante, utilizado para gamificação ou recompensas.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único.
- `total_pontos` (INT): Total de pontos acumulados. 
- `ultima_atualizacao` (TIMESTAMP): Data/hora da última modificação.
- `id_participante` (INT): Referência única ao `Usuario`. **Esse campo é obrigatório e único**.

**Relacionamentos:**
- Cada `Usuario` (participante) pode ter um único registro de `Pontos`.



### 3.2. Arquitetura (Semana 5)

O padrão de arquitetura adotado para a aplicação foi o MVC, ou Model-View-Controller, que é uma arquitetura de software amplamente adotada na engenharia de software para o desenvolvimento de sistemas robustos e escaláveis. Esse padrão organiza a estrutura de uma aplicação em três componentes principais: Model, View e Controller.

Model: representa os dados e a lógica de negócios da aplicação. Ele inclui o estado e o comportamento dos objetos subjacentes, incluindo acesso a dados, validações e operações relacionadas. O Modelo é responsável por gerenciar a manipulação dos dados e notificar os Controladores sobre quaisquer mudanças relevantes.

View: responsável pela apresentação dos dados ao usuário final. Ela exibe a interface gráfica ou textual com a qual o usuário interage, representando visualmente as informações do Modelo de maneira compreensível. A Visão é passiva e não possui lógica de negócios; ela apenas reflete o estado atual do Modelo.

Controller: atua como intermediário entre a Visão e o Modelo, gerenciando as interações do usuário e as operações de manipulação de dados. Ele recebe as entradas do usuário na Visão, interpreta essas entradas e aciona as ações apropriadas no Modelo. O Controlador também é responsável por atualizar a Visão conforme necessário, refletindo as mudanças nos dados do Modelo.

 Vale ressaltar que o MVC é amplamente utilizado por várias razões, dentre elas, incluem-se as seguintes:

 Separação de preocupações: O MVC promove uma clara separação de preocupações entre os diferentes componentes da aplicação, facilitando a manutenção, a extensibilidade e a reutilização de código.

 Flexibilidade e escalabilidade: A arquitetura modular do MVC permite que os desenvolvedores trabalhem de forma independente em diferentes partes da aplicação, facilitando a colaboração em equipe e a evolução do software ao longo do tempo.

 Facilidade de teste: A separação entre a lógica de negócios, a apresentação e o controle de fluxo torna mais fácil escrever testes automatizados para cada componente individualmente, garantindo a robustez e a qualidade do software.

 Adoção generalizada: O MVC é um padrão bem estabelecido e amplamente adotado pela comunidade de desenvolvimento de software, o que significa que há uma abundância de recursos, ferramentas e frameworks disponíveis para facilitar sua implementação em uma variedade de tecnologias e plataformas.

 Pode-se, portanto, afirmar que o padrão de design de software MVC é uma abordagem eficaz para o desenvolvimento de software modular, flexível e escalável, que promove a separação de preocupações e facilita a manutenção e evolução de aplicações complexas ao longo do tempo.

Portanto, o Checlky é uma aplicação web feita com base na arquitetura MVC (Model-View-Controller), cujo esboço foi desenhado através da plataforma Draw.io. 


![diagrama](/src/assets/ArquiteturaPI.drawio.png)

### 3.3. Wireframes (Semana 03)

![folha1](/src/assets/wireframe1.jpg)
![folha2](/src/assets/wireframe2.jpg)

Estes são os primeiros wireframes de baixa fidelidade do projeto, concebidos com foco na experiência do usuário e alinhados à seguinte user story:

"Como participante de congressos corporativos, quero encontrar e organizar meus eventos em um só lugar, para que eu não precise perder tempo acessando diversas plataformas de diferentes empresas para realizar minha inscrição."

A proposta dos wireframes é traduzir essa necessidade real em uma solução digital clara e funcional. Eles priorizam navegação intuitiva, centralização de eventos e facilidade na jornada de inscrição, que são lementos essenciais para melhorar a produtividade do usuário e reduzir fricções no processo de organização de congressos.

Nesse contexto, o acesso direto ao gráfico de engajamento se torna uma funcionalidade essencial. Ele fornece métricas valiosas como taxa de visualização da página do evento, número de inscrições, tempo médio de navegação e conversão por canal de divulgação. Assim, a plataforma não só resolve o problema da fragmentação, como também oferece insights estratégicos que possibilitam o criador a melhorar continuamente suas ações.
### 3.4. Guia de estilos (Semana 05)

O guia de estilos é uma biblioteca organizada de componentes de design e padrões visuais destinados a facilitar o desenvolvimento e manutenção de projetos. Ele inclui diretrizes detalhadas sobre como usar e personalizar os componentes, garantindo consistência e eficiência nos produtos.

### 1. Cores 

![cores](/src/assets/cores.png)

### 2. Iconografia

![iconografia](/src/assets/icones1.png)

### 3. Tipografia


| **Elemento UI**         | **Fonte Utilizada** | **Peso / Estilo**   |
|-------------------------|---------------------|----------------------|
| Títulos e Botões        | SF Pro Display      | Bold                |
| Corpo do Texto          | Inter               | Regular             |
| Menus e Navegação       | Work Sans           | Medium              |
| Datas e Informações     | Roboto              | Regular / Light     |
| Categorias de Evento    | SF Pro Display      | Semibold            |


### 3.5. Protótipo de alta fidelidade (Semana 05)

Após validar os conceitos e ideias abordadas nos wireframes, o próximo passo é o desenvolvimento das telas se aproximando de suas versões finais, incluindo estéticas, estilos e técnicas de UX Design. Então, com base nos wireframes e comentários do parceiro, os protótipos de alta fidelidade foram produzidos.

O protótipo de alta fidelidade tem como objetivo simular todo o design do produto final, de forma que seja possível visualizar todas as ideias estéticas, como as cores e tipografia. (EBAC, 2024).

Segue, portanto, os protótipos de alta fidelidade das telas principais e que aparecerão mais vezes na plaforma Checkly. 

Tela de Login
![login](/src/assets/prototipo1.png)
---
Tela de Cadastro
![cadastro](/src/assets/prototipo2.png)
---
Tela Principal
![principal](/src/assets/prototipo3.png)
---
Lista de inscritos no seu evento (ponto de vista do criador)
![lista](/src/assets/prototipo4.png)
---
Tela para se inscrever em algum evento (ponto de vista de participante)
![incrição](/src/assets/prototipo5.png)
--- 



### 3.6. WebAPI e endpoints (Semana 05)

Documentar os endpoints de uma API é essencial para garantir a clareza, organização e manutenibilidade do sistema. Uma boa documentação permite que desenvolvedores compreendam rapidamente como interagir com os recursos disponíveis, quais métodos HTTP utilizar, quais parâmetros são esperados e quais respostas podem ser retornadas

Esta documentação descreve os endpoints disponíveis no sistema, de acordo com cada tabela.

Para a documentação completa dos endpoints, acesse: [documentação de endpoints](/src/documentos/endpoints.md)

### 3.7. Integração Frontend-Backend (Semana 06)

A integração entre frontend e backend foi implementada utilizando exclusivamente a **Fetch API**, uma interface moderna do JavaScript que permite realizar requisições HTTP de forma assíncrona. Esta abordagem garante uma comunicação eficiente e padronizada entre a interface do usuário e os serviços do servidor.

#### 3.7.1. Arquitetura de Integração

A aplicação segue uma arquitetura **Client-Server** onde:

- **Frontend (Client)**: Desenvolvido com EJS (Embedded JavaScript Templates)
- **Backend (Server)**: API REST construída com Node.js e Express.js
- **Comunicação**: Exclusivamente via Fetch API para todas as operações CRUD

#### 3.7.2. Padrão de Comunicação

Todas as interações entre frontend e backend seguem o padrão:

```javascript
const response = await fetch('/api/eventos');
if (response.ok) {
  const dados = await response.json();
} else {
}

const response = await fetch('/api/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dadosUsuario)
});
```

#### 3.7.3. Funcionalidades Implementadas com Fetch API

**Autenticação e Usuários:**
- Login de usuários (`POST /api/login`)
- Cadastro de novos usuários (`POST /api/usuarios`)
- Recuperação de dados do usuário logado (`GET /api/me`)
- Logout (`POST /logout`)

**Gerenciamento de Eventos:**
- Listagem de eventos (`GET /api/eventos`)
- Criação de eventos (`POST /api/eventos`)
- Busca de evento específico (`GET /api/eventos/:id`)
- Busca de eventos por categoria (`GET /api/categoria/:id`)

**Sistema de Inscrições:**
- Inscrição em eventos (`POST /api/inscricoes`)
- Listagem de inscrições do usuário (`GET /api/inscricoes?participante=:id`)
- Verificação de inscrições existentes

**Check-in e Pontuação:**
- Registro de check-in (`POST /api/checkin`)
- Consulta de pontos do usuário (`GET /api/pontos/:id`)
- Atualização automática de pontuação

#### 3.7.4. Tratamento de Erros

Implementação robusta de tratamento de erros em todas as requisições:

```javascript
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Erro na requisição:', error);
  alert('Erro ao processar solicitação. Tente novamente.');
}
```

#### 3.7.5. Exemplo Prático: Sistema de Busca de Eventos

Um exemplo completo de integração Fetch API é o sistema de busca em tempo real implementado no painel principal:

**Frontend (JavaScript):**
```javascript
async function performSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();

  if (!searchTerm) {
    alert('Digite algo para buscar');
    return;
  }

  try {
   
    const response = await fetch('/api/eventos');
    if (response.ok) {
      const eventos = await response.json();

    
      const filteredEvents = eventos.filter(evento =>
        evento.nome.toLowerCase().includes(searchTerm) ||
        evento.local.toLowerCase().includes(searchTerm) ||
        (evento.descricao && evento.descricao.toLowerCase().includes(searchTerm))
      );

      
      const container = document.getElementById('eventos-em-alta');
      container.innerHTML = `<h3>Resultados da Busca (${filteredEvents.length} encontrados)</h3>`;

      if (filteredEvents.length === 0) {
        container.innerHTML += `<p>Nenhum evento encontrado para "${searchTerm}"</p>`;
      } else {
        renderEventos('eventos-em-alta', filteredEvents);
      }
    }
  } catch (error) {
    console.error('Erro na busca:', error);
    alert('Erro ao realizar busca');
  }
}
```

**Backend (Node.js/Express):**
```javascript

app.get('/api/eventos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, c.nome as categoria_nome
      FROM eventos e
      LEFT JOIN categorias c ON e.categoria_id = c.id_unico
      ORDER BY e.data DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar eventos:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});
```


### 3.8. Interface e Navegação (Semana 07)

O desenvolvimento do frontend foi realizado com foco na experiência do usuário, implementando uma interface responsiva e intuitiva que se adapta a diferentes dispositivos e tamanhos de tela.


#### 3.8.2. Estrutura de Páginas Implementadas

**1. Sistema de Autenticação:**
- **Login** (`/login`): Formulário de acesso com validação
- **Cadastro** (`/cadastro`): Registro de novos usuários com seleção de perfil
- **Recuperação de Senha** (`/recuperarsenha`): Sistema de reset de senha

**2. Painel Principal:**
- **Dashboard** (`/painel`): Página inicial personalizada por tipo de usuário
- **Busca de Eventos**: Sistema de pesquisa em tempo real
- **Categorias**: Navegação por tipos de eventos
- **Eventos Disponíveis**: Listagem dinâmica de eventos

**3. Gerenciamento de Eventos:**
- **Criar Evento** (`/criarevento`): Formulário completo para criadores
- **Meus Eventos** (`/meuevento`): Painel de controle com abas
- **Detalhes do Evento** (`/inscrever`): Página de inscrição
- **Check-in** (`/checkin`): Interface de confirmação de presença

**4. Área do Usuário:**
- **Perfil** (`/perfil`): Dados pessoais e pontuação
- **Estatísticas** (`/estatisticas`): Métricas e histórico de atividades

#### 3.8.3. Componentes de Interface

**Sistema de Navegação:**
```html
<header class="top-nav">
  <img src="/assets/logo.png" alt="Checkly" class="logo" />
  <nav>
    <a href="/painel">Início</a>
    <a href="/meuevento">Meus Eventos</a>
    <a href="/perfil">Perfil</a>
  </nav>
</header>
```

**Botões Padronizados:**
```css
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary { background-color: #007BFF; }
.btn-secondary { background-color: transparent; border: 1px solid #fff; }
.btn-success { background-color: #28a745; }
.btn-danger { background-color: #dc3545; }
```

**Cards de Eventos:**
```html
<div class="evento">
  <div class="imagem-evento">
    <img src="/assets/evento-default.jpg" alt="Evento">
  </div>
  <div class="info">
    <h3>Nome do Evento</h3>
    <p>Data - Local</p>
    <p><strong>R$ Valor</strong></p>
  </div>
</div>
```



#### 3.8.7. Funcionalidades Implementadas

**Sistema de Autenticação Completo:**
- Login com validação de credenciais
- Cadastro de usuários com seleção de perfil (Criador/Participante)
- Sistema de recuperação de senha funcional
- Logout seguro com limpeza de sessão

**Gerenciamento de Eventos:**
- Criação de eventos com formulário completo
- Listagem dinâmica de eventos por categoria
- Sistema de busca em tempo real
- Visualização detalhada de eventos

**Sistema de Inscrições:**
- Inscrição em eventos com validação
- Prevenção de inscrições duplicadas
- Listagem de eventos inscritos
- Status de inscrição em tempo real

**Check-in e Pontuação:**
- Sistema de check-in funcional
- Pontuação automática (10 pontos por check-in)
- Histórico de pontuação
- Validação de presença em eventos

**Painel Administrativo:**
- Dashboard personalizado por tipo de usuário
- Estatísticas de participação
- Gerenciamento de eventos criados
- Visualização de inscritos por evento

**Interface Responsiva:**
- Design adaptável para mobile, tablet e desktop
- Navegação intuitiva e consistente
- Feedback visual para todas as ações
- Carregamento dinâmico de conteúdo

#### 3.8.8. Integração Completa Frontend-Backend

Todas as funcionalidades foram implementadas com integração completa entre frontend e backend, por exemplo:

```javascript
async function realizarCheckin() {
  try {
   
    if (!eventoId) {
      alert('ID do evento não encontrado');
      return;
    }

    
    const response = await fetch('/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_evento: eventoId })
    });

   
    if (response.ok) {
      const result = await response.json();

      
      document.getElementById('status-message').innerHTML = `
        <h3>Check-in realizado com sucesso!</h3>
        <p>Você ganhou 10 pontos!</p>
        <p>Total de pontos: ${result.total_pontos}</p>
      `;

      
      setTimeout(() => {
        window.location.href = '/painel';
      }, 3000);
    } else {
      const error = await response.json();
      alert(error.message || 'Erro ao realizar check-in');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro de conexão. Tente novamente.');
  }
}
```

**Fluxo Completo de Dados:**
1. **Frontend**: Captura de dados do usuário
2. **Validação**: Verificação no cliente e servidor
3. **API**: Processamento via endpoints REST
4. **Banco**: Persistência no PostgreSQL
5. **Resposta**: Retorno de dados atualizados
6. **Interface**: Atualização dinâmica da UI


## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

**VIDEO:** https://drive.google.com/file/d/1P80bKsjZKRvvSViL1ldTXt5vmI_gtCOq/view?usp=sharing 

#### 4.1.1 Sistema Completo Desenvolvido

O sistema Checkly foi desenvolvido como uma aplicação web completa para gerenciamento de eventos com funcionalidades de gamificação. A plataforma permite que criadores organizem eventos e participantes se inscrevam, realizem check-in e acumulem pontos.


#### 4.1.3 Funcionalidades Entregues

**1. Sistema de Autenticação Completo:**
- Cadastro de usuários com perfis diferenciados (Criador/Participante)
- Login seguro com validação de credenciais
- Sistema de sessões para manter usuários logados
- Logout com limpeza de sessão
- Middleware de autenticação protegendo rotas sensíveis

**2. Gerenciamento de Eventos:**
- Criação de eventos com formulário completo (nome, data, local, categoria, valor)
- Sistema de categorias pré-definidas (Shows, Negócios, Cultura, Esportes, Educação)
- Listagem dinâmica de eventos disponíveis
- Busca em tempo real por nome, local ou descrição
- Visualização detalhada de eventos individuais

**3. Sistema de Inscrições:**
- Inscrição em eventos com validação de duplicatas
- Confirmação automática de inscrições
- Listagem de eventos inscritos por usuário
- Tokens de confirmação únicos para cada inscrição

**4. Check-in e Pontuação:**
- Sistema de check-in funcional para eventos
- Pontuação automática (10 pontos por check-in realizado)
- Histórico de pontuação por usuário
- Validação de presença em eventos

**5. Interface de Usuário Moderna:**
- Design responsivo para desktop, tablet e mobile
- Navegação intuitiva com feedback visual
- Páginas personalizadas por tipo de usuário
- Dashboard com estatísticas e métricas
- Perfil do usuário com informações detalhadas

#### 4.1.4 Estrutura de Código Entregue

**Organização de Arquivos:**
```
checkly-system/
├── server.js                   
├── package.json                 
└── src/                         
    ├── controllers/             
    │   ├── UsuarioController.js
    │   ├── EventosController.js
    │   ├── CategoriasController.js
    │   ├── InscricoesController.js
    │   └── CheckinController.js
    ├── routes/                  
    │   ├── usuario.js
    │   ├── eventos.js
    │   ├── categorias.js
    │   ├── inscricoes.js
    │   └── checkin.js
    ├── views/                   
    │   ├── pages/               
    │   ├── css/                 
    │   └── js/                  
    └── assets/                  
```

**Principais Controllers Implementados:**
- **UsuarioController**: Gerenciamento de usuários, autenticação e perfis
- **EventosController**: CRUD completo de eventos com validações
- **CategoriasController**: Gerenciamento de categorias de eventos
- **InscricoesController**: Sistema de inscrições com verificações
- **CheckinController**: Controle de presença e pontuação

#### 4.1.5 Demonstração Visual do Sistema

**Tela de Login Implementada:**
Sistema de autenticação funcional com validação de credenciais e redirecionamento baseado no tipo de usuário.

**Dashboard Principal:**
Interface personalizada mostrando eventos disponíveis, sistema de busca em tempo real e navegação por categorias.

**Criação de Eventos:**
Formulário completo para criadores com validação de campos obrigatórios e seleção de categorias.

**Sistema de Inscrições:**
Página detalhada do evento com botão de inscrição funcional e feedback de confirmação.

**Perfil do Usuário:**
Painel moderno com avatar dinâmico, estatísticas de pontuação e ações rápidas.

#### 4.1.6 Integração Frontend-Backend

Todas as funcionalidades foram implementadas com integração completa:
- **Comunicação assíncrona** via Fetch API
- **Validação dupla** no frontend e backend
- **Tratamento de erros** robusto em todas as operações

O sistema demonstra uma aplicação web moderna e funcional, pronta para uso em ambiente de desenvolvimento e facilmente adaptável para produção com banco de dados real.

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

#### 4.2.1 Pontos Fortes do Sistema Desenvolvido

**Arquitetura Sólida:**
O sistema foi desenvolvido seguindo o padrão MVC (Model-View-Controller), proporcionando uma estrutura organizada e escalável. A separação clara entre lógica de negócio, apresentação e controle facilita a manutenção e futuras expansões do código.

**Interface de Usuário Moderna:**
A implementação de um design responsivo e intuitivo, com componentes visuais consistentes e navegação fluida, proporciona uma excelente experiência do usuário. O uso de Font Awesome para iconografia e um sistema de cores harmoniosas contribui para a profissionalização da plataforma.

**Funcionalidades Completas:**
Todas as funcionalidades principais foram implementadas e testadas: autenticação, gerenciamento de eventos, sistema de inscrições, check-in e pontuação. O sistema oferece uma solução completa para organização de eventos com elementos de gamificação.

**Integração Frontend-Backend Robusta:**
A comunicação entre frontend e backend foi implementada exclusivamente com Fetch API, garantindo operações assíncronas eficientes e tratamento adequado de erros. Todas as funcionalidades possuem validação dupla (cliente e servidor).

**Escalabilidade e Manutenibilidade:**
O código foi estruturado de forma modular, com controllers específicos para cada funcionalidade, facilitando futuras manutenções e expansões. A documentação completa dos endpoints e a organização clara dos arquivos contribuem para a sustentabilidade do projeto.

#### 4.2.2 Pontos a Melhorar

**Persistência de Dados:**
Atualmente o sistema utiliza arrays em memória para desenvolvimento. Para produção, é necessária a implementação de um banco de dados relacional (PostgreSQL) para garantir persistência e integridade dos dados.

**Sistema de Autenticação:**
Embora funcional, o sistema de autenticação pode ser aprimorado com:
- Criptografia de senhas (bcrypt)
- Tokens JWT para maior segurança
- Sistema de recuperação de senha por email
- Autenticação de dois fatores

**Validações e Segurança:**
- Implementação de validações mais rigorosas no backend
- Sanitização de inputs para prevenir ataques XSS
- Rate limiting para prevenir ataques de força bruta
- Validação de uploads de arquivos

**Performance e Otimização:**
- Implementação de cache para consultas frequentes
- Otimização de imagens e recursos estáticos
- Minificação de CSS e JavaScript
- Implementação de lazy loading para listas grandes

#### 4.2.3 Trabalhos Futuros e Melhorias

**Funcionalidades Avançadas:**

1. **Sistema de Notificações:**
   - Notificações push para lembretes de eventos
   - Emails automáticos de confirmação e lembretes
   - Sistema de notificações em tempo real

2. **Relatórios e Analytics:**
   - Dashboard avançado com métricas detalhadas
   - Relatórios de participação e engajamento
   - Exportação de dados em PDF e Excel
   - Gráficos interativos de estatísticas

3. **Sistema de Pagamentos:**
   - Integração com gateways de pagamento (Stripe, PayPal)
   - Gestão de eventos pagos e gratuitos
   - Sistema de reembolsos
   - Controle financeiro para organizadores

4. **Gamificação Avançada:**
   - Sistema de badges e conquistas
   - Ranking de participantes
   - Desafios e missões especiais
   - Programa de fidelidade com recompensas

5. **Recursos Sociais:**
   - Sistema de comentários e avaliações
   - Compartilhamento em redes sociais
   - Criação de grupos e comunidades
   - Chat em tempo real durante eventos

**Melhorias Técnicas:**

1. **Mobile App:**
   - Desenvolvimento de aplicativo móvel nativo
   - Sincronização com a plataforma web
   - Notificações push nativas
   - QR Code scanner integrado

2. **API Pública:**
   - Documentação completa da API
   - Sistema de autenticação por API keys
   - Rate limiting e throttling
   - Webhooks para integrações externas

3. **Infraestrutura:**
   - Deploy em cloud (AWS, Google Cloud, Azure)
   - Sistema de backup automatizado
   - Monitoramento e logging avançado
   - CDN para recursos estáticos

4. **Acessibilidade:**
   - Conformidade com WCAG 2.1
   - Suporte a leitores de tela
   - Navegação por teclado
   - Alto contraste e fontes ajustáveis

#### 4.2.4 Considerações Finais

O projeto Checkly representa uma solução completa e funcional para gerenciamento de eventos com gamificação. A implementação atual demonstra solidez técnica e atenção à experiência do usuário, estabelecendo uma base sólida para futuras expansões.

A arquitetura escolhida e as tecnologias implementadas permitem escalabilidade e manutenibilidade, características essenciais para um sistema que pode crescer e atender diferentes tipos de eventos e organizações.

O sistema está pronto para uso em ambiente de desenvolvimento e pode ser facilmente adaptado para produção com as melhorias sugeridas, especialmente a implementação de banco de dados e aprimoramentos de segurança.

A experiência de desenvolvimento deste projeto proporcionou aprendizado significativo em desenvolvimento full-stack, integração frontend-backend, design de interfaces e arquitetura de software, contribuindo para a formação técnica e preparação para desafios reais do mercado de tecnologia.



## <a name="c5"></a>5. Referências

Projeto Autoral por Nicole Zanin Silva.
