const express = require('express');
const router = express.Router();

// Simulación de una base de datos en memoria (puedes reemplazarlo con tu base de datos real)
const usuarios = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana López' }
];

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Obtener un usuario por ID
router.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('El usuario no fue encontrado');
    res.json(usuario);
});

// Crear un nuevo usuario
router.post('/usuarios', (req, res) => {
    const { nombre } = req.body;
    const nuevoUsuario = { id: usuarios.length + 1, nombre };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Actualizar un usuario
router.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('El usuario no fue encontrado');

    const { nombre } = req.body;
    usuario.nombre = nombre;
    res.json(usuario);
});

// Eliminar un usuario
router.delete('/usuarios/:id', (req, res) => {
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (usuarioIndex === -1) return res.status(404).send('El usuario no fue encontrado');

    usuarios.splice(usuarioIndex, 1);
    res.status(204).send();
});

module.exports = router;
