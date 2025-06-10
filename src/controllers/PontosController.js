const pool = require('../config/db');

// Buscar pontos de um participante
exports.buscarPonto = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM pontos WHERE id_participante = $1', [id]);
    if (result.rows.length === 0) {
      // Se não existe registro de pontos, criar um com 0 pontos
      const newRecord = await pool.query(
        'INSERT INTO pontos (id_participante, total_pontos) VALUES ($1, 0) RETURNING *',
        [id]
      );
      return res.status(200).json(newRecord.rows[0]);
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar pontos (caso precise)
exports.atualizarPontos = async (req, res) => {
  const { id } = req.params;
  const { total_pontos } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pontos
       SET total_pontos = $1, ultima_atualizacao = CURRENT_TIMESTAMP
       WHERE id_participante = $2
       RETURNING *`,
      [total_pontos, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
