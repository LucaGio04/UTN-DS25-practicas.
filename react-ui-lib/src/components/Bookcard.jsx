import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={book.cover}
        alt={`Tapa de ${book.title}`}
        className="w-full h-48"
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
};

export default BookCard;
