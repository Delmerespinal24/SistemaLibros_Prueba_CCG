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

// Agregar un libro
router.post('/books', (req, res) => {
  const { title, description, stock, salePrice, available } = req.body;

  if (!title || !description || stock === undefined || salePrice === undefined || available === undefined) {
    return res.status(400).json({ error: 'Por favor proporciona todos los campos necesarios.' });
  }

  // Prepara la consulta SQL para insertar un nuevo libro
  const query = 'INSERT INTO BOOK (title, description, stock, salePrice, available) VALUES (?, ?, ?, ?, ?)';
  const values = [title, description, stock, salePrice, available];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Crea un objeto para devolver los datos
    const newBook = {
      BookID: result.insertId,
      title: title,
      description: description,
      stock: stock,
      salePrice: salePrice,
      available: available
    };

    // Codigo de estado 201
    res.status(201).json(newBook);
  });
});

/* Recibe esto:
data '{
"title:":"El silencio",
"description":"libro de thriller",
"stock":10
"salePrice":450.50,
"available":true
}'

// Responde esto:
//Json
'{
"BookID:1"
"title:":"El silencio",
"description":"libro de thriller",
"stock":10
"salePrice":450.50,
"available":true
}'
*/

module.exports = router;