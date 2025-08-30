import React from 'react';
import BookCard from './Bookcard.jsx';

export const CatalogPage = ({ books, searchQuery, onRemoveBook }) => {
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          {searchQuery ? `Resultados de búsqueda: "${searchQuery}"` : 'Catálogo Completo'}
        </h2>
        {searchQuery && (
          <p className="text-gray-600">
            Se encontraron {books.length} libro{books.length !== 1 ? 's' : ''}
          </p>
        )}
        {!searchQuery && (
          <p className="text-gray-600">
            Total de libros en el catálogo: {books.length}
          </p>
        )}
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="relative">
              <BookCard book={book} />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => onRemoveBook(book.id, book.category)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                  title="Eliminar libro"
                >
                  ×
                </button>
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {getCategoryDisplayName(book.category)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery 
              ? `No se encontraron libros que coincidan con "${searchQuery}"`
              : 'No hay libros en el catálogo'
            }
          </p>
        </div>
      )}

      {!searchQuery && (
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">Estadísticas del Catálogo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {books.filter(book => book.category === 'ficcion').length}
              </div>
              <div className="text-sm text-gray-600">Ficción</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {books.filter(book => book.category === 'ciencia').length}
              </div>
              <div className="text-sm text-gray-600">Ciencia</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {books.filter(book => book.category === 'historia').length}
              </div>
              <div className="text-sm text-gray-600">Historia</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {books.filter(book => book.category === 'biografias').length}
              </div>
              <div className="text-sm text-gray-600">Biografías</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
