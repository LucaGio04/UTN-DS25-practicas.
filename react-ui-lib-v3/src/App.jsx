import React, { useEffect } from 'react';
import { BookProvider } from './context/BookContext.jsx';
import { useBooks, useSearch } from './hooks/useBooks.js';
import { HomePage } from './components/HomePage.jsx';
import { SectionPage } from './components/SectionPage.jsx';
import { RegistrationPage } from './components/RegistrationPage.jsx';
import { ContactPage } from './components/ContactPage.jsx';
import { CatalogPage } from './components/CatalogPage.jsx';
import { AddBookPage } from './components/AddBookPage.jsx';

/**
 * Componente principal de la aplicación
 * 
 * Este componente demuestra el uso de todos los conceptos requeridos:
 * 
 * 1. useEffect: Para efectos secundarios como cargar datos al montar
 * 2. Fetch API: Para conectar con APIs externas (implementado en useApi hook)
 * 3. useContext: Para compartir información entre componentes (BookContext)
 * 4. Custom Hooks: useBooks, useSearch, useApi, useForm, useBookForm
 * 
 * La aplicación está estructurada de la siguiente manera:
 * - BookProvider: Proporciona el contexto global (useContext)
 * - AppContent: Componente que consume el contexto y los custom hooks
 * - Custom Hooks: Encapsulan lógica reutilizable
 * - Fetch API: Se usa en useApi para conectar con Open Library API
 */
function AppContent() {
  const {
    books,
    loading,
    error,
    currentPage,
    loadBooksFromApi,
    addBook,
    removeBook,
    setCurrentPage,
    getAllBooks,
    searchBooks,
    getBooksByCategory
  } = useBooks();

  const { searchQuery, handleSearch, clearSearch, getSearchResults } = useSearch();

  /**
   * useEffect - Ejemplo 1: Cargar datos al montar el componente
   * 
   * Este efecto se ejecuta una vez cuando el componente se monta.
   * Carga los libros desde la API externa usando Fetch.
   * 
   * Conceptos aplicados:
   * - useEffect: Efecto secundario al montar el componente
   * - Fetch API: La función loadBooksFromApi usa Fetch internamente
   * 
   * Nota: Usamos un array vacío [] para que solo se ejecute al montar,
   * evitando loops infinitos. La función loadBooksFromApi está memoizada
   * con useCallback en el hook useBooks.
   */
  useEffect(() => {
    console.log('🔄 Cargando datos de la API...');
    loadBooksFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar al montar el componente

  /**
   * useEffect - Ejemplo 2: Reaccionar a cambios en el estado
   * 
   * Este efecto se ejecuta cuando cambian los estados de loading, error o la cantidad de libros.
   * Demuestra cómo useEffect puede reaccionar a múltiples dependencias.
   * 
   * Conceptos aplicados:
   * - useEffect: Efecto que reacciona a cambios en el estado
   * - Dependencias múltiples: [loading, error, books]
   */
  useEffect(() => {
    if (loading) {
      console.log('⏳ Cargando libros...');
    } else if (error) {
      console.error('❌ Error cargando libros:', error);
    } else {
      const totalBooks = getAllBooks().length;
      if (totalBooks > 0) {
        console.log('✅ Libros cargados exitosamente:', totalBooks, 'libros');
      }
    }
  }, [loading, error, books, getAllBooks]);

  // Obtener resultados de búsqueda
  const searchResults = getSearchResults();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Indicador de carga */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-2 text-center z-50">
          <span>🔄 Cargando libros desde la API...</span>
        </div>
      )}

      {/* Indicador de error */}
      {error && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center z-50">
          <span>❌ Error: {error} - Usando datos locales</span>
        </div>
      )}

      <header>
        <h1>Librería El Saber</h1>
        <p>Tu portal al conocimiento y la imaginación.</p>
        {!loading && !error && (
          <p className="text-sm text-gray-600">
            📚 {getAllBooks().length} libros disponibles
          </p>
        )}
      </header>
      
      <nav>
        <ul>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('inicio'); clearSearch(); }}>Inicio</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('catalogo'); clearSearch(); }}>Catálogo</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('ficcion'); clearSearch(); }}>Ficción</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('ciencia'); clearSearch(); }}>Ciencia</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('historia'); clearSearch(); }}>Historia</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('biografias'); clearSearch(); }}>Biografías</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('agregar-libro'); clearSearch(); }}>Agregar Libro</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('registros'); clearSearch(); }}>Registración</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contacto'); clearSearch(); }}>Contacto</a></li>
        </ul>
        
        <div>
          <input
            type="text"
            placeholder="Buscar en todo el catálogo..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </nav>
      
      <main className="container">
        {currentPage === 'inicio' && <HomePage />}
        {currentPage === 'catalogo' && <CatalogPage books={searchQuery ? searchResults : getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'ficcion' && <SectionPage title="Ficción" books={getBooksByCategory('ficcion')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'ciencia' && <SectionPage title="Ciencia" books={getBooksByCategory('ciencia')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'historia' && <SectionPage title="Historia" books={getBooksByCategory('historia')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'biografias' && <SectionPage title="Biografías" books={getBooksByCategory('biografias')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'agregar-libro' && <AddBookPage />}
        {currentPage === 'registros' && <RegistrationPage />}
        {currentPage === 'contacto' && <ContactPage />}
      </main>
      
      <footer>
        <p>&copy; 2024 Librería El Saber. Todos los derechos reservados.</p>
        <div>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <a href="#">Términos y Condiciones</a>
      </footer>
    </div>
  );
}

/**
 * Componente raíz de la aplicación
 * 
 * Este componente envuelve toda la aplicación con el BookProvider,
 * permitiendo que todos los componentes hijos accedan al contexto usando useContext.
 * 
 * Conceptos aplicados:
 * - useContext: BookProvider proporciona el contexto global
 * - Provider Pattern: Patrón para compartir estado entre componentes
 */
function App() {
  return (
    <BookProvider>
      <AppContent />
    </BookProvider>
  );
}

export default App;
