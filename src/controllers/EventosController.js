// const pool = require('../config/db'); // Não usado - usando array em memória

// Array para armazenar eventos em memória
let eventosCadastrados = [
  {
    id_unico: 1,
    nome: "Workshop de Desenvolvimento Web",
    descricao: "Aprenda as tecnologias mais modernas do desenvolvimento web",
    data: "2025-01-15",
    local: "Centro de Convenções São Paulo",
    valor: 150.00,
    criador_id: 1,
    categoria_id: 5,
    created_at: new Date().toISOString()
  },
  {
    id_unico: 2,
    nome: "Show da Banda Rock Nacional",
    descricao: "Uma noite inesquecível com o melhor do rock nacional",
    data: "2025-01-20",
    local: "Arena Anhembi",
    valor: 80.00,
    criador_id: 1,
    categoria_id: 1,
    created_at: new Date().toISOString()
  },
  {
    id_unico: 3,
    nome: "Conferência de Negócios 2025",
    descricao: "Networking e palestras sobre empreendedorismo",
    data: "2025-02-05",
    local: "Hotel Copacabana Palace",
    valor: 200.00,
    criador_id: 1,
    categoria_id: 2,
    created_at: new Date().toISOString()
  }
];
let proximoIdEvento = 4;

// Criar evento
exports.criarEvento = async (req, res) => {
  const { nome, descricao, data, local, valor, categoria_id } = req.body;
  const criador_id = req.session.userId;

  console.log('🎉 Recebendo requisição de criação de evento');
  console.log('📦 Body:', req.body);
  console.log('👤 Criador ID:', criador_id);

  if (!criador_id) {
    console.log('❌ Usuário não autenticado');
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const novoEvento = {
      id_unico: proximoIdEvento++,
      nome,
      descricao,
      data,
      local,
      valor: valor || 0,
      criador_id,
      categoria_id: parseInt(categoria_id),
      created_at: new Date().toISOString()
    };

    eventosCadastrados.push(novoEvento);

    console.log('✅ Evento criado com sucesso:', novoEvento);
    console.log('📊 Total de eventos:', eventosCadastrados.length);

    res.status(201).json({ success: true, evento: novoEvento });
  } catch (err) {
    console.error('❌ Erro ao criar evento:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar eventos
exports.listarEventos = async (req, res) => {
  try {
    console.log('📋 Listando todos os eventos');
    console.log('📊 Total de eventos:', eventosCadastrados.length);

    res.status(200).json(eventosCadastrados);
  } catch (err) {
    console.error('❌ Erro ao listar eventos:', err);
    res.status(500).json({ error: err.message });
  }
};

// Buscar evento por ID
exports.buscarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('🔍 Buscando evento por ID:', id);

    const evento = eventosCadastrados.find(e => e.id_unico === parseInt(id));

    if (!evento) {
      console.log('❌ Evento não encontrado');
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    console.log('✅ Evento encontrado:', evento.nome);
    res.status(200).json(evento);
  } catch (err) {
    console.error('❌ Erro ao buscar evento:', err);
    res.status(500).json({ error: err.message });
  }
};