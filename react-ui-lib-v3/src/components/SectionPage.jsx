import React, { useState, useEffect } from 'react';
import BookCard from './Bookcard.jsx';

export const SectionPage = ({ title, books, allBooks, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // useEffect: Ejemplo de efecto para registrar cambios en la sección
  useEffect(() => {
    console.log(`📖 Sección "${title}" cargada con ${books.length} libros`);
    
    // Cleanup function: se ejecuta cuando el componente se desmonta o cambia la dependencia
    return () => {
      console.log(`📖 Limpiando sección "${title}"`);
    };
  }, [title, books.length]);

  // Combinar búsqueda global con búsqueda local
  const effectiveSearchQuery = searchQuery || localSearchQuery;
  
  // Filtrar libros según la búsqueda
  const filteredBooks = effectiveSearchQuery 
    ? allBooks.filter(book =>
        book.title.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(effectiveSearchQuery.toLowerCase())
      )
    : books;

  const handleLocalSearch = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const clearLocalSearch = () => {
    setLocalSearchQuery('');
    setShowSearchResults(false);
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'ficcion': 'Ficción',
      'ciencia': 'Ciencia',
      'historia': 'Historia',
      'biografias': 'Biografías',
      'no-ficcion': 'No Ficción'
    };
    return categoryNames[category] || category;
  };

  return (
    <div>
      {/* Header de la sección */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">
          Explora nuestra colección de libros de {getCategoryDisplayName(title.toLowerCase())}
        </p>
        
        {/* Búsqueda local */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={`Buscar en ${title.toLowerCase()}...`}
              value={localSearchQuery}
              onChange={handleLocalSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Información de la sección */}
        <div className="bg-gray-50 p-4 rounded-lg inline-block">
          <p className="text-sm text-gray-600">
            {showSearchResults 
              ? `Buscando en todo el catálogo: "${localSearchQuery}"`
              : `${books.length} libro${books.length !== 1 ? 's' : ''} en ${title.toLowerCase()}`
            }
          </p>
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {showSearchResults && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Resultados de búsqueda: "{localSearchQuery}"
            </h2>
            <button
              onClick={clearLocalSearch}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Volver a {title}
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

      {/* Libros de la sección */}
      {!showSearchResults && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}

      {/* Información adicional de la categoría */}
      {!showSearchResults && (
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">
            Sobre {getCategoryDisplayName(title.toLowerCase())}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">¿Qué encontrarás aquí?</h4>
              <p className="text-gray-700 text-sm">
                {title.toLowerCase() === 'ficcion' && 
                  'Descubre mundos imaginarios, personajes fascinantes y historias que te transportarán a realidades alternativas. Desde fantasía épica hasta ciencia ficción futurista.'
                }
                {title.toLowerCase() === 'ciencia' && 
                  'Explora los misterios del universo, los avances tecnológicos y los descubrimientos científicos que han cambiado nuestra comprensión del mundo.'
                }
                {title.toLowerCase() === 'historia' && 
                  'Viaja a través del tiempo y descubre los eventos, personajes y civilizaciones que han moldeado el curso de la humanidad.'
                }
                {title.toLowerCase() === 'biografias' && 
                  'Conoce las vidas extraordinarias de personas que han dejado una huella indeleble en la historia, el arte, la ciencia y la sociedad.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recomendaciones</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                {books.slice(0, 3).map((book) => (
                  <li key={book.id} className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="truncate">"{book.title}" - {book.author}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 