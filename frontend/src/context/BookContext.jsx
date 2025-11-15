/**
 * BookContext - Contexto global para compartir información entre componentes
 * 
 * Este archivo implementa el patrón Context API de React para compartir
 * el estado de los libros entre todos los componentes de la aplicación.
 * 
 * Conceptos aplicados:
 * - useContext: createContext y useContext para compartir estado
 * - useReducer: Manejo de estado complejo con reducer pattern
 * - Provider Pattern: BookProvider envuelve la aplicación
 * - Custom Hook: useBookContext para acceder al contexto de forma segura
 * 
 * Uso:
 * 1. Envuelve la app con <BookProvider>
 * 2. Usa useBookContext() en cualquier componente para acceder al estado
 * 3. Los cambios se propagan automáticamente a todos los componentes suscritos
 */
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial
const initialState = {
  books: {
    ficcion: [],
    ciencia: [],
    historia: [],
    biografias: [],
    featured: []
  },
  loading: false,
  error: null,
  searchQuery: '',
  currentPage: 'inicio',
  nextId: 1
};

// Tipos de acciones
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_BOOKS: 'SET_BOOKS',
  ADD_BOOK: 'ADD_BOOK',
  REMOVE_BOOK: 'REMOVE_BOOK',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  UPDATE_NEXT_ID: 'UPDATE_NEXT_ID'
};

// Reducer para manejar el estado
const bookReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case ACTIONS.SET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };
    
    case ACTIONS.ADD_BOOK:
      const { book, category } = action.payload;
      return {
        ...state,
        books: {
          ...state.books,
          [category]: [...(state.books[category] || []), book]
        },
        nextId: state.nextId + 1
      };
    
    case ACTIONS.REMOVE_BOOK:
      const { bookId, bookCategory } = action.payload;
      return {
        ...state,
        books: {
          ...state.books,
          [bookCategory]: state.books[bookCategory].filter(book => book.id !== bookId)
        }
      };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    
    case ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    
    case ACTIONS.UPDATE_NEXT_ID:
      return {
        ...state,
        nextId: action.payload
      };
    
    default:
      return state;
  }
};

// Crear el contexto
const BookContext = createContext();

// Provider del contexto
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Acciones para manejar el estado
  const actions = {
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    
    setError: (error) => dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
    
    setBooks: (books) => dispatch({ type: ACTIONS.SET_BOOKS, payload: books }),
    
    addBook: (book, category) => dispatch({ 
      type: ACTIONS.ADD_BOOK, 
      payload: { book, category } 
    }),
    
    removeBook: (bookId, category) => dispatch({ 
      type: ACTIONS.REMOVE_BOOK, 
      payload: { bookId, bookCategory: category } 
    }),
    
    setSearchQuery: (query) => dispatch({ 
      type: ACTIONS.SET_SEARCH_QUERY, 
      payload: query 
    }),
    
    setCurrentPage: (page) => dispatch({ 
      type: ACTIONS.SET_CURRENT_PAGE, 
      payload: page 
    }),
    
    updateNextId: (id) => dispatch({ 
      type: ACTIONS.UPDATE_NEXT_ID, 
      payload: id 
    })
  };

  // Función para obtener todos los libros (excluyendo featured que son duplicados)
  const getAllBooks = () => {
    const { featured, ...categories } = state.books;
    return Object.values(categories).flat();
  };

  // Función para normalizar texto (eliminar acentos)
  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Función para buscar libros
  const searchBooks = (query) => {
    if (!query || !query.trim()) return getAllBooks();
    
    const searchTerm = normalizeText(query.trim());
    const allBooks = getAllBooks();
    
    const results = allBooks.filter(book => {
      const titleMatch = book.title ? normalizeText(book.title).includes(searchTerm) : false;
      const authorMatch = book.author ? normalizeText(book.author).includes(searchTerm) : false;
      const categoryMatch = book.category ? normalizeText(book.category).includes(searchTerm) : false;
      
      return titleMatch || authorMatch || categoryMatch;
    });
    
    return results;
  };

  // Función para obtener libros por categoría
  const getBooksByCategory = (category) => {
    return state.books[category] || [];
  };

  // Función para obtener estadísticas
  const getStats = () => {
    const allBooks = getAllBooks();
    return {
      total: allBooks.length,
      byCategory: {
        ficcion: state.books.ficcion.length,
        ciencia: state.books.ciencia.length,
        historia: state.books.historia.length,
        biografias: state.books.biografias.length
      }
    };
  };

  const value = {
    // Estado
    ...state,
    
    // Acciones
    ...actions,
    
    // Funciones utilitarias
    getAllBooks,
    searchBooks,
    getBooksByCategory,
    getStats
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

/**
 * Custom Hook: useBookContext
 * 
 * Este hook personalizado proporciona acceso seguro al BookContext.
 * Incluye validación para asegurar que se use dentro de un BookProvider.
 * 
 * Conceptos aplicados:
 * - Custom Hook: Hook personalizado para acceder al contexto
 * - useContext: Uso del hook useContext de React
 * - Error Handling: Validación de uso correcto del contexto
 * 
 * @returns {Object} El contexto completo con estado y funciones
 * @throws {Error} Si se usa fuera de un BookProvider
 */
export const useBookContext = () => {
  const context = useContext(BookContext);
  
  if (!context) {
    throw new Error('useBookContext debe ser usado dentro de un BookProvider');
  }
  
  return context;
};

export default BookContext;
