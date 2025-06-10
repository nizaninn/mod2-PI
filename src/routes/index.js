const express = require('express');
const router = express.Router();

router.use(require('./usuarios'));
router.use(require('./categorias'));
router.use(require('./eventos'));
router.use(require('./inscricoes'));
router.use(require('./checkin'));
router.use(require('./pontos'));

module.exports = router;

// Resolva