# API Express - Librería El Saber

API backend para la aplicación de librería, implementada con Express.js y Prisma (PostgreSQL/Supabase).

## Instalación

```bash
npm install
```

## Configuración

1. **Configurar base de datos (Supabase)**
   - Crea un proyecto en [Supabase](https://supabase.com)
   - Obtén la connection string de PostgreSQL
   - Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/database?schema=public"
```

2. **Generar Prisma Client**
```bash
npm run db:generate
```

3. **Ejecutar migraciones**
```bash
npm run db:migrate
```

4. **Poblar base de datos (seed)**
```bash
npm run db:seed
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
Obtiene todos los libros del catálogo (excluyendo destacados).

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
Busca libros por título, autor o categoría (case-insensitive).

**Ejemplo:** `/api/books/search?q=historia`

### GET /api/books/:id
Obtiene un libro específico por ID.

### POST /api/books
Crea un nuevo libro.

**Body:**
```json
{
  "title": "Título del libro",
  "author": "Nombre del autor",
  "category": "ficcion",
  "cover": "/img/ficcion-1.jpg",
  "price": 2500,
  "featured": false
}
```

**Validaciones:**
- `title`, `author`, `category` son requeridos
- `price` debe ser >= 0

### PUT /api/books/:id
Actualiza un libro existente.

**Body:**
```json
{
  "title": "Título actualizado",
  "price": 3000
}
```

**Errores:**
- 404 si el libro no existe (P2025)

### DELETE /api/books/:id
Elimina un libro por ID.

**Errores:**
- 404 si el libro no existe (P2025)

## Comandos Prisma

```bash
# Generar Prisma Client
npm run db:generate

# Crear y aplicar migraciones
npm run db:migrate

# Poblar base de datos con datos iniciales
npm run db:seed

# Abrir Prisma Studio (interfaz visual)
npm run db:studio
```

## Estructura

```
api-express/
├── server.js          # Servidor principal
├── lib/
│   └── prisma.js     # Cliente Prisma (singleton)
├── routes/
│   └── books.js      # Rutas de libros (usando Prisma)
├── prisma/
│   ├── schema.prisma # Schema de la base de datos
│   └── seed.js       # Script para poblar datos iniciales
└── package.json
```

## Tecnologías

- **Express.js**: Framework web
- **Prisma**: ORM para PostgreSQL
- **PostgreSQL**: Base de datos (Supabase)
- **CORS**: Para permitir peticiones desde el frontend
