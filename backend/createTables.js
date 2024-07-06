const { query } = require('./db');

const createTables = async () => {
  const createProductTable = `
    CREATE TABLE IF NOT EXISTS Product (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price FLOAT NOT NULL
    );
  `;

  const createOrderTable = `
    CREATE TABLE IF NOT EXISTS "Order" (
      id SERIAL PRIMARY KEY,
      productId INTEGER NOT NULL REFERENCES Product(id),
      quantity INTEGER NOT NULL,
      totalPrice FLOAT NOT NULL
    );
  `;

  await query(createProductTable);
  await query(createOrderTable);

  console.log('Tables created successfully');
};

createTables().catch((err) => {
  console.error('Error creating tables:', err);
});
