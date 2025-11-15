import express from 'express';
import cors from 'cors';
import { booksRouter } from './routes/books.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Parsear JSON en el body

// Rutas
app.use('/api/books', booksRouter);

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
      deleteBook: 'DELETE /api/books/:id'
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 API de libros disponible en http://localhost:${PORT}/api/books`);
});

