import { useState, useEffect, useCallback } from 'react';
import { useBookContext } from '../context/BookContext';

// URL base de la API Express
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Custom Hook: useApi
 * 
 * Este hook personalizado encapsula la lógica de conexión con APIs usando Fetch.
 * Proporciona manejo de estados de carga y errores, simplificando las llamadas a APIs.
 * 
 * Conceptos aplicados:
 * - Custom Hook: Reutilización de lógica de fetch
 * - Fetch API: Conexión con API Express local
 * - useState: Manejo de estados de loading y error
 * - useCallback: Optimización de funciones
 * 
 * @returns {Object} Objeto con loading, error y función fetchData
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Agregar timeout de 10 segundos para evitar que se quede trabado
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        signal: controller.signal,
        ...options
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('La petición tardó demasiado tiempo');
      } else {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchData };
};

/**
 * Custom Hook: useBooks
 * 
 * Este hook personalizado maneja toda la lógica relacionada con libros.
 * Utiliza el contexto (useContext) para acceder al estado global y proporciona
 * funciones para cargar libros desde una API externa usando Fetch.
 * 
 * Conceptos aplicados:
 * - Custom Hook: Lógica reutilizable para manejo de libros
 * - useContext: Acceso al contexto global de libros (BookContext)
 * - Fetch API: Carga de datos desde Open Library API
 * - useCallback: Optimización de funciones
 * 
 * @returns {Object} Objeto con estado y funciones para manejar libros
 */
export const useBooks = () => {
  const context = useBookContext();
  const { fetchData } = useApi();

  /**
   * Función para cargar libros desde la API Express
   * 
   * Esta función carga los libros desde nuestra API Express local.
   * Los datos mockeados ahora están en el backend.
   * 
   * Conceptos aplicados:
   * - Fetch API: Conexión con API Express local
   * - Async/Await: Manejo asíncrono de peticiones
   * - Organización de datos: Organizar libros por categorías
   */
  const loadBooksFromApi = useCallback(async () => {
    try {
      context.setLoading(true);
      context.setError(null);
      
      // Cargar todos los libros desde la API Express
      const response = await fetchData(`${API_BASE_URL}/books`);
      
      if (!response.success) {
        throw new Error(response.error || 'Error al cargar libros');
      }
      
      const allBooks = response.data || [];
      
      // Cargar libros destacados
      const featuredResponse = await fetchData(`${API_BASE_URL}/books/featured`);
      const featuredBooks = featuredResponse.success ? featuredResponse.data : [];
      
      // Organizar libros por categorías
      const organizedBooks = organizeBooksByCategory(allBooks, featuredBooks);
      
      // Obtener el máximo ID para actualizar nextId
      const maxId = allBooks.length > 0 ? Math.max(...allBooks.map(b => b.id)) : 0;
      
      context.setBooks(organizedBooks);
      context.updateNextId(maxId + 1);
      context.setLoading(false);
      
    } catch (err) {
      console.error('Error loading books from API:', err);
      context.setError(err.message || 'Error al cargar desde la API');
      context.setLoading(false);
    }
  }, [fetchData, context.setLoading, context.setError, context.setBooks, context.updateNextId]);

  /**
   * Función para agregar un nuevo libro a través de la API
   */
  const addBook = useCallback(async (bookData) => {
    try {
      context.setLoading(true);
      
      const response = await fetchData(`${API_BASE_URL}/books`, {
        method: 'POST',
        body: JSON.stringify(bookData)
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Error al agregar libro');
      }
      
      const newBook = response.data;
      
      // Recargar todos los libros desde la API para mantener sincronización
      // Esto evita duplicados y asegura que el estado local refleje la DB
      await loadBooksFromApi();
      
      return newBook;
    } catch (err) {
      console.error('Error adding book:', err);
      context.setError(err.message || 'Error al agregar libro');
      context.setLoading(false);
      throw err;
    }
  }, [fetchData, loadBooksFromApi, context]);

  /**
   * Función para eliminar un libro a través de la API
   */
  const removeBook = useCallback(async (bookId, category) => {
    try {
      context.setLoading(true);
      
      const response = await fetchData(`${API_BASE_URL}/books/${bookId}`, {
        method: 'DELETE'
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Error al eliminar libro');
      }
      
      // Recargar todos los libros desde la API para mantener sincronización
      await loadBooksFromApi();
    } catch (err) {
      console.error('Error removing book:', err);
      context.setError(err.message || 'Error al eliminar libro');
      context.setLoading(false);
      throw err;
    }
  }, [fetchData, loadBooksFromApi, context]);

  return {
    // Estado
    books: context.books,
    loading: context.loading,
    error: context.error,
    searchQuery: context.searchQuery,
    currentPage: context.currentPage,
    
    // Acciones
    loadBooksFromApi,
    addBook,
    removeBook,
    setSearchQuery: context.setSearchQuery,
    setCurrentPage: context.setCurrentPage,
    
    // Funciones utilitarias
    getAllBooks: context.getAllBooks,
    searchBooks: context.searchBooks,
    getBooksByCategory: context.getBooksByCategory,
    getStats: context.getStats
  };
};

/**
 * Custom Hook: useSearch
 * 
 * Este hook personalizado maneja la funcionalidad de búsqueda de libros.
 * Combina búsqueda local y global, sincronizando con el contexto.
 * 
 * Conceptos aplicados:
 * - Custom Hook: Lógica reutilizable para búsqueda
 * - useContext: Acceso al contexto para búsqueda global
 * - useState: Manejo de estado local de búsqueda
 * - useCallback: Optimización de funciones
 * 
 * @returns {Object} Objeto con funciones y estado de búsqueda
 */
export const useSearch = () => {
  const context = useBookContext();
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const handleSearch = useCallback((query) => {
    setLocalSearchQuery(query);
    context.setSearchQuery(query);
    
    // Si hay búsqueda, cambiar a página de catálogo
    if (query.trim() && context.currentPage !== 'catalogo') {
      context.setCurrentPage('catalogo');
    }
  }, [context]);

  const clearSearch = useCallback(() => {
    setLocalSearchQuery('');
    context.setSearchQuery('');
  }, [context]);

  const getSearchResults = useCallback(() => {
    const query = context.searchQuery || localSearchQuery;
    return context.searchBooks(query);
  }, [context, localSearchQuery]);

  return {
    searchQuery: context.searchQuery,
    localSearchQuery,
    handleSearch,
    clearSearch,
    getSearchResults
  };
};


// Función para organizar libros por categorías
const organizeBooksByCategory = (books, featuredBooks = []) => {
  const categories = {
    ficcion: [],
    ciencia: [],
    historia: [],
    biografias: [],
    featured: featuredBooks
  };

  // Organizar libros por su categoría
  books.forEach(book => {
    const category = book.category || 'ficcion';
    if (categories[category]) {
      categories[category].push(book);
    } else {
      // Si la categoría no existe, agregar a ficción por defecto
      categories.ficcion.push({ ...book, category: 'ficcion' });
    }
  });

  return categories;
};
