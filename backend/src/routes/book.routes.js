import express from 'express';
import * as bookController from '../../src/controllers/book.controller.js';
import { validate } from '../../src/middleware/validation.middleware.js';
import { authenticateToken } from '../../src/middleware/auth.middleware.js'; // Importar el middleware de autenticación
import { createBookSchema, updateBookSchema } from '../../src/schemas/book.schema.js';

const router = express.Router();

// GET /api/books - Obtener todos los libros
router.get('/', bookController.getAllBooks);

// GET /api/books/category/:category - Obtener libros por categoría
router.get('/category/:category', bookController.getBooksByCategory);

// GET /api/books/featured - Obtener libros destacados
router.get('/featured', bookController.getFeaturedBooks);

// GET /api/books/search?q=query - Buscar libros
router.get('/search', bookController.searchBooks);

// GET /api/books/:id - Obtener un libro por ID
router.get('/:id', bookController.getBookById);

// POST /api/books - Crear un nuevo libro (protegido)
router.post('/', authenticateToken, validate(createBookSchema), bookController.createBook);

// PUT /api/books/:id - Actualizar un libro
router.put('/:id', validate(updateBookSchema), bookController.updateBook);

// DELETE /api/books/:id - Eliminar un libro
router.delete('/:id', bookController.deleteBook);

export { router as bookRoutes };
