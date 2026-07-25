const express = require('express');
const router = express.Router();
const {Pool} = require("pg");
// Example middleware applied to all routes in this router
router.use((req, res, next) => {
  // simple logger
  console.log(`[backroute] ${req.method} ${req.originalUrl}`);
  next();
});

// Healthcheck / base route
router.get('/', (req, res) => {
  res.json({ status: 'ok', route: 'backroute' });
});

// Example GET route
router.get('/items', async (req, res, next) => {
  try {
    const items = [];
    res.json({ items });
  } catch (err) {
    next(err);
  }
});

// Example POST route
router.post('/signup', express.json(), async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }else{
           
            const result = await  Pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
            res.status(201).json({ user: result.rows[0] });
        }
    }catch (err) {}
});

// Error handler specific to this router
router.use((err, req, res, next) => {
  console.error('[backroute error]', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = router;
