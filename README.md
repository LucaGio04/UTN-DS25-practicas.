# Librería El Saber - Proyecto Full Stack

Proyecto de librería implementado con React (frontend) y Express.js + Prisma + PostgreSQL (backend).

## Estructura del Proyecto

```
.
├── frontend/          # Frontend - Aplicación React
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
├── backend/           # Backend - API Express con Prisma
│   ├── routes/
│   ├── lib/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── server.js
│
└── README.md
```

> **Nota:** Si aún tienes las carpetas con nombres antiguos (`react-ui-lib-v3` y `api-express`), ejecuta el script de reestructuración:
> ```powershell
> .\reestructurar.ps1
> ```
> **Importante:** Cierra todos los procesos (servidores, editores) antes de ejecutar el script.

## Tecnologías

### Frontend
- React
- Vite
- Tailwind CSS
- Custom Hooks (useEffect, useContext, Fetch API)

### Backend
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)
- CORS

## Configuración

### Backend

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar base de datos:**
   - Crea un proyecto en [Supabase](https://supabase.com)
   - Crea un archivo `.env` en `backend/`:
     ```env
     DATABASE_URL="postgresql://usuario:password@host:puerto/database?schema=public"
     ```
   - Ver `backend/SETUP.md` para instrucciones detalladas

3. **Configurar Prisma:**
   ```bash
   cd backend
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

4. **Iniciar servidor:**
   ```bash
   npm run dev
   ```
   El servidor correrá en `http://localhost:3000`

### Frontend

1. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configurar URL de la API:**
   - Verifica que `frontend/src/hooks/useBooks.js` tenga la URL correcta:
     ```javascript
     const API_BASE_URL = 'http://localhost:3000/api';
     ```

3. **Iniciar aplicación:**
   ```bash
   npm run dev
   ```
   La aplicación correrá en `http://localhost:5173` (o el puerto que Vite asigne)

## Ejecutar el Proyecto Completo

Necesitas dos terminales:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Endpoints de la API

- `GET /api/books` - Todos los libros
- `GET /api/books/category/:category` - Libros por categoría
- `GET /api/books/featured` - Libros destacados
- `GET /api/books/search?q=query` - Buscar libros
- `GET /api/books/:id` - Libro por ID
- `POST /api/books` - Agregar libro
- `DELETE /api/books/:id` - Eliminar libro

## Evolución del Proyecto

Este proyecto muestra la evolución a través de diferentes clases:

- **Clase 13**: React con Hooks (useEffect, useContext, Custom Hooks, Fetch API)
- **Clase 14**: Express.js API (reemplazo de mocks)
- **Clase 15**: Prisma + PostgreSQL (Supabase) - Base de datos real

## Autor

Proyecto desarrollado para UTN-DS25
