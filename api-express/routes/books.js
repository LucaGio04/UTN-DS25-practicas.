import express from 'express';
import { booksData } from '../data/books.js';

const router = express.Router();

// GET /api/books - Obtener todos los libros
router.get('/', (req, res) => {
  try {
    // Obtener todos los libros de todas las categorías (excluyendo featured)
    const { featured, ...categories } = booksData;
    const allBooks = Object.values(categories).flat();
    
    res.json({
      success: true,
      data: allBooks,
      total: allBooks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/category/:category - Obtener libros por categoría
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const books = booksData[category] || [];
    
    res.json({
      success: true,
      data: books,
      category,
      total: books.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/featured - Obtener libros destacados
router.get('/featured', (req, res) => {
  try {
    res.json({
      success: true,
      data: booksData.featured || [],
      total: booksData.featured?.length || 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/search?q=query - Buscar libros
router.get('/search', (req, res) => {
  try {
    const query = req.query.q || '';
    
    if (!query.trim()) {
      const { featured, ...categories } = booksData;
      const allBooks = Object.values(categories).flat();
      return res.json({
        success: true,
        data: allBooks,
        total: allBooks.length
      });
    }
    
    const { featured, ...categories } = booksData;
    const allBooks = Object.values(categories).flat();
    
    const searchTerm = query.toLowerCase();
    const results = allBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
    );
    
    res.json({
      success: true,
      data: results,
      query,
      total: results.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/books/:id - Obtener un libro por ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    
    const { featured, ...categories } = booksData;
    const allBooks = Object.values(categories).flat();
    const book = allBooks.find(b => b.id === bookId);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/books - Agregar un nuevo libro
router.post('/', (req, res) => {
  try {
    const { title, author, category, cover } = req.body;
    
    // Validación básica
    if (!title || !author || !category) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: title, author, category'
      });
    }
    
    // Obtener el siguiente ID
    const { featured, ...categories } = booksData;
    const allBooks = Object.values(categories).flat();
    const maxId = allBooks.length > 0 ? Math.max(...allBooks.map(b => b.id)) : 0;
    const nextId = maxId + 1;
    
    // Crear el nuevo libro
    const newBook = {
      id: nextId,
      title,
      author,
      category,
      cover: cover || '/img/ficcion-1.jpg'
    };
    
    // Agregar a la categoría correspondiente
    if (!booksData[category]) {
      booksData[category] = [];
    }
    booksData[category].push(newBook);
    
    res.status(201).json({
      success: true,
      data: newBook,
      message: 'Libro agregado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/books/:id - Eliminar un libro
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    
    let bookFound = false;
    let bookCategory = null;
    
    // Buscar y eliminar el libro de todas las categorías
    for (const category in booksData) {
      if (category === 'featured') continue;
      
      const index = booksData[category].findIndex(book => book.id === bookId);
      if (index !== -1) {
        booksData[category].splice(index, 1);
        bookFound = true;
        bookCategory = category;
        break;
      }
    }
    
    // También eliminar de featured si está ahí
    if (booksData.featured) {
      const featuredIndex = booksData.featured.findIndex(book => book.id === bookId);
      if (featuredIndex !== -1) {
        booksData.featured.splice(featuredIndex, 1);
      }
    }
    
    if (!bookFound) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Libro eliminado exitosamente',
      deletedId: bookId,
      category: bookCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export { router as booksRouter };

