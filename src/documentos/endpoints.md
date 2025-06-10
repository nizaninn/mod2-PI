# Documentação de Endpoints da API

Esta documentação descreve os endpoints disponíveis no sistema, de acordo com cada tabela.


##  Usuário

### Criar usuário
- **POST** `/usuarios`
- Cria um novo usuário.

### Listar usuários
- **GET** `/usuarios`
- Retorna todos os usuários.

### Buscar usuário por ID
- **GET** `/usuarios/:id`
- Retorna um usuário específico.

### Excluir usuário
- **DELETE** `/usuarios/:id`
- Remove um usuário.

---

##  Categorias

### Criar categoria
- **POST** `/categorias`
- Cria uma nova categoria.

### Listar categorias
- **GET** `/categorias`
- Retorna todas as categorias.

### Buscar categoria por ID
- **GET** `/categorias/:id`
- Retorna uma categoria específica.

### Editar categoria
- **PUT** `/categorias/:id`
- Atualiza nome e descrição de uma categoria.

### Excluir categoria
- **DELETE** `/categorias/:id`
- Remove uma categoria.

---

##  Eventos

### Criar evento
- **POST** `/eventos`
- Cria um novo evento.

### Listar eventos
- **GET** `/eventos`
- Retorna todos os eventos.

### Buscar evento por ID
- **GET** `/eventos/:id`
- Retorna um evento específico.

---

##  Inscrições

### Criar inscrição
- **POST** `/inscricoes`
- Registra uma nova inscrição com status 'pendente'.

### Listar inscrições por evento
- **GET** `/inscricoes?evento=<id_evento>`
- Retorna todas as inscrições de um evento.

---

##  Check-in

### Registrar check-in
- **POST** `/checkin`
- Registra um check-in em um evento.

### Listar check-ins por evento
- **GET** `/checkin?evento=<id_evento>`
- Retorna todos os check-ins de um evento.

---

##  Pontos

### Buscar pontos de participante
- **GET** `/pontos/:id`
- Retorna os pontos de um participante.

### Atualizar pontos
- **PUT** `/pontos/:id`
- Atualiza a pontuação e o timestamp.

