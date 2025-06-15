// controllers/CategoriasController.js
// const pool = require('../config/db'); // Não usado - usando array em memória

// Array para armazenar categorias em memória
let categoriasCadastradas = [
  { id_unico: 1, nome: 'Shows', descricao: 'Eventos musicais e apresentações' },
  { id_unico: 2, nome: 'Negócios', descricao: 'Eventos corporativos e networking' },
  { id_unico: 3, nome: 'Cultura', descricao: 'Eventos culturais e artísticos' },
  { id_unico: 4, nome: 'Esportes', descricao: 'Eventos esportivos e competições' },
  { id_unico: 5, nome: 'Educação', descricao: 'Workshops, cursos e palestras' }
];
let proximoIdCategoria = 6;

// Criar uma nova Categoria
exports.criarCategoria = async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    console.log('Criando nova categoria:', nome);

    const novaCategoria = {
      id_unico: proximoIdCategoria++,
      nome,
      descricao
    };

    categoriasCadastradas.push(novaCategoria);

    console.log('Categoria criada:', novaCategoria);
    res.status(201).json(novaCategoria);
  } catch (err) {
    console.error('Erro ao criar categoria:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  try {
    console.log('Listando todas as categorias');
    console.log('Total de categorias:', categoriasCadastradas.length);

    res.status(200).json(categoriasCadastradas);
  } catch (err) {
    console.error('Erro ao listar categorias:', err);
    res.status(500).json({ error: err.message });
  }
};

// Buscar categoria por ID
exports.buscarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Buscando categoria por ID:', id);

    const categoria = categoriasCadastradas.find(c => c.id_unico === parseInt(id));

    if (!categoria) {
      console.log('Categoria não encontrada');
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    console.log('Categoria encontrada:', categoria.nome);
    res.status(200).json(categoria);
  } catch (err) {
    console.error('Erro ao buscar categoria:', err);
    res.status(500).json({ error: err.message });
  }
};

// Editar uma Categoria
exports.editarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  try {
    console.log('Editando categoria ID:', id);

    const index = categoriasCadastradas.findIndex(c => c.id_unico === parseInt(id));

    if (index === -1) {
      console.log('Categoria não encontrada para edição');
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    categoriasCadastradas[index] = {
      ...categoriasCadastradas[index],
      nome,
      descricao
    };

    console.log('Categoria editada:', categoriasCadastradas[index]);
    res.status(200).json(categoriasCadastradas[index]);
  } catch (err) {
    console.error('Erro ao editar categoria:', err);
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma Categoria
exports.excluirCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Excluindo categoria ID:', id);

    const index = categoriasCadastradas.findIndex(c => c.id_unico === parseInt(id));

    if (index === -1) {
      console.log('Categoria não encontrada para exclusão');
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    const categoriaExcluida = categoriasCadastradas.splice(index, 1)[0];
    console.log('Categoria excluída:', categoriaExcluida.nome);

    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir categoria:', err);
    res.status(500).json({ error: err.message });
  }
};
