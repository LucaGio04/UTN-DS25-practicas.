import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
  getFeaturedBooks,
  searchBooks
} from '../src/services/book.service.js';

const router = express.Router();

// GET /api/books - Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    
    res.json({
      success: true,
      data: allBooks,
      total: allBooks.length
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/category/:category - Obtener libros por categoría
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const books = await getBooksByCategory(category);
    
    res.json({
      success: true,
      data: books,
      category,
      total: books.length
    });
  } catch (error) {
    console.error('Error fetching books by category:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/featured - Obtener libros destacados
router.get('/featured', async (req, res) => {
  try {
    const featuredBooks = await getFeaturedBooks();
    
    res.json({
      success: true,
      data: featuredBooks,
      total: featuredBooks.length
    });
  } catch (error) {
    console.error('Error fetching featured books:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/search?q=query - Buscar libros
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const results = await searchBooks(query);
    
    res.json({
      success: true,
      data: results,
      query,
      total: results.length
    });
  } catch (error) {
    console.error('Error searching books:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/:id - Obtener un libro por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        error: 'ID inválido'
      });
    }
    
    const book = await getBookById(id);
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/books - Crear un nuevo libro
router.post('/', async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await createBook(bookData);
    
    res.status(201).json({
      success: true,
      data: newBook,
      message: 'Libro creado exitosamente'
    });
  } catch (error) {
    console.error('Error creating book:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/books/:id - Actualizar un libro
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        error: 'ID inválido'
      });
    }
    
    const updatedBook = await updateBook(id, updateData);
    
    res.json({
      success: true,
      data: updatedBook,
      message: 'Libro actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error updating book:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/books/:id - Eliminar un libro
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        error: 'ID inválido'
      });
    }
    
    const deletedBook = await deleteBook(id);
    
    res.json({
      success: true,
      message: 'Libro eliminado exitosamente',
      data: deletedBook
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

export { router as booksRouter };
