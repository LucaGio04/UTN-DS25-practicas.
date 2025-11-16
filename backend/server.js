import express from 'express';
import cors from 'cors';
import { bookRoutes } from './src/routes/book.routes.js';
import { userRoutes } from './src/routes/user.routes.js';
import { authRoutes } from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Configurar CORS para permitir peticiones desde el frontend en producción
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Permitir peticiones desde el frontend
app.use(express.json()); // Parsear JSON en el body

// Rutas
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Librería El Saber',
    version: '1.0.0',
    endpoints: {
      getAllBooks: 'GET /api/books',
      getBookById: 'GET /api/books/:id',
      getByCategory: 'GET /api/books/category/:category',
      getFeatured: 'GET /api/books/featured',
      search: 'GET /api/books/search?q=query',
      createBook: 'POST /api/books',
      updateBook: 'PUT /api/books/:id',
      deleteBook: 'DELETE /api/books/:id',
      // User Endpoints
      getAllUsers: 'GET /api/users',
      getUserById: 'GET /api/users/:id',
      createUser: 'POST /api/users',
      updateUser: 'PUT /api/users/:id',
      deleteUser: 'DELETE /api/users/:id',
      // Auth Endpoints
      login: 'POST /api/auth/login',
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
  console.log(`📚 API de libros disponible en http://0.0.0.0:${PORT}/api/books`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

