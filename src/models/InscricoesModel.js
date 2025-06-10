const db = require('../config/db');

class Inscricao {
  static async create(data) {
    const result = await db.query(
      `INSERT INTO Inscricoes (id_participante, id_evento, token_de_confirmacao, status)
       VALUES ($1, $2, $3, 'pendente') RETURNING *`,
      [data.id_participante, data.id_evento, data.token_de_confirmacao]
    );
    return result.rows[0];
  }

  static async getByEvento(id_evento) {
    const result = await db.query('SELECT * FROM Inscricoes WHERE id_evento = $1', [id_evento]);
    return result.rows;
  }
}

module.exports = Inscricao;
