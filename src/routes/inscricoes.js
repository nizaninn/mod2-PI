const express = require('express');
const router = express.Router();
const InscricoesController = require('../controllers/InscricoesController');

router.post('/inscricoes', InscricoesController.criarInscricao);
router.get('/inscricoes', InscricoesController.listarInscricoes); // uso de query param: ?evento=ID

module.exports = router;
