import React, { useState } from 'react';

// Componente para la tarjeta de libro
const BookCard = ({ book }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
      <img
        src={book.cover}
        alt={`Tapa de ${book.title}`}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
    </div>
  );
};

// Componente para la página de inicio
const HomePage = ({ featuredBooks }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Nuestros Libros Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

// Componente para las páginas de secciones (Ficción, Ciencia, etc.)
const SectionPage = ({ title }) => {
  const books = [
    { id: 1, title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Gatsby' },
    { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Soledad' },
    { id: 3, title: '1984', author: 'George Orwell', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=1984' },
    { id: 4, title: 'Matar a un ruiseñor', author: 'Harper Lee', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Ruiseñor' },
    { id: 5, title: 'Orgullo y prejuicio', author: 'Jane Austen', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Orgullo' },
    { id: 6, title: 'El señor de los anillos', author: 'J.R.R. Tolkien', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Anillos' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

// Componente para la página de registro
const RegistrationPage = () => {
  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 my-8">
      <h2 className="text-2xl font-bold text-center">Formulario de Registro</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <fieldset>
          <legend className="text-base font-medium text-gray-900">Sexo</legend>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input id="sexo-masculino" name="sexo" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="sexo-masculino" className="ml-3 block text-sm font-medium text-gray-700">Masculino</label>
            </div>
            <div className="flex items-center">
              <input id="sexo-femenino" name="sexo" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="sexo-femenino" className="ml-3 block text-sm font-medium text-gray-700">Femenino</label>
            </div>
            <div className="flex items-center">
              <input id="sexo-otro" name="sexo" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="sexo-otro" className="ml-3 block text-sm font-medium text-gray-700">Otro</label>
            </div>
          </div>
        </fieldset>
        <div>
          <label htmlFor="tema-favorito" className="block text-sm font-medium text-gray-700">Tema Favorito</label>
          <select id="tema-favorito" name="tema-favorito" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>Ficción</option>
            <option>Ciencia</option>
            <option>Historia</option>
            <option>Biografías</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="w-full md:w-auto px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

// Componente para la página de contacto
const ContactPage = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-8">
      <h2 className="text-2xl font-bold text-center">Contacto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Datos de Contacto</h3>
          <p className="text-gray-600">
            <span className="font-medium">Dirección:</span> Calle Falsa 123, Ciudad de la Ficción, F.C.
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Teléfonos:</span> (555) 123-4567, (555) 987-6543
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Email:</span> contacto@libreriaelsaber.com
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Formulario de Contacto</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" id="contact-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="contact-email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea id="contact-message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="w-full md:w-auto px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Componente de diseño (Layout)
const Layout = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="app-container flex flex-col min-h-screen font-sans">
      <header className="relative bg-cover bg-center text-white p-6 md:p-12 text-center" style={{ backgroundImage: "url('https://placehold.co/1200x400/36454F/FFFFFF?text=Librería+El+Saber')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2">Librería El Saber</h1>
          <p className="text-md md:text-xl italic">Tu portal al conocimiento y la imaginación.</p>
        </div>
      </header>

      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base">
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200 font-medium" onClick={() => setCurrentPage('inicio')}>Inicio</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200 font-medium" onClick={() => setCurrentPage('ficcion')}>Ficción</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200 font-medium" onClick={() => setCurrentPage('ciencia')}>Ciencia</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200 font-medium" onClick={() => setCurrentPage('historia')}>Historia</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200 font-medium" onClick={() => setCurrentPage('biografias')}>Biografías</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200 font-medium" onClick={() => setCurrentPage('registros')}>Registración</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200 font-medium" onClick={() => setCurrentPage('contacto')}>Contacto</a>
          </li>
        </ul>
      </nav>

      <main className="flex-grow">
        {currentPage === 'inicio' && <HomePage featuredBooks={[
          { id: 1, title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Gatsby' },
          { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Soledad' },
          { id: 3, title: '1984', author: 'George Orwell', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=1984' },
          { id: 4, title: 'Matar a un ruiseñor', author: 'Harper Lee', cover: 'https://placehold.co/200x300/F2F2F2/A9A9A9?text=Ruiseñor' }
        ]} />}
        {currentPage === 'ficcion' && <SectionPage title="Sección: Ficción" />}
        {currentPage === 'ciencia' && <SectionPage title="Sección: Ciencia" />}
        {currentPage === 'historia' && <SectionPage title="Sección: Historia" />}
        {currentPage === 'biografias' && <SectionPage title="Sección: Biografías" />}
        {currentPage === 'registros' && <RegistrationPage />}
        {currentPage === 'contacto' && <ContactPage />}
      </main>

      <footer className="bg-gray-800 text-white p-6 text-center mt-auto">
        <p className="text-sm">&copy; 2024 Librería El Saber. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">Facebook</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">Twitter</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">Instagram</a>
        </div>
        <a href="#" className="text-sm text-gray-400 hover:underline mt-2 inline-block">Términos y Condiciones</a>
      </footer>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [currentPage, setCurrentPage] = useState('inicio');

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} />
  );
};

export default App;
