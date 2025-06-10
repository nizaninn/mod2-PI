// controllers/CategoriasController.js
const pool = require('../config/db');

// Criar uma nova Categoria
exports.criarCategoria = async (req, res) => {
  const { nome, descricao } = req.body;

  const query = 'INSERT INTO categorias (nome, descricao) VALUES ($1, $2) RETURNING *';
  const values = [nome, descricao];

  try {
    const result = await pool.query(query, values);
    const categoria = result.rows[0];
    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  const query = 'SELECT * FROM categorias';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar categoria por ID
exports.buscarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM categorias WHERE id_unico = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma Categoria
exports.editarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  const query = `
    UPDATE categorias 
    SET nome = $1, descricao = $2 
    WHERE id_unico = $3 
    RETURNING *`;
    
  const values = [nome, descricao, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma Categoria
exports.excluirCategoria = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM categorias WHERE id_unico = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
