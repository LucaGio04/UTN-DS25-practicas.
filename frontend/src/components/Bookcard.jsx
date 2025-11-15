import React, { useState, useEffect } from 'react';

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // useEffect: Ejemplo de efecto para manejar errores de carga de imágenes
  useEffect(() => {
    // Resetear estados cuando cambia el libro
    setImageError(false);
    setImageLoaded(false);
  }, [book.cover]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getAuthorName = () => {
    if (book.author && typeof book.author === 'object' && book.author.name) {
      return book.author.name;
    }
    return book.author || 'Autor desconocido';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {!imageError ? (
          <img
            src={book.cover}
            alt={`Tapa de ${book.title}`}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-110`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-6xl">📚</span>
          </div>
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
        )}
        {book.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">
            ⭐ Destacado
          </div>
        )}
        {book.price !== undefined && book.price > 0 && (
          <div className="absolute bottom-2 left-2 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-md">
            ${book.price}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <span className="mr-2">✍️</span>
          <span className="line-clamp-1">{getAuthorName()}</span>
        </p>
        {book.category && (
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
            {book.category}
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;
