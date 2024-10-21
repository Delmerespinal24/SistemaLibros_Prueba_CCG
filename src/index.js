// index.js
const express = require('express');
const app = express();
const db = require('./db');
const booksRoutes = require('./routes/books.routes');

// Middleware para parsear JSON
app.use(express.json());

app.use('/api', booksRoutes);

const port = 8000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});