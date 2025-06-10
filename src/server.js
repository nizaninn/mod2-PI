/// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

// Importando todas as rotas
const categoriasRoutes = require('./routes/categorias');
const usuariosRoutes = require('./routes/usuario'); // <- singular aqui
const eventosRoutes = require('./routes/eventos');
const inscricoesRoutes = require('./routes/inscricoes');
const checkinRoutes = require('./routes/checkin');
const pontosRoutes = require('./routes/pontos');

const app = express();
const port = 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar sessões
app.use(session({
  secret: 'checkly-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Servir arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/js', express.static(path.join(__dirname, 'views/js')));

// Middleware para verificar autenticação
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

// Rotas para páginas HTML
app.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    res.redirect('/painel');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.get('/cadastro', (req, res) => {
  res.render('pages/cadastro');
});

app.get('/recuperarsenha', (req, res) => {
  res.render('pages/recuperarsenha');
});

app.get('/painel', requireAuth, (req, res) => {
  res.render('pages/painel', {
    user: {
      id: req.session.userId,
      name: req.session.userName,
      role: req.session.userRole
    }
  });
});

app.get('/checkin', requireAuth, (req, res) => {
  res.render('pages/checkin');
});

app.get('/criarevento', requireAuth, (req, res) => {
  res.render('pages/criarevento');
});

app.get('/perfil', requireAuth, (req, res) => {
  res.render('pages/perfil');
});

app.get('/inscrever', requireAuth, (req, res) => {
  res.render('pages/inscrever');
});

app.get('/meuevento', requireAuth, (req, res) => {
  res.render('pages/meuevento');
});

app.get('/categoria', (req, res) => {
  res.render('pages/categoria');
});

app.get('/estatisticas', requireAuth, (req, res) => {
  res.render('pages/estatisticas');
});

// Rota para logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.json({ success: true });
  });
});

// Rotas da API com prefixo /api
app.use('/api', categoriasRoutes);
app.use('/api', usuariosRoutes); //
app.use('/api', eventosRoutes);
app.use('/api', inscricoesRoutes);
app.use('/api', checkinRoutes);
app.use('/api', pontosRoutes);

app.listen(port, () => {
  console.log(` Servidor rodando na porta ${port}`);
});
