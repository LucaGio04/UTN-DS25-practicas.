import React, { useState } from 'react';
import { HomePage } from './components/HomePage.jsx';
import { SectionPage } from './components/SectionPage.jsx';
import { RegistrationPage } from './components/RegistrationPage.jsx';
import { ContactPage } from './components/ContactPage.jsx';

const booksData = {
  ficcion: [
    { id: 1, title: 'El Legado del Héroe', author: 'Sofía Ríos', cover: '/img/ficcion-portada.jpg' },
    { id: 2, title: 'Crónica del asesino de reyes: El nombre del viento', author: 'Patrick Rothfuss', cover: '/img/ficcion-1.jpg' },
    { id: 3, title: 'La Rueda del Tiempo: El ojo del mundo', author: 'Robert Jordan', cover: '/img/ficcion-2.jpg' },
    { id: 4, title: 'Canción de hielo y fuego: Juego de tronos', author: 'George R.R. Martin', cover: '/img/ficcion-3.jpg' },
    { id: 5, title: 'La historia interminable', author: 'Michael Ende', cover: '/img/ficcion-4.jpg' },
    { id: 6, title: 'El Hobbit', author: 'J.R.R. Tolkien', cover: '/img/ficcion-5.jpg' },
  ],
  ciencia: [
    { id: 7, title: 'El Cosmos en Nuestras Manos', author: 'Laura Gómez', cover: '/img/ciencia-portada.jpg' },
    { id: 8, title: 'El gen egoísta', author: 'Richard Dawkins', cover: '/img/ficcion-1.jpg' },
    { id: 9, title: 'Cosmos', author: 'Carl Sagan', cover: '/img/ficcion-2.jpg' },
    { id: 10, title: 'Sapiens: De animales a dioses', author: 'Yuval Noah Harari', cover: '/img/ficcion-3.jpg' },
    { id: 11, title: 'Breve historia del tiempo', author: 'Stephen Hawking', cover: '/img/ficcion-4.jpg' },
    { id: 12, title: 'El origen de las especies', author: 'Charles Darwin', cover: '/img/ficcion-5.jpg' },
  ],
  historia: [
    { id: 13, title: 'Imperios Olvidados', author: 'Javier Torres', cover: '/img/historia-portada.jpg' },
    { id: 14, title: 'La Segunda Guerra Mundial', author: 'Antony Beevor', cover: '/img/ficcion-1.jpg' },
    { id: 15, title: 'Imperiofobia y Leyenda Negra', author: 'Elvira Roca Barea', cover: '/img/ficcion-2.jpg' },
    { id: 16, title: 'Homo Deus: Breve historia del mañana', author: 'Yuval Noah Harari', cover: '/img/ficcion-3.jpg' },
    { id: 17, title: 'Armas, gérmenes y acero', author: 'Jared Diamond', cover: '/img/ficcion-4.jpg' },
    { id: 18, title: 'La guerra de los 30 años', author: 'C.V. Wedgwood', cover: '/img/ficcion-5.jpg' },
  ],
  biografias: [
    { id: 19, title: 'La biografía de Steve Jobs', author: 'Walter Isaacson', cover: '/img/ficcion-1.jpg' },
    { id: 20, title: 'Einstein: Su vida y su universo', author: 'Walter Isaacson', cover: '/img/ficcion-2.jpg' },
    { id: 21, title: 'El diario de Ana Frank', author: 'Ana Frank', cover: '/img/ficcion-4.jpg' },
    { id: 22, title: 'Yo soy Malala', author: 'Malala Yousafzai', cover: '/img/ficcion-5.jpg' },
    { id: 23, title: 'Nelson Mandela: Conversaciones conmigo mismo', author: 'Nelson Mandela', cover: '/img/ficcion-6.jpg' },
    { id: 24, title: 'Leonardo da Vinci', author: 'Walter Isaacson', cover: '/img/ficcion-1.jpg' },
  ],
  featured: [
    { id: 25, title: 'El Legado del Héroe', author: 'Sofía Ríos', cover: '/img/ficcion-portada.jpg' },
    { id: 26, title: 'El Camino a la Creatividad', author: 'Daniel Pérez', cover: '/img/no-ficcion-portada.jpg' },
    { id: 27, title: 'El Cosmos en Nuestras Manos', author: 'Laura Gómez', cover: '/img/ciencia-portada.jpg' },
    { id: 28, title: 'Imperios Olvidados', author: 'Javier Torres', cover: '/img/historia-portada.jpg' }
  ]
};

const allBooks = Object.values(booksData).flat();

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <h1>Librería El Saber</h1>
        <p>Tu portal al conocimiento y la imaginación.</p>
      </header>
      
      <nav>
        <ul>
          <li><a href="#" onClick={() => { setCurrentPage('inicio'); setSearchQuery(''); }}>Inicio</a></li>
          <li><a href="#" onClick={() => { setCurrentPage('ficcion'); setSearchQuery(''); }}>Ficción</a></li>
          <li><a href="#" onClick={() => { setCurrentPage('ciencia'); setSearchQuery(''); }}>Ciencia</a></li>
          <li><a href="#" onClick={() => { setCurrentPage('historia'); setSearchQuery(''); }}>Historia</a></li>
          <li><a href="#" onClick={() => { setCurrentPage('biografias'); setSearchQuery(''); }}>Biografías</a></li>
          <li><a href="#" onClick={() => { setCurrentPage('registros'); setSearchQuery(''); }}>Registración</a></li>
          <li><a href="#" onClick={() => { setCurrentPage('contacto'); setSearchQuery(''); }}>Contacto</a></li>
        </ul>
        
        <div>
          <input
            type="text"
            placeholder="Buscar libros..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentPage !== 'inicio') {
                setCurrentPage('inicio');
              }
            }}
          />
        </div>
      </nav>
      
      <main className="container">
        {currentPage === 'inicio' && <HomePage booksData={booksData} allBooks={allBooks} searchQuery={searchQuery} />}
        {currentPage === 'ficcion' && <SectionPage title="Ficción" books={booksData.ficcion} allBooks={allBooks} searchQuery={searchQuery} />}
        {currentPage === 'ciencia' && <SectionPage title="Ciencia" books={booksData.ciencia} allBooks={allBooks} searchQuery={searchQuery} />}
        {currentPage === 'historia' && <SectionPage title="Historia" books={booksData.historia} allBooks={allBooks} searchQuery={searchQuery} />}
        {currentPage === 'biografias' && <SectionPage title="Biografías" books={booksData.biografias} allBooks={allBooks} searchQuery={searchQuery} />}
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

export default App;
