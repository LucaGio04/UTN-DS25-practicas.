# API Express - Librería El Saber

API backend para la aplicación de librería, implementada con Express.js.

## Instalación

```bash
npm install
```

## Ejecutar

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints

### GET /api/books
Obtiene todos los libros del catálogo.

**Respuesta:**
```json
{
  "success": true,
  "data": [...],
  "total": 24
}
```

### GET /api/books/category/:category
Obtiene libros por categoría (ficcion, ciencia, historia, biografias).

**Ejemplo:** `/api/books/category/ficcion`

### GET /api/books/featured
Obtiene los libros destacados.

### GET /api/books/search?q=query
Busca libros por título, autor o categoría.

**Ejemplo:** `/api/books/search?q=historia`

### GET /api/books/:id
Obtiene un libro específico por ID.

### POST /api/books
Agrega un nuevo libro.

**Body:**
```json
{
  "title": "Título del libro",
  "author": "Nombre del autor",
  "category": "ficcion",
  "cover": "/img/ficcion-1.jpg"
}
```

### DELETE /api/books/:id
Elimina un libro por ID.

## Estructura

```
api-express/
├── server.js          # Servidor principal
├── routes/
│   └── books.js       # Rutas de libros
├── data/
│   └── books.js       # Datos mockeados (movidos desde frontend)
└── package.json
```

