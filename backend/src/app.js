const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ['http://161.35.59.121:3000', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Node.js + PostgreSQL funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts'
    }
  });
});

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌟 Backend ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;