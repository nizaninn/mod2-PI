const db = require('../config/db');

class Evento {
  static async getAll() {
    const result = await db.query('SELECT * FROM Eventos');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM Eventos WHERE id_unico = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO Eventos (nome, descricao, data, local, valor, criador_id, categoria_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        data.nome,
        data.descricao,
        data.data,
        data.local,
        data.valor,
        data.criador_id,
        data.categoria_id
      ]
    );
    return result.rows[0];
  }
}

module.exports = Evento;
