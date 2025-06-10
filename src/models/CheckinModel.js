const db = require('../config/db');

class Checkin {
  static async create(data) {
    const result = await db.query(
      `INSERT INTO Check_in (data, hora, local, id_participante, id_evento, qr_token)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.data,
        data.hora,
        data.local,
        data.id_participante,
        data.id_evento,
        data.qr_token
      ]
    );
    return result.rows[0];
  }

  static async getByEvento(id_evento) {
    const result = await db.query('SELECT * FROM Check_in WHERE id_evento = $1', [id_evento]);
    return result.rows;
  }
}

module.exports = Checkin;
