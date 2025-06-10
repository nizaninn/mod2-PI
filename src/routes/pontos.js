const express = require('express');
const router = express.Router();
const PontosController = require('../controllers/PontosController');

router.get('/pontos/:id', PontosController.buscarPonto); // <- singular aqui
router.put('/pontos/:id', PontosController.atualizarPontos);

module.exports = router;
