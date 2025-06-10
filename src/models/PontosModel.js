const db = require('../config/db'); 

class Ponto {
  static async getByParticipante(id_participante) {
    const result = await db.query(
      'SELECT * FROM Pontos WHERE id_participante = $1',
      [id_participante]
    );
    return result.rows[0];
  }

  static async update(id_participante, total_pontos) {
    const result = await db.query(
      `UPDATE Pontos
       SET total_pontos = $1, ultima_atualizacao = CURRENT_TIMESTAMP
       WHERE id_participante = $2
       RETURNING *`,
      [total_pontos, id_participante]
    );
    return result.rows[0];
  }
}

module.exports = Ponto;
