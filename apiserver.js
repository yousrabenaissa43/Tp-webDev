const express = require('express');
const db = require('./config/dbinfo');
const router = express.Router();

// Create a quote
router.post('/quotes', (req, res) => {
  let quote = req.body;
  let sql = 'INSERT INTO quotes (domain, content, rating) VALUES (?, ?, ?)';
  let values = [quote.domain, quote.content, quote.rating];
  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send('Quote has been added...');
  });
});

// All quotes
router.get('/quotes', (req, res) => {
  let sql = 'SELECT * FROM quotes';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// A single quote
router.get('/quotes/:id', (req, res) => {
  let sql = `SELECT * FROM quotes WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// A random quote
router.get('/randomquotes', (req, res) => {
  let sql = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
  db.query(sql, (err, result) => {
    if (err){throw err;
      console.error('Error executing SQL:', err); // Affiche l'erreur si la requête échoue
      return res.status(500).send('Error executing SQL');
    }
    res.send(result);
    console.log('Result from database:', result); // Affiche le résultat
  });
});

// Update a quote
router.put('/quotes/:id', (req, res) => {
  let quote = req.body;
  let sql = `UPDATE quotes SET domain='${quote.domain}', content='${quote.content}', rating=${quote.rating} WHERE id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Quote updated...');
  });
});

// Delete a quote
router.delete('/quotes/:id', (req, res) => {
  let sql = `DELETE FROM quotes WHERE id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Quote deleted...');
  });
});

module.exports = router;