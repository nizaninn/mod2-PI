const db = require('../config/db'); ///Aqui tá importando minha conexão com o banco de dados.

class Usuario { //Contém métodos estáticos que interagem com a tabela usuário.
  static async getAll() { //Faz uma consulta SQL e busca todos os usuários
    const result = await db.query('SELECT * FROM Usuario'); //Executa a query
    return result.rows; //Contém os dados retornados
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM Usuario WHERE id_unico = $1', [id]); //Executa uma consulta com parâmetro, passando o id como argumento.
    return result.rows[0]; //Pega o primeiro e único usuário encontrado
  }

  static async create(data) { //Insere um novo usuário no banco
    const result = await db.query(
      'INSERT INTO Usuario (nome, email, senha, role) VALUES ($1, $2, $3, $4) RETURNING *', //O returning devolve os dados recém inseridos.
      [data.nome, data.email, data.senha, data.role]
    );
    return result.rows[0]; //Retorna o usuário criado
  }

  static async delete(id) { //Deleta um usuário sempre com base no id
    const result = await db.query('DELETE FROM Usuario WHERE id_unico = $1 RETURNING *', [id]);
    return result.rowCount > 0; //true se foi deletado e false se não foi achado
  }
} //A classe usuário acaba só aqui

module.exports = Usuario; //exporta a classe usuário para ser usada em outros arquivos, como os controllers por exemplo.
