const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'belinda98', 
  database: 'BOOKSTORE_CCG' 
});

// Comprobar si la conexión es exitosa o no
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL.');
});

module.exports = connection;