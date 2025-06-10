const pool = require('../config/db');

// Registrar check-in
exports.registrarCheckin = async (req, res) => {
  const { id_evento } = req.body;
  const id_participante = req.session.userId;

  if (!id_participante) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    // Verificar se o usuário está inscrito no evento
    const inscricaoResult = await pool.query(
      'SELECT * FROM inscricoes WHERE id_participante = $1 AND id_evento = $2',
      [id_participante, id_evento]
    );

    if (inscricaoResult.rows.length === 0) {
      return res.status(400).json({ error: 'Usuário não está inscrito neste evento' });
    }

    // Verificar se já fez check-in
    const checkinExistente = await pool.query(
      'SELECT * FROM check_in WHERE id_participante = $1 AND id_evento = $2',
      [id_participante, id_evento]
    );

    if (checkinExistente.rows.length > 0) {
      return res.status(400).json({ error: 'Check-in já realizado para este evento' });
    }

    // Buscar dados do evento
    const eventoResult = await pool.query(
      'SELECT * FROM eventos WHERE id_unico = $1',
      [id_evento]
    );

    if (eventoResult.rows.length === 0) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    const evento = eventoResult.rows[0];
    const agora = new Date();

    // Registrar check-in
    const result = await pool.query(
      `INSERT INTO check_in (data, hora, local, id_participante, id_evento, qr_token)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        agora.toISOString().split('T')[0], // data
        agora.toTimeString().split(' ')[0], // hora
        evento.local,
        id_participante,
        id_evento,
        `checkin_${id_participante}_${id_evento}_${Date.now()}`
      ]
    );

    // Atualizar pontos do usuário
    try {
      await pool.query(
        `INSERT INTO pontos (id_participante, total_pontos)
         VALUES ($1, 10)
         ON CONFLICT (id_participante)
         DO UPDATE SET total_pontos = pontos.total_pontos + 10, ultima_atualizacao = CURRENT_TIMESTAMP`,
        [id_participante]
      );
    } catch (pointsError) {
      console.error('Erro ao atualizar pontos:', pointsError);
      // Tentar método alternativo
      try {
        const existingPoints = await pool.query('SELECT total_pontos FROM pontos WHERE id_participante = $1', [id_participante]);
        if (existingPoints.rows.length > 0) {
          await pool.query(
            'UPDATE pontos SET total_pontos = total_pontos + 10, ultima_atualizacao = CURRENT_TIMESTAMP WHERE id_participante = $1',
            [id_participante]
          );
        } else {
          await pool.query(
            'INSERT INTO pontos (id_participante, total_pontos) VALUES ($1, 10)',
            [id_participante]
          );
        }
      } catch (fallbackError) {
        console.error('Erro no fallback de pontos:', fallbackError);
        // Continuar mesmo se não conseguir atualizar pontos
      }
    }

    res.status(201).json({
      success: true,
      checkin: result.rows[0],
      pontosGanhos: 10
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar check-ins por evento
exports.listarCheckins = async (req, res) => {
  const { evento } = req.query;

  try {
    const result = await pool.query('SELECT * FROM check_in WHERE id_evento = $1', [evento]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
