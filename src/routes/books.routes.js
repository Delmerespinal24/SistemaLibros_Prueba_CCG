const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Obtener todos los libros
router.get('/books', (req, res) => {
    const query = 'SELECT * FROM BOOK';
    
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
});

module.exports = router;