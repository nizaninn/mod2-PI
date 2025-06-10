// config/db.js
require('dotenv').config();

const { Pool } = require('pg');

// Criando a pool de conexões para Supabase
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Testar conexão na inicialização
pool.on('connect', () => {
  console.log('✅ Conectado ao banco Supabase');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão com Supabase:', err.message);
});

module.exports = pool;