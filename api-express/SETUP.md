# Guía de Configuración - Prisma con Supabase

## Paso 1: Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Espera a que se complete la configuración (puede tardar unos minutos)

## Paso 2: Obtener Connection String

1. En tu proyecto de Supabase, ve a **Settings** → **Database**
2. Busca la sección **Connection string**
3. Selecciona **URI** (no Transaction)
4. Copia la connection string (tendrá este formato):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
5. Reemplaza `[YOUR-PASSWORD]` con la contraseña que configuraste al crear el proyecto

## Paso 3: Configurar .env

1. Crea un archivo `.env` en la raíz de `api-express/`
2. Agrega la siguiente línea:
   ```env
   DATABASE_URL="tu-connection-string-aqui"
   ```
3. **IMPORTANTE**: El archivo `.env` ya está en `.gitignore`, así que no se subirá al repositorio

## Paso 4: Generar Prisma Client

```bash
cd api-express
npm run db:generate
```

## Paso 5: Crear y aplicar migraciones

```bash
npm run db:migrate
```

Cuando te pregunte el nombre de la migración, puedes usar: `init`

## Paso 6: Poblar la base de datos (opcional)

```bash
npm run db:seed
```

Esto insertará los libros iniciales en la base de datos.

## Paso 7: Verificar

Puedes abrir Prisma Studio para ver los datos:

```bash
npm run db:studio
```

Esto abrirá una interfaz web en `http://localhost:5555` donde podrás ver y editar los datos.

## Verificar que todo funciona

1. Inicia el servidor:
   ```bash
   npm run dev
   ```

2. Prueba los endpoints:
   - `http://localhost:3000/api/books` - Debería devolver los libros
   - `http://localhost:3000/api/books/featured` - Debería devolver los destacados

## Troubleshooting

### Error: "Can't reach database server"
- Verifica que la connection string sea correcta
- Asegúrate de que el proyecto de Supabase esté activo
- Verifica que la contraseña sea correcta

### Error: "P1001: Can't reach database server"
- Revisa que el formato de la connection string sea correcto
- Asegúrate de usar el formato URI (no Transaction)

### Error al ejecutar migraciones
- Asegúrate de haber ejecutado `npm run db:generate` primero
- Verifica que la base de datos esté accesible

