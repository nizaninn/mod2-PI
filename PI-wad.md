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

O participante recebe acesso a um painel personalizado com QR Code, lista de eventos disponíveis, pontuação acumulada e missões a serem cumpridas. Ao participar dos eventos, os usuários realizam check-ins escaneando seus QR Codes nos dispositivos dos monitores. A pontuação é atualizada automaticamente, promovendo uma experiência dinâmica e interativa.

O organizador pode acompanhar métricas de engajamento, exportar listas de presença e gerar certificados automáticos para os participantes que completarem determinada pontuação. Todos esses recursos estão disponíveis diretamente na plataforma, sem necessidade de aplicativos externos ou planilhas manuais.

A proposta é entregar uma solução leve, intuitiva e atrativa para eventos de pequeno, médio e grade porte, desde feiras acadêmicas até grandes congressos.



## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

![Persona](mvc-boilerplate/assets/imagem-1.png)


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

![model](mvc-boilerplate/assets/modelagem.png)
![fisico](mvc-boilerplate/assets/print1.png)
![fisico2](mvc-boilerplate/assets/print2.png)

### 3.1.1 BD e Models (Semana 5)

Esta seção descreve os Models implementados na plataforma web, com foco em suas entidades, atributos, relacionamentos e função dentro da plataforma.



##  Model: Usuario

**Descrição:** Representa os usuários cadastrados no sistema. Eles podem ser criadores de eventos ou participantes.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único do usuário.
- `nome` (VARCHAR(100)): Nome completo do usuário. **Essa sessão é obrigatória**.
- `email` (VARCHAR(100)): Endereço de e-mail único. **Essa sessão é obrigatória e única**.
- `senha` (VARCHAR(100)): Senha do usuário (armazenada no banco de dados). **Essa sessão é obrigatória**.
- `role` (VARCHAR(20)): Define o papel do usuário, se sua conta será para exercer a função de `'criador'` de eventos ou `'participante'`, que irá apenas realizar as inscrições. **Essa sessão é obrigatória**.

**Relacionamentos:**
- Pode ser criador de vários `Eventos`.
- Pode participar de vários `Eventos` por meio de `Inscricoes`.
- Pode ter um `Check_in` por cada evento que o usuário participou.
- Pode ter um único registro de `Pontos`, que vão sendo acumulados na plataforma.



##  Model: Categorias

**Descrição:** Representa as categorias dos eventos, que serão separados em: coorporativos, shows e festas, teatro, standup, gospel, dança, festivais culturais, meetups, bem-estar e acadêmico.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único da categoria.
- `nome` (VARCHAR(100)): Nome da categoria. **Esse campo é obrigatório**.
- `descricao` (TEXT): Descrição opcional da categoria.

**Relacionamentos:**
- Uma `Categoria` pode estar associada a vários `Eventos`.



##  Model: Eventos

**Descrição:** Representa os eventos criados pelos usuários que se cadastram como criadores.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único do evento.
- `nome` (VARCHAR(100)): Nome do evento. **Esse campo é obrigatório**.
- `descricao` (TEXT): Descrição detalhada do evento.
- `data` (DATE): Data de realização do evento. **Esse campo é obrigatório**.
- `local` (VARCHAR(150)): Local do evento.
- `valor` (DECIMAL): Valor da inscrição (se aplicável).
- `criador_id` (INT): Referência ao `Usuario` criador. **Esse campo é obrigatório**.
- `categoria_id` (INT): Referência à `Categoria` do evento. **Esse campo é obrigatório**.

**Relacionamentos:**
- Pertence a um `Usuario` (quando for criador).
- Pertence a uma `Categoria`.
- Pode ter várias `Inscricoes`.
- Pode ter vários `Check_in`.



## Model: Inscricoes

**Descrição:** Representa as inscrições dos participantes nos eventos.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único da inscrição.
- `data_de_inscricao` (TIMESTAMP): Data/hora da inscrição. 
- `status` (VARCHAR(20)): Estado da inscrição: `'pendente'`, `'confirmado'` ou `'cancelado'`. **Esse campo é obrigatório**.
- `id_participante` (INT): Referência ao participante (`Usuario`). **Esse campo é obrigatório**.
- `id_evento` (INT): Referência ao `Evento`. **Esse campo é obrigatório**.
- `token_de_confirmacao` (VARCHAR(255)): Token gerado para confirmação.

**Relacionamentos:**
- Pertence a um `Usuario`.
- Pertence a um `Evento`.


## Model: Check_in

**Descrição:** Representa o check-in presencial do participante no evento.

**Campos:**
- `id_unico` (SERIAL, PK): Identificador único do check-in.
- `data` (DATE): Data do check-in. **Esse campo é obrigatório**.
- `hora` (TIME): Hora do check-in. **Esse campo é obrigatório**.
- `local` (VARCHAR(150)): Local de realização do check-in.
- `id_participante` (INT): Referência ao `Usuario`. **Esse campo é obrigatório**.
- `id_evento` (INT): Referência ao `Evento`. **Esse campo é obrigatório**.
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

