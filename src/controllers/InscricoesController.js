// const pool = require('../config/db'); // Não usado - usando array em memória

// Array para armazenar inscrições em memória
let inscricoesCadastradas = [];
let proximoIdInscricao = 1;

// Criar inscrição
exports.criarInscricao = async (req, res) => {
  const { id_evento, token_de_confirmacao } = req.body;
  const id_participante = req.session.userId;

  console.log('📝 Recebendo requisição de inscrição');
  console.log('📦 Body:', req.body);
  console.log('👤 Participante ID:', id_participante);

  if (!id_participante) {
    console.log('❌ Usuário não autenticado');
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    // Verificar se já está inscrito
    const inscricaoExistente = inscricoesCadastradas.find(
      i => i.id_participante === id_participante && i.id_evento === parseInt(id_evento)
    );

    if (inscricaoExistente) {
      console.log('❌ Usuário já inscrito no evento');
      return res.status(400).json({ error: 'Usuário já está inscrito neste evento' });
    }

    const novaInscricao = {
      id_unico: proximoIdInscricao++,
      id_participante,
      id_evento: parseInt(id_evento),
      token_de_confirmacao: token_de_confirmacao || `token_${Date.now()}`,
      status: 'confirmado',
      data_de_inscricao: new Date().toISOString()
    };

    inscricoesCadastradas.push(novaInscricao);

    console.log('✅ Inscrição criada com sucesso:', novaInscricao);
    console.log('📊 Total de inscrições:', inscricoesCadastradas.length);

    res.status(201).json({ success: true, inscricao: novaInscricao });
  } catch (err) {
    console.error('❌ Erro ao criar inscrição:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar inscrições por evento ou participante
exports.listarInscricoes = async (req, res) => {
  const { evento, participante } = req.query;

  try {
    console.log('📋 Listando inscrições - Evento:', evento, 'Participante:', participante);

    let inscricoesFiltradas = inscricoesCadastradas;

    if (evento) {
      inscricoesFiltradas = inscricoesCadastradas.filter(i => i.id_evento === parseInt(evento));
      console.log(`📊 Inscrições para evento ${evento}:`, inscricoesFiltradas.length);
    } else if (participante) {
      inscricoesFiltradas = inscricoesCadastradas.filter(i => i.id_participante === parseInt(participante));
      console.log(`📊 Inscrições do participante ${participante}:`, inscricoesFiltradas.length);
    } else {
      // Se nenhum filtro, retornar todas as inscrições
      inscricoesFiltradas = inscricoesCadastradas.sort((a, b) =>
        new Date(b.data_de_inscricao) - new Date(a.data_de_inscricao)
      );
      console.log('📊 Total de inscrições:', inscricoesFiltradas.length);
    }

    res.status(200).json(inscricoesFiltradas);
  } catch (err) {
    console.error('❌ Erro ao listar inscrições:', err);
    res.status(500).json({ error: err.message });
  }
};
