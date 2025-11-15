import React from 'react';
import { BookProvider } from './context/BookContext.jsx';
import { useBooks, useSearch } from './hooks/useBooks.js';
import { useAuth } from './hooks/useAuth.js';
import { HomePage } from './components/HomePage.jsx';
import { SectionPage } from './components/SectionPage.jsx';
import { RegistrationPage } from './components/RegistrationPage.jsx';
import { ContactPage } from './components/ContactPage.jsx';
import { CatalogPage } from './components/CatalogPage.jsx';
import { AddBookPage } from './components/AddBookPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';

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
  const { isAuthenticated, logout, user } = useAuth();

  /**
   * Nota: La carga de libros ahora se maneja automáticamente en el hook useBooks
   * cuando se monta el componente, por lo que no necesitamos este useEffect aquí.
   */

  // Removido el useEffect que mostraba logs constantes de carga

  // Obtener resultados de búsqueda
  const searchResults = getSearchResults();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Indicador de error (solo mostrar si hay un error real) */}
      {error && !loading && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center z-50">
          <span>❌ Error: {error}</span>
        </div>
      )}

      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">📚 Librería El Saber</h1>
              <p className="text-blue-100 text-sm md:text-base">Tu portal al conocimiento y la imaginación.</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {!loading && !error && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <p className="text-sm md:text-base font-semibold">
                    📚 {getAllBooks().length} libros disponibles
                  </p>
                </div>
              )}
              {/* Sección de autenticación en el header */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm md:text-base font-semibold">
                    👤 {(() => {
                      // Obtener nombre directamente de localStorage si el estado no está disponible
                      if (user?.name) return user.name;
                      try {
                        const storedUser = localStorage.getItem('userData');
                        if (storedUser) {
                          const parsed = JSON.parse(storedUser);
                          if (parsed?.name) return parsed.name;
                        }
                      } catch (e) {}
                      return user?.email || 'Usuario';
                    })()}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setCurrentPage('inicio');
                      clearSearch();
                    }}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage('login'); clearSearch(); }}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors backdrop-blur-sm"
                  >
                    Login
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage('registros'); clearSearch(); }}
                    className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 text-sm font-medium rounded-lg transition-colors"
                  >
                    Registro
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 gap-4">
            <ul className="flex flex-wrap gap-2 md:gap-4 items-center flex-1">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('inicio'); clearSearch(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'inicio' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('catalogo'); clearSearch(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'catalogo' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Catálogo
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('ficcion'); clearSearch(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'ficcion' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Ficción
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('ciencia'); clearSearch(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'ciencia' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Ciencia
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('historia'); clearSearch(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'historia' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Historia
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('biografias'); clearSearch(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'biografias' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Biografías
                </a>
              </li>
              {isAuthenticated && (
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage('agregar-libro'); clearSearch(); }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'agregar-libro' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Agregar Libro
                  </a>
                </li>
              )}
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('contacto'); clearSearch(); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'contacto' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Contacto
                </a>
              </li>
            </ul>
            
            {currentPage !== 'agregar-libro' && currentPage !== 'login' && currentPage !== 'contacto' && currentPage !== 'registros' && (
              <div className="w-full lg:flex-1 lg:max-w-md order-first lg:order-last">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Buscar en todo el catálogo..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {currentPage === 'inicio' && <HomePage />}
        {currentPage === 'catalogo' && <CatalogPage books={searchQuery ? searchResults : getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'ficcion' && <SectionPage title="Ficción" books={getBooksByCategory('ficcion')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'ciencia' && <SectionPage title="Ciencia" books={getBooksByCategory('ciencia')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'historia' && <SectionPage title="Historia" books={getBooksByCategory('historia')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'biografias' && <SectionPage title="Biografías" books={getBooksByCategory('biografias')} allBooks={getAllBooks()} searchQuery={searchQuery} />}
        {currentPage === 'agregar-libro' && (
          isAuthenticated ? (
            <AddBookPage />
          ) : (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
                <p className="text-gray-600 mb-6">
                  Debes iniciar sesión para agregar libros al catálogo.
                </p>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Ir a Login
                </button>
              </div>
            </div>
          )
        )}
        {currentPage === 'registros' && <RegistrationPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'contacto' && <ContactPage />}
        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />} {/* Renderizar LoginPage */}
      </main>
      
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Librería El Saber</h3>
              <p className="text-gray-300 text-sm">
                Tu portal al conocimiento y la imaginación. Descubre miles de libros en todas las categorías.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('inicio'); }} className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('catalogo'); }} className="text-gray-300 hover:text-white transition-colors">Catálogo</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contacto'); }} className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-sm">f</span>
                </a>
                <a href="#" className="bg-sky-500 hover:bg-sky-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-sm">t</span>
                </a>
                <a href="#" className="bg-pink-600 hover:bg-pink-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-sm">i</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Librería El Saber. Todos los derechos reservados.</p>
            <a href="#" className="hover:text-white transition-colors mt-2 md:mt-0">Términos y Condiciones</a>
          </div>
        </div>
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
