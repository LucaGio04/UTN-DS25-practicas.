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

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
        {!imageError ? (
          <img
            src={book.cover}
            alt={`Tapa de ${book.title}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            <span className="text-4xl">📚</span>
          </div>
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
      <p className="text-gray-600 text-sm">{book.author}</p>
      {book.category && (
        <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          {book.category}
        </span>
      )}
    </div>
  );
};

export default BookCard;
