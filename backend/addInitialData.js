const { query } = require('./db');

const addInitialData = async () => {
  const products = [
    { name: 'Product 1', price: 10.99 },
    { name: 'Product 2', price: 15.99 },
    { name: 'Product 3', price: 8.99 },
    { name: 'Product 4', price: 12.99 },
  ];

  for (const product of products) {
    await query(
      'INSERT INTO Product (name, price) VALUES ($1, $2)',
      [product.name, product.price]
    );
  }

  console.log('Initial data added successfully');
};

addInitialData().catch((err) => {
  console.error('Error adding initial data:', err);
});
