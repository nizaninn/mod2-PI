const pool = require('../config/db');

// Criar inscrição
exports.criarInscricao = async (req, res) => {
  const { id_evento, token_de_confirmacao } = req.body;
  const id_participante = req.session.userId;

  if (!id_participante) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    // Verificar se já está inscrito
    const inscricaoExistente = await pool.query(
      'SELECT * FROM inscricoes WHERE id_participante = $1 AND id_evento = $2',
      [id_participante, id_evento]
    );

    if (inscricaoExistente.rows.length > 0) {
      return res.status(400).json({ error: 'Usuário já está inscrito neste evento' });
    }

    const result = await pool.query(
      `INSERT INTO inscricoes (id_participante, id_evento, token_de_confirmacao, status)
       VALUES ($1, $2, $3, 'confirmado') RETURNING *`,
      [id_participante, id_evento, token_de_confirmacao]
    );
    res.status(201).json({ success: true, inscricao: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar inscrições por evento ou participante
exports.listarInscricoes = async (req, res) => {
  const { evento, participante } = req.query;

  try {
    let query = 'SELECT * FROM inscricoes';
    let params = [];

    if (evento) {
      query += ' WHERE id_evento = $1';
      params.push(evento);
    } else if (participante) {
      query += ' WHERE id_participante = $1';
      params.push(participante);
    } else {
      // Se nenhum filtro, retornar todas as inscrições (apenas para admin)
      query += ' ORDER BY data_de_inscricao DESC';
    }

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
