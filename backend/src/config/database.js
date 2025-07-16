const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '161.35.59.121',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp_db',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
});

pool.on('connect', () => {
  console.log('✅   Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en PostgreSQL:', err);
});

module.exports = pool;