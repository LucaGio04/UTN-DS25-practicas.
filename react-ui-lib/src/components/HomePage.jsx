import React from 'react';
import BookCard from './Bookcard.jsx';

export const HomePage = ({ booksData, allBooks, searchQuery }) => {
  // Filtrar libros basado en la búsqueda
  const filteredBooks = searchQuery
    ? allBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : booksData.featured;

  return (
    <div>
      <div className="text-center">
        <h2>
          {searchQuery ? `Resultados de búsqueda: "${searchQuery}"` : 'Novedades Destacadas'}
        </h2>
        {searchQuery && (
          <p>
            Se encontraron {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>
            No se encontraron libros que coincidan con "{searchQuery}"
          </p>
        </div>
      )}

      {!searchQuery && (
        <div className="mt-12">
          <h3>Explora Nuestras Categorías</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(booksData).filter(([key]) => key !== 'featured').map(([category, books]) => (
              <div key={category} className="bg-white p-6 rounded-lg shadow-lg">
                <h4>
                  {category === 'ficcion' ? 'Ficción' : 
                   category === 'ciencia' ? 'Ciencia' : 
                   category === 'historia' ? 'Historia' : 
                   category === 'biografias' ? 'Biografías' : category}
                </h4>
                <p>{books.length} libros disponibles</p>
                <div>
                  {books.slice(0, 2).map(book => (
                    <div key={book.id}>
                      "{book.title}" - {book.author}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
