const db = require('../config/db');

class Categoria {
  static async getAll() {
    const result = await db.query('SELECT * FROM Categorias');
    return result.rows;
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO Categorias (nome, descricao) VALUES ($1, $2) RETURNING *',
      [data.nome, data.descricao]
    );
    return result.rows[0];
  }
}

module.exports = Categoria;
