const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: '123', // Add your password here
  port: 5432,
});

const query = async (text, params) => {
  const res = await pool.query(text, params);
  return res;
};

module.exports = { query };
