import React from 'react';

function Layout({ children }) {
  return (
    <div>
      <header>
        <img src="/img/logo.png" alt="Logo de la Librería" />
        <h1>Librería El Saber</h1>
      </header>

      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/ficcion">Ficción</a></li>
          <li><a href="/no-ficcion">No Ficción</a></li>
          <li><a href="/ciencia">Ciencia</a></li>
          <li><a href="/historia">Historia</a></li>
          <li><a href="/registro">Registración</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>

      <main>
        {children}
      </main>

      <footer>
        <p>&copy; 2025 Librería El Saber. Todos los derechos reservados.</p>
        <p>Síguenos: [Iconos de redes sociales] | <a href="#">Términos y Condiciones</a></p>
      </footer>
    </div>
  );
}

export default Layout;