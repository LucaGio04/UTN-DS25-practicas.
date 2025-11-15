import { useState, useEffect, useCallback } from 'react';
import { useBookContext } from '../context/BookContext';

/**
 * Custom Hook: useApi
 * 
 * Este hook personalizado encapsula la lógica de conexión con APIs externas usando Fetch.
 * Proporciona manejo de estados de carga y errores, simplificando las llamadas a APIs.
 * 
 * Conceptos aplicados:
 * - Custom Hook: Reutilización de lógica de fetch
 * - Fetch API: Conexión con APIs externas
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

  // Función para cargar libros locales como fallback
  const loadLocalBooks = useCallback(() => {
    // Asegurarse de que el loading se desactive
    context.setLoading(false);
    
    const localBooks = {
      ficcion: [
        { id: 1, title: 'El Legado del Héroe', author: 'Sofía Ríos', cover: '/img/ficcion-portada.jpg', category: 'ficcion' },
        { id: 2, title: 'Crónica del asesino de reyes: El nombre del viento', author: 'Patrick Rothfuss', cover: '/img/ficcion-1.jpg', category: 'ficcion' },
        { id: 3, title: 'La Rueda del Tiempo: El ojo del mundo', author: 'Robert Jordan', cover: '/img/ficcion-2.jpg', category: 'ficcion' },
        { id: 4, title: 'Canción de hielo y fuego: Juego de tronos', author: 'George R.R. Martin', cover: '/img/ficcion-3.jpg', category: 'ficcion' },
        { id: 5, title: 'La historia interminable', author: 'Michael Ende', cover: '/img/ficcion-4.jpg', category: 'ficcion' },
        { id: 6, title: 'El Hobbit', author: 'J.R.R. Tolkien', cover: '/img/ficcion-5.jpg', category: 'ficcion' },
      ],
      ciencia: [
        { id: 7, title: 'El Cosmos en Nuestras Manos', author: 'Laura Gómez', cover: '/img/ciencia-portada.jpg', category: 'ciencia' },
        { id: 8, title: 'El gen egoísta', author: 'Richard Dawkins', cover: '/img/ficcion-1.jpg', category: 'ciencia' },
        { id: 9, title: 'Cosmos', author: 'Carl Sagan', cover: '/img/ficcion-2.jpg', category: 'ciencia' },
        { id: 10, title: 'Sapiens: De animales a dioses', author: 'Yuval Noah Harari', cover: '/img/ficcion-3.jpg', category: 'ciencia' },
        { id: 11, title: 'Breve historia del tiempo', author: 'Stephen Hawking', cover: '/img/ficcion-4.jpg', category: 'ciencia' },
        { id: 12, title: 'El origen de las especies', author: 'Charles Darwin', cover: '/img/ficcion-5.jpg', category: 'ciencia' },
      ],
      historia: [
        { id: 13, title: 'Imperios Olvidados', author: 'Javier Torres', cover: '/img/historia-portada.jpg', category: 'historia' },
        { id: 14, title: 'La Segunda Guerra Mundial', author: 'Antony Beevor', cover: '/img/ficcion-1.jpg', category: 'historia' },
        { id: 15, title: 'Imperiofobia y Leyenda Negra', author: 'Elvira Roca Barea', cover: '/img/ficcion-2.jpg', category: 'historia' },
        { id: 16, title: 'Homo Deus: Breve historia del mañana', author: 'Yuval Noah Harari', cover: '/img/ficcion-3.jpg', category: 'historia' },
        { id: 17, title: 'Armas, gérmenes y acero', author: 'Jared Diamond', cover: '/img/ficcion-4.jpg', category: 'historia' },
        { id: 18, title: 'La guerra de los 30 años', author: 'C.V. Wedgwood', cover: '/img/ficcion-5.jpg', category: 'historia' },
      ],
      biografias: [
        { id: 19, title: 'La biografía de Steve Jobs', author: 'Walter Isaacson', cover: '/img/ficcion-1.jpg', category: 'biografias' },
        { id: 20, title: 'Einstein: Su vida y su universo', author: 'Walter Isaacson', cover: '/img/ficcion-2.jpg', category: 'biografias' },
        { id: 21, title: 'El diario de Ana Frank', author: 'Ana Frank', cover: '/img/ficcion-4.jpg', category: 'biografias' },
        { id: 22, title: 'Yo soy Malala', author: 'Malala Yousafzai', cover: '/img/ficcion-5.jpg', category: 'biografias' },
        { id: 23, title: 'Nelson Mandela: Conversaciones conmigo mismo', author: 'Nelson Mandela', cover: '/img/ficcion-6.jpg', category: 'biografias' },
        { id: 24, title: 'Leonardo da Vinci', author: 'Walter Isaacson', cover: '/img/ficcion-1.jpg', category: 'biografias' },
      ],
      featured: [
        { id: 25, title: 'El Legado del Héroe', author: 'Sofía Ríos', cover: '/img/ficcion-portada.jpg', category: 'ficcion' },
        { id: 26, title: 'El Camino a la Creatividad', author: 'Daniel Pérez', cover: '/img/no-ficcion-portada.jpg', category: 'no-ficcion' },
        { id: 27, title: 'El Cosmos en Nuestras Manos', author: 'Laura Gómez', cover: '/img/ciencia-portada.jpg', category: 'ciencia' },
        { id: 28, title: 'Imperios Olvidados', author: 'Javier Torres', cover: '/img/historia-portada.jpg', category: 'historia' }
      ]
    };
    
    context.setBooks(localBooks);
    context.updateNextId(29);
    context.setError(null); // Limpiar error al cargar datos locales
  }, [context.setBooks, context.updateNextId, context.setLoading, context.setError]);

  /**
   * Función para cargar libros desde API externa usando Fetch
   * 
   * Esta función demuestra el uso de Fetch API para conectar con una API externa.
   * Utiliza la Open Library API como ejemplo de integración.
   * 
   * Conceptos aplicados:
   * - Fetch API: Conexión con API externa (Open Library)
   * - Async/Await: Manejo asíncrono de peticiones
   * - Transformación de datos: Adaptación de formato de API a formato interno
   */
  const loadBooksFromApi = useCallback(async () => {
    try {
      context.setLoading(true);
      context.setError(null);
      
      // Conectar con API externa usando Fetch (Open Library API)
      // Esta es una API pública que no requiere autenticación
      // Buscamos libros variados de diferentes categorías
      const searchTerms = ['fiction', 'science', 'history', 'biography'];
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      const apiUrl = `https://openlibrary.org/search.json?q=${randomTerm}&limit=20`;
      const data = await fetchData(apiUrl);
      
      // Transformar datos de la API al formato de nuestra aplicación
      const transformedBooks = transformApiData(data.docs);
      
      // Organizar libros por categorías
      const organizedBooks = organizeBooksByCategory(transformedBooks);
      
      context.setBooks(organizedBooks);
      context.setLoading(false);
      
    } catch (err) {
      console.error('Error loading books from API:', err);
      context.setError(err.message || 'Error al cargar desde la API');
      // Si falla la API, cargar datos locales como fallback
      loadLocalBooks();
    }
  }, [fetchData, loadLocalBooks, context.setLoading, context.setError, context.setBooks]);

  // Función para agregar un nuevo libro
  const addBook = useCallback((bookData) => {
    const newBook = {
      ...bookData,
      id: context.nextId,
      category: bookData.category
    };
    
    context.addBook(newBook, bookData.category);
  }, [context]);

  // Función para eliminar un libro
  const removeBook = useCallback((bookId, category) => {
    context.removeBook(bookId, category);
  }, [context]);

  return {
    // Estado
    books: context.books,
    loading: context.loading,
    error: context.error,
    searchQuery: context.searchQuery,
    currentPage: context.currentPage,
    
    // Acciones
    loadBooksFromApi,
    loadLocalBooks,
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

// Función para transformar datos de la API
const transformApiData = (apiBooks) => {
  return apiBooks.map((book, index) => {
    // Intentar detectar la categoría desde el título y autor antes de asignar
    const title = (book.title || '').toLowerCase();
    const author = (book.author_name ? book.author_name.join(', ') : '').toLowerCase();
    
    // No asignar categoría aquí, dejar que organizeBooksByCategory lo haga
    return {
      id: index + 1000, // IDs únicos para libros de API
      title: book.title || 'Título no disponible',
      author: book.author_name ? book.author_name.join(', ') : 'Autor desconocido',
      cover: book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '/img/ficcion-1.jpg', // Imagen por defecto
      // No asignar category aquí, se asignará en organizeBooksByCategory
      isFromApi: true // Marcar que viene de API
    };
  });
};

// Función para organizar libros por categorías
const organizeBooksByCategory = (books) => {
  const categories = {
    ficcion: [],
    ciencia: [],
    historia: [],
    biografias: [],
    featured: []
  };

  books.forEach(book => {
    // Lógica mejorada para categorizar libros basada en palabras clave
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    
    // Palabras clave para cada categoría
    const historiaKeywords = ['historia', 'history', 'guerra', 'war', 'imperio', 'empire', 'antigua', 'ancient', 'medieval', 'civilización', 'civilization'];
    const cienciaKeywords = ['ciencia', 'science', 'física', 'physics', 'química', 'chemistry', 'matemática', 'mathematics', 'biología', 'biology', 'programming', 'javascript', 'python', 'java', 'computación', 'computer', 'tecnología', 'technology', 'astronomía', 'astronomy', 'cosmos', 'universo', 'universe'];
    const biografiaKeywords = ['biografía', 'biography', 'autobiografía', 'autobiography', 'memorias', 'memoirs', 'vida de', 'life of', 'diario', 'diary'];
    
    // Verificar si el libro pertenece a alguna categoría específica
    let categorized = false;
    
    // Historia
    if (historiaKeywords.some(keyword => title.includes(keyword) || author.includes(keyword))) {
      categories.historia.push({ ...book, category: 'historia' });
      categorized = true;
    }
    // Ciencia (incluye programación y tecnología)
    else if (cienciaKeywords.some(keyword => title.includes(keyword) || author.includes(keyword))) {
      categories.ciencia.push({ ...book, category: 'ciencia' });
      categorized = true;
    }
    // Biografías
    else if (biografiaKeywords.some(keyword => title.includes(keyword) || author.includes(keyword))) {
      categories.biografias.push({ ...book, category: 'biografias' });
      categorized = true;
    }
    
    // Si no coincide con ninguna categoría específica, va a ficción
    if (!categorized) {
      categories.ficcion.push({ ...book, category: 'ficcion' });
    }
  });

  // Seleccionar algunos libros destacados de diferentes categorías
  const featuredBooks = [];
  if (categories.ficcion.length > 0) featuredBooks.push(categories.ficcion[0]);
  if (categories.ciencia.length > 0) featuredBooks.push(categories.ciencia[0]);
  if (categories.historia.length > 0) featuredBooks.push(categories.historia[0]);
  if (categories.biografias.length > 0) featuredBooks.push(categories.biografias[0]);
  categories.featured = featuredBooks.slice(0, 4);

  return categories;
};
