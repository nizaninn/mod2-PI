const express = require('express');
const router = express.Router();
const CategoriasController = require('../controllers/CategoriasController');

// Rotas para o CRUD de categorias
router.post('/categorias', CategoriasController.criarCategoria);
router.get('/categorias', CategoriasController.listarCategorias);
router.get('/categorias/:id', CategoriasController.buscarCategoria);
router.put('/categorias/:id', CategoriasController.editarCategoria);
router.delete('/categorias/:id', CategoriasController.excluirCategoria);


module.exports = router;
