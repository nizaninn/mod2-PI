// controllers/UsuarioController.js
// const pool = require('../config/db'); // Não usado no momento - usando array em memória

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
    console.log('👤 Obtendo dados do usuário logado');
    console.log('📋 Session userId:', req.session.userId);

    if (!req.session.userId) {
      console.log('❌ Usuário não autenticado');
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Buscar usuário no array de usuários cadastrados
    const usuario = usuariosCadastrados.find(u => u.id_unico === req.session.userId);

    if (!usuario) {
      console.log('❌ Usuário não encontrado no array');
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    console.log('✅ Usuário encontrado:', usuario.email);

    res.json({
      id_unico: usuario.id_unico,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    });
  } catch (err) {
    console.error('❌ Erro ao obter usuário:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    console.log('📋 Listando todos os usuários');
    console.log('👥 Total de usuários:', usuariosCadastrados.length);

    // Retornar usuários sem a senha
    const usuariosSemSenha = usuariosCadastrados.map(u => ({
      id_unico: u.id_unico,
      nome: u.nome,
      email: u.email,
      role: u.role
    }));

    res.status(200).json(usuariosSemSenha);
  } catch (err) {
    console.error('❌ Erro ao listar usuários:', err);
    res.status(500).json({ error: err.message });
  }
};

// Buscar usuário por ID
exports.buscarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('🔍 Buscando usuário por ID:', id);

    const usuario = usuariosCadastrados.find(u => u.id_unico === parseInt(id));

    if (!usuario) {
      console.log('❌ Usuário não encontrado');
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log('✅ Usuário encontrado:', usuario.email);

    // Retornar usuário sem a senha
    res.status(200).json({
      id_unico: usuario.id_unico,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    });
  } catch (err) {
    console.error('❌ Erro ao buscar usuário:', err);
    res.status(500).json({ error: err.message });
  }
};

// Excluir usuário
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('🗑️ Excluindo usuário por ID:', id);

    const index = usuariosCadastrados.findIndex(u => u.id_unico === parseInt(id));

    if (index === -1) {
      console.log('❌ Usuário não encontrado para exclusão');
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuarioExcluido = usuariosCadastrados.splice(index, 1)[0];
    console.log('✅ Usuário excluído:', usuarioExcluido.email);

    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('❌ Erro ao excluir usuário:', err);
    res.status(500).json({ error: err.message });
  }
};
