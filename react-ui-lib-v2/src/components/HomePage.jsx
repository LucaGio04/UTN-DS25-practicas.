import React, { useState } from 'react';
import BookCard from './Bookcard.jsx';

export const HomePage = ({ booksData, allBooks, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Combinar búsqueda global con búsqueda local
  const effectiveSearchQuery = searchQuery || localSearchQuery;
  
  // Filtrar libros según la búsqueda
  const filteredBooks = effectiveSearchQuery 
    ? allBooks.filter(book =>
        book.title.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(effectiveSearchQuery.toLowerCase())
      )
    : [];

  const handleLocalSearch = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const clearLocalSearch = () => {
    setLocalSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Librería El Saber</h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubre miles de libros en todas las categorías
        </p>
        
        {/* Búsqueda local */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en la librería..."
              value={localSearchQuery}
              onChange={handleLocalSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {localSearchQuery && (
              <button
                onClick={clearLocalSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resultados de búsqueda local */}
      {showSearchResults && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Resultados de búsqueda: "{localSearchQuery}"
            </h2>
            <button
              onClick={clearLocalSearch}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Limpiar búsqueda
            </button>
          </div>
          
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No se encontraron libros que coincidan con "{localSearchQuery}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Libros Destacados */}
      {!showSearchResults && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Libros Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {booksData.featured.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}

      {/* Explorar Categorías */}
      {!showSearchResults && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Explorar Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Ficción</h3>
              <p className="text-blue-100 mb-4">{booksData.ficcion.length} libros</p>
              <div className="text-3xl">📚</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Ciencia</h3>
              <p className="text-green-100 mb-4">{booksData.ciencia.length} libros</p>
              <div className="text-3xl">🔬</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Historia</h3>
              <p className="text-purple-100 mb-4">{booksData.historia.length} libros</p>
              <div className="text-3xl">🏛️</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white text-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Biografías</h3>
              <p className="text-orange-100 mb-4">{booksData.biografias.length} libros</p>
              <div className="text-3xl">👤</div>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas rápidas */}
      {!showSearchResults && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Nuestra Librería en Números</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">{allBooks.length}</div>
              <div className="text-sm text-gray-600">Total de Libros</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">Categorías</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Disponible</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Gratis</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
