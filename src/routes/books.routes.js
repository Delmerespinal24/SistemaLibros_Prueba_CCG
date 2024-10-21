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


// Actualizar un libro
router.put('/books', (req, res) => {
  const { BookID, title, description, stock, salePrice, available } = req.body;

  //Verificar datos
  if (!title || !description || stock === undefined || salePrice === undefined || available === undefined) {
    return res.status(400).json({ error: 'Por favor proporciona todos los campos necesarios.' });
  }

  // Prepara la consulta SQL para insertar un nuevo libro
  const query = 'UPDATE BOOK SET title = ?, description = ?, stock = ?, salePrice = ?, available = ? WHERE BOOKID = ?;';
  const values = [title, description, stock, salePrice, available, BookID];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }


    db.commit()
    console.log(result);
    // Crea un objeto para devolver los datos
    const updateBook = {
      BookID: BookID,
      title: title,
      description: description,
      stock: stock,
      salePrice: salePrice,
      available: available
    };

    // Codigo de estado 201
    res.status(200).json(updateBook);
  });
});

router.delete('/books/:BookID', (req, res) => {
  const { BookID } = req.params;

  // Prepara la consulta SQL para eliminar el libro
  const query = 'DELETE FROM BOOK WHERE BookID = ?';
  
  db.query(query, [BookID], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ID invalido, no se elimino ningun libro.'});
    }

    db.commit();
    // Si se eliminó correctamente
    res.status(200).json({ message: 'El libro ha sido eliminado exitosamente.' });
  });
});




module.exports = router;