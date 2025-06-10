const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventosController');

router.post('/eventos', EventoController.criarEvento);
router.get('/eventos', EventoController.listarEventos);
router.get('/eventos/:id', EventoController.buscarEvento);



module.exports = router;
