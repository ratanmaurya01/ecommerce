const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Your PostgreSQL pool setup
const app = express();

app.use(cors());
app.use(express.json()); // Body parser middleware

// Routes for products
app.get('/products', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    await pool.query('UPDATE products SET name = $1, price = $2 WHERE id = $3', [name, price, id]);
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes for orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await pool.query('SELECT * FROM orders');
    res.json(orders.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.post('/orders', async (req, res) => {
  const { productId, quantity, totalPrice } = req.body;
  try {
    await pool.query('INSERT INTO orders (productid, quantity, totalprice) VALUES ($1, $2, $3)', [productId, quantity, totalPrice]);
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Check if there are orders referencing this product
    const ordersCount = await pool.query('SELECT COUNT(*) FROM orders WHERE productid = $1', [id]);
    if (ordersCount.rows[0].count > 0) {
      return res.status(400).json({ error: 'Cannot delete product with existing orders.' });
    }

    // Proceed with deletion if no orders exist
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
