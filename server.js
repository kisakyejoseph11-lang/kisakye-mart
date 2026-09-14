const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const JWT_SECRET = process.env.JWT_SECRET || 'KISAKYE_GREEN_2024';
const query = (t, p) => pool.query(t, p);
const genToken = (u) => jwt.sign({ id: u.id, role: u.role }, JWT_SECRET, { expiresIn: '7d' });

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next(); // allow guest orders
    const d = jwt.verify(token, JWT_SECRET);
    const r = await query('SELECT * FROM users WHERE id=$1', [d.id]);
    if (r.rows.length) req.user = r.rows[0];
    next();
  } catch { next(); }
};

app.use(auth);

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await query('SELECT * FROM users WHERE email=$1', [email]);
    if (!r.rows.length) return res.status(401).json({ error: 'Invalid email' });
    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid password' });
    delete user.password_hash;
    res.json({ message: 'Login ok - KISAKYE MART', user, token: genToken(user) });
  } catch (e) {
    res.status(500).json({ error: 'Login failed: ' + e.message });
  }
});

// CATEGORIES
app.get('/api/categories', async (req, res) => {
  try {
    const r = await query('SELECT * FROM categories ORDER BY name');
    res.json(r.rows);
  } catch (e) { res.json([]); }
});

// PRODUCTS - FIXED YOUR BUG FROM PHOTO
app.get('/api/products', async (req, res) => {
  try {
    const search = req.query.search || '';
    const category = req.query.category || '';
    const r = await query(`
      SELECT p.id, p.name, p.price, p.stock, p.image_url, p.brand, c.name as category
      FROM products p LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.active = true
      AND (p.name ILIKE $1 OR p.brand ILIKE $1)
      AND ($2 = '' OR c.name ILIKE $2)
      ORDER BY p.name
    `, [`%${search}%`, category]);
    res.json(r.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Products failed' });
  }
});

// ADD PRODUCT
app.post('/api/products', async (req, res) => {
  try {
    if (!req.user || (req.user.role!== 'seller' && req.user.role!== 'admin')) {
      return res.status(403).json({ error: 'Seller only' });
    }
    const { name, price, stock, image_url, category_id } = req.body;
    const r = await query(
      'INSERT INTO products(seller_id, category_id, name, price, stock, image_url) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [req.user.id, category_id || 1, name, Number(price), Number(stock) || 100, image_url || '']
    );
    await query(
      'INSERT INTO transaction_logs(transaction_type, amount, description, created_by) VALUES($1,$2,$3,$4)',
      ['PRODUCT_ADDED', price, 'Added: ' + name, req.user.id]
    );
    res.status(201).json({ message: 'Product added GREEN', product: r.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CREATE ORDER - AIRTEL MONEY ONLY 07544590988 - 5% COMMISSION
app.post('/api/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    const { items, delivery_address, payment_method = 'AIRTEL', delivery_fee = 3000 } = req.body;
    if (!items ||!items.length) return res.status(400).json({ error: 'Empty cart' });

    await client.query('BEGIN');
    let subtotal = 0;
    let prepared = [];

    for (let it of items) {
      const prodId = it.product_id || it.id;
      const qty = Number(it.quantity) || 1;
      const pr = await client.query('SELECT * FROM products WHERE id=$1 AND active=true FOR UPDATE', [prodId]);
      if (!pr.rows.length) throw new Error('Product ' + prodId + ' not found');
      const prod = pr.rows[0];
      if (prod.stock < qty) throw new Error(prod.name + ' out of stock');
      const line = Number(prod.price) * qty;
      subtotal += line;
      prepared.push({ prod, qty, line });
    }

    const total = subtotal + Number(delivery_fee);
    const commission = Math.round(total * 0.05);
    const sellerAmount = total - commission;
    const buyerId = req.user? req.user.id : 1;

    const orderRes = await client.query(
      `INSERT INTO orders(buyer_id, subtotal, delivery_fee, total_amount, commission_amount, seller_amount, delivery_address, payment_method, payment_status)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,'PENDING_AIRTEL_07544590988') RETURNING *`,
      [buyerId, subtotal, delivery_fee, total, commission, sellerAmount, delivery_address || 'Kampala', payment_method]
    );
    const order = orderRes.rows[0];

    for (let p of prepared) {
      await client.query('INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1,$2,$3,$4)', [order.id, p.prod.id, p.qty, p.prod.price]);
      await client.query('UPDATE products SET stock=stock-$1 WHERE id=$2', [p.qty, p.prod.id]);
    }

    await client.query(
      'INSERT INTO transaction_logs(transaction_type, amount, description, created_by) VALUES($1,$2,$3,$4)',
      ['ORDER_AIRTEL', total, 'Order ' + order.id + ' Pay to 07544590988', buyerId]
    );
    await client.query(
      'INSERT INTO transaction_logs(transaction_type, amount, description, created_by) VALUES($1,$2,$3,$4)',
      ['COMMISSION_5_PERCENT', commission, '5% Secured Order ' + order.id, buyerId]
    );

    await client.query('COMMIT');
    res.json({
      message: 'Order created - Pay Airtel 07544590988 *185*9#',
      order,
      payTo: '07544590988',
      total,
      commissionSecured: commission
    });

  } catch (e) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

// SERVE FRONTEND
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('KISAKYE MART GREEN RUNNING ON ' + PORT + ' - AIRTEL 07544590988'));
