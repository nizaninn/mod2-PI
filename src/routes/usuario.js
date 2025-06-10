// routes/usuario.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController'); // atenção ao nome do arquivo!

// Rotas de autenticação
router.post('/login', UsuarioController.loginUsuario);
router.get('/me', UsuarioController.obterUsuarioLogado);

// Rotas CRUD de usuários
router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuario);
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);

module.exports = router;