O padrão de arquitetura adotado para minha aplicação foi o MVC, ou Model-View-Controller, que é uma arquitetura de software amplamente adotada na engenharia de software para o desenvolvimento de sistemas robustos e escaláveis. Esse padrão organiza a estrutura de uma aplicação em três componentes principais: o Modelo (Model), a Visão (View) e o Controlador (Controller).

 Modelo (Model): Modelo representa os dados e a lógica de negócios da aplicação. Ele inclui o estado e o comportamento dos objetos subjacentes, incluindo acesso a dados, validações e operações relacionadas. O Modelo é responsável por gerenciar a manipulação dos dados e notificar os Controladores sobre quaisquer mudanças relevantes.

 Visão (View): A Visão é responsável pela apresentação dos dados ao usuário final. Ela exibe a interface gráfica ou textual com a qual o usuário interage, representando visualmente as informações do Modelo de maneira compreensível. A Visão é passiva e não possui lógica de negócios; ela apenas reflete o estado atual do Modelo.

 Controlador (Controller): O Controlador atua como intermediário entre a Visão e o Modelo, gerenciando as interações do usuário e as operações de manipulação de dados. Ele recebe as entradas do usuário na Visão, interpreta essas entradas e aciona as ações apropriadas no Modelo. O Controlador também é responsável por atualizar a Visão conforme necessário, refletindo as mudanças nos dados do Modelo.

 Vale ressaltar que o MVC é amplamente utilizado por várias razões, dentre elas, incluem-se as seguintes:

 Separação de preocupações: O MVC promove uma clara separação de preocupações entre os diferentes componentes da aplicação, facilitando a manutenção, a extensibilidade e a reutilização de código.

 Flexibilidade e escalabilidade: A arquitetura modular do MVC permite que os desenvolvedores trabalhem de forma independente em diferentes partes da aplicação, facilitando a colaboração em equipe e a evolução do software ao longo do tempo.

 Facilidade de teste: A separação entre a lógica de negócios, a apresentação e o controle de fluxo torna mais fácil escrever testes automatizados para cada componente individualmente, garantindo a robustez e a qualidade do software.

 Adoção generalizada: O MVC é um padrão bem estabelecido e amplamente adotado pela comunidade de desenvolvimento de software, o que significa que há uma abundância de recursos, ferramentas e frameworks disponíveis para facilitar sua implementação em uma variedade de tecnologias e plataformas.

 Pode-se, portanto, afirmar que o padrão de design de software MVC é uma abordagem eficaz para o desenvolvimento de software modular, flexível e escalável, que promove a separação de preocupações e facilita a manutenção e evolução de aplicações complexas ao longo do tempo.

 Agora vamos à nossa minha propriamente dita. O Checlky é uma aplicação web feita com base na arquitetura MVC (Model-View-Controller), cujo esboço foi desenhado através da plataforma Draw.io. 


![diagrama](mvc-boilerplate/assets/ArquiteturaPI.drawio.png)

### 3.3. Wireframes (Semana 03)

![folha1](mvc-boilerplate/assets/wireframe1.jpg)
![folha2](mvc-boilerplate/assets/wireframe2.jpg)

Estes são os primeiros wireframes de baixa fidelidade do projeto, concebidos com foco na experiência do usuário e alinhados à seguinte user story:

"Como participante de congressos corporativos, quero encontrar e organizar meus eventos em um só lugar, para que eu não precise perder tempo acessando diversas plataformas de diferentes empresas para realizar minha inscrição."

A proposta dos wireframes é traduzir essa necessidade real em uma solução digital clara e funcional. Eles priorizam navegação intuitiva, centralização de eventos e facilidade na jornada de inscrição, que são lementos essenciais para melhorar a produtividade do usuário e reduzir fricções no processo de organização de congressos.

Nesse contexto, o acesso direto ao gráfico de engajamento se torna uma funcionalidade essencial. Ele fornece métricas valiosas como taxa de visualização da página do evento, número de inscrições, tempo médio de navegação e conversão por canal de divulgação. Assim, a plataforma não só resolve o problema da fragmentação, como também oferece insights estratégicos que possibilitam o criador a melhorar continuamente suas ações.
### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

Documentar os endpoints de uma API é essencial para garantir a clareza, organização e manutenibilidade do sistema. Uma boa documentação permite que desenvolvedores compreendam rapidamente como interagir com os recursos disponíveis, quais métodos HTTP utilizar, quais parâmetros são esperados e quais respostas podem ser retornadas

Esta documentação descreve os endpoints disponíveis no sistema, de acordo com cada tabela.

Para a documentação completa dos endpoints, acesse: [documentação de endpoints](/endpoints.md)


### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---