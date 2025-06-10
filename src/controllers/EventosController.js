const pool = require('../config/db');

// Criar evento
exports.criarEvento = async (req, res) => {
  const { nome, descricao, data, local, valor, categoria_id } = req.body;
  const criador_id = req.session.userId;

  if (!criador_id) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO eventos (nome, descricao, data, local, valor, criador_id, categoria_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nome, descricao, data, local, valor || 0, criador_id, categoria_id]
    );
    res.status(201).json({ success: true, evento: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar eventos
exports.listarEventos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar evento por ID
exports.buscarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM eventos WHERE id_unico = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};