// controllers/UsuarioController.js
const pool = require('../config/db');

// Armazenamento temporário de usuários (em produção seria no banco)
let usuariosCadastrados = [
  { id_unico: 1, nome: 'Participante Teste', email: 'participante@teste.com', senha: '123456', role: 'participante' },
  { id_unico: 2, nome: 'Criador Teste', email: 'criador@teste.com', senha: '123456', role: 'criador' }
];

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  console.log('📝 Recebendo requisição de cadastro');
  console.log('📦 Body:', req.body);

  const { nome, email, senha, role } = req.body;

  // Validação básica
  if (!nome || !email || !senha) {
    console.log('❌ Dados obrigatórios não fornecidos');
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  console.log('📝 Tentativa de cadastro para:', email);

  // Verificar se email já existe
  const emailExiste = usuariosCadastrados.find(u => u.email === email);
  if (emailExiste) {
    console.log('❌ Email já existe:', email);
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  // Criar novo usuário
  const novoUsuario = {
    id_unico: Date.now(), // ID temporário
    nome,
    email,
    senha,
    role: role || 'participante'
  };

  // Adicionar ao array de usuários
  usuariosCadastrados.push(novoUsuario);

  console.log('✅ Usuário criado e adicionado:', novoUsuario);
  console.log('📊 Total de usuários:', usuariosCadastrados.length);

  res.status(201).json({
    success: true,
    usuario: {
      id_unico: novoUsuario.id_unico,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      role: novoUsuario.role
    }
  });
};

// Login do usuário
exports.loginUsuario = async (req, res) => {
  console.log('🔐 Recebendo requisição de login');
  console.log('📦 Body:', req.body);

  const { email, senha } = req.body;

  // Validação básica
  if (!email || !senha) {
    console.log('❌ Email ou senha não fornecidos');
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  console.log('🔐 Tentativa de login para:', email);

  // Buscar usuário no array de usuários cadastrados
  const usuario = usuariosCadastrados.find(u => u.email === email && u.senha === senha);

  console.log('👥 Total de usuários cadastrados:', usuariosCadastrados.length);
  console.log('🔍 Usuário encontrado:', usuario ? 'SIM' : 'NÃO');

  if (!usuario) {
    console.log('❌ Credenciais inválidas');
    return res.status(401).json({ error: 'Email ou senha incorretos' });
  }

  console.log('✅ Login bem-sucedido para:', usuario.email);

  // Criar sessão
  req.session.userId = usuario.id_unico;
  req.session.userName = usuario.nome;
  req.session.userRole = usuario.role;

  console.log('🎫 Sessão criada');

  res.json({
    success: true,
    usuario: {
      id: usuario.id_unico,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    }
  });
};

// Obter dados do usuário logado
exports.obterUsuarioLogado = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const result = await pool.query(
      'SELECT id_unico, nome, email, role FROM usuario WHERE id_unico = $1',
      [req.session.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar usuário por ID
exports.buscarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM usuario WHERE id_unico = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir usuário
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM usuario WHERE id_unico = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
