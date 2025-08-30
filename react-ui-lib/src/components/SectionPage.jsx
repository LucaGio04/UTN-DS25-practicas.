import React from 'react';
import BookCard from './Bookcard.jsx';

export const SectionPage = ({ title, books, allBooks, searchQuery }) => {
  // Filtrar libros de la sección basado en la búsqueda
  const filteredBooks = searchQuery
    ? allBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {searchQuery ? `Búsqueda en ${title}: "${searchQuery}"` : `Sección: ${title}`}
        </h2>
        {searchQuery && (
          <p className="text-gray-600 mb-6">
            Se encontraron {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''} en {title}
          </p>
        )}
        {!searchQuery && (
          <p className="text-gray-600 mb-6">
            {books.length} libro{books.length !== 1 ? 's' : ''} disponible{books.length !== 1 ? 's' : ''} en esta categoría
          </p>
        )}
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery 
              ? `No se encontraron libros en ${title} que coincidan con "${searchQuery}"`
              : `No hay libros disponibles en la sección ${title}`
            }
          </p>
        </div>
      )}

      {!searchQuery && (
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Acerca de {title}</h3>
          <div className="text-gray-600 text-center">
            {title === 'Ficción' && (
              <p>Explora mundos imaginarios, personajes fascinantes y historias que te transportarán a realidades alternativas.</p>
            )}
            {title === 'Ciencia' && (
              <p>Descubre los misterios del universo, avances tecnológicos y el conocimiento científico que ha moldeado nuestro mundo.</p>
            )}
            {title === 'Historia' && (
              <p>Viaja a través del tiempo y conoce los eventos, personajes y civilizaciones que han definido la humanidad.</p>
            )}
            {title === 'Biografías' && (
              <p>Conoce las vidas extraordinarias de personas que han dejado una huella imborrable en la historia.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 