import * as bookService from '../services/book.service.js';

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await bookService.getAllBooks();
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
};

export const getBooksByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const books = await bookService.getBooksByCategory(category);
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
};

export const getFeaturedBooks = async (req, res) => {
  try {
    const featuredBooks = await bookService.getFeaturedBooks();
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
};

export const searchBooks = async (req, res) => {
  try {
    const query = req.query.q || '';
    const results = await bookService.searchBooks(query);
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
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(parseInt(id));
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
};

export const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await bookService.createBook(bookData);
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
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBook = await bookService.updateBook(parseInt(id), updateData);
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
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(parseInt(id));
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
};
