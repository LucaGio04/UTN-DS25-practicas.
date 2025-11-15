import { prisma } from '../config/prisma.js';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

/**
 * Servicio para gestionar operaciones CRUD de libros
 * Reemplaza la lógica de mocks por operaciones de Prisma
 */

/**
 * Obtener todos los libros
 * @returns {Promise<Array>} Lista de todos los libros
 */
export const getAllBooks = async () => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        id: 'asc'
      },
      include: {
        author: true // Incluye la información del autor
      }
    });
    return books;
  } catch (error) {
    console.error('Error en getAllBooks:', error);
    throw new Error('Error al obtener los libros');
  }
};

/**
 * Obtener un libro por ID
 * @param {number} id - ID del libro
 * @returns {Promise<Object>} Libro encontrado
 * @throws {Error} Si el libro no existe (código 404)
 */
export const getBookById = async (id) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true // Incluye la información del autor
      }
    });

    if (!book) {
      const error = new Error('Libro no encontrado');
      error.statusCode = 404;
      error.code = 'P2025';
      throw error;
    }

    return book;
  } catch (error) {
    if (error.code === 'P2025') {
      throw error; // Re-lanzar error de Prisma
    }
    console.error('Error en getBookById:', error);
    throw new Error('Error al obtener el libro');
  }
};

/**
 * Crear un nuevo libro
 * @param {Object} data - Datos del libro (title, authorName, authorEmail, cover, category, price)
 * @returns {Promise<Object>} Libro creado
 * @throws {Error} Si hay errores de validación o de BD
 */
export const createBook = async (data) => {
  try {
    // Buscar o crear el usuario/autor
    let author;
    const existingUser = await prisma.user.findUnique({
      where: { email: data.authorEmail },
    });

    if (existingUser) {
      // Si el usuario existe, usarlo
      author = existingUser;
    } else {
      // Si no existe, crear un nuevo usuario/autor
      // Generar una contraseña aleatoria para el autor (no se usará para login)
      const randomPassword = Math.random().toString(36).slice(-12);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      author = await prisma.user.create({
        data: {
          email: data.authorEmail,
          name: data.authorName,
          password: hashedPassword, // Contraseña generada automáticamente
        },
      });
    }

    // Crear el libro asociado al autor
    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: {
          connect: { id: author.id },
        },
        cover: data.cover || '/img/ficcion-1.jpg',
        category: data.category,
        price: data.price || 0,
        featured: data.featured || false
      },
      include: {
        author: true
      }
    });

    return book;
  } catch (error) {
    // Manejar errores de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Error P2002: Violación de unicidad
      if (error.code === 'P2002') {
        const errorMessage = new Error('Ya existe un libro con estos datos únicos');
        errorMessage.statusCode = 409;
        errorMessage.code = 'P2002';
        throw errorMessage;
      }
    }

    if (error.statusCode) {
      throw error; // Re-lanzar errores de validación
    }

    console.error('Error en createBook:', error);
    throw new Error('Error al crear el libro');
  }
};

/**
 * Actualizar un libro
 * @param {number} id - ID del libro a actualizar
 * @param {Object} updateData - Datos a actualizar
 * @returns {Promise<Object>} Libro actualizado
 * @throws {Error} Si el libro no existe (código 404)
 */
export const updateBook = async (id, updateData) => {
  try {
    // Si se proporciona authorId, conectarlo
    if (updateData.authorId) {
      updateData.author = { connect: { id: updateData.authorId } };
      delete updateData.authorId;
    }

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        author: true // Incluye la información del autor
      }
    });

    return book;
  } catch (error) {
    // Manejar error P2025: Registro no encontrado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const notFoundError = new Error('Libro no encontrado o AuthorId inválido');
      notFoundError.statusCode = 404;
      notFoundError.code = 'P2025';
      throw notFoundError;
    }

    if (error.statusCode) {
      throw error; // Re-lanzar errores de validación
    }

    console.error('Error en updateBook:', error);
    throw new Error('Error al actualizar el libro');
  }
};

/**
 * Eliminar un libro
 * @param {number} id - ID del libro a eliminar
 * @returns {Promise<Object>} Libro eliminado
 * @throws {Error} Si el libro no existe (código 404)
 */
export const deleteBook = async (id) => {
  try {
    const book = await prisma.book.delete({
      where: { id: parseInt(id) }
    });

    return book;
  } catch (error) {
    // Manejar error P2025: Registro no encontrado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const notFoundError = new Error('Libro no encontrado');
      notFoundError.statusCode = 404;
      notFoundError.code = 'P2025';
      throw notFoundError;
    }

    console.error('Error en deleteBook:', error);
    throw new Error('Error al eliminar el libro');
  }
};

/**
 * Obtener libros por categoría
 * @param {string} category - Categoría de los libros
 * @returns {Promise<Array>} Lista de libros de la categoría
 */
export const getBooksByCategory = async (category) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        category: category,
        featured: false
      },
      orderBy: {
        id: 'asc'
      },
      include: {
        author: true // Incluye la información del autor
      }
    });
    return books;
  } catch (error) {
    console.error('Error en getBooksByCategory:', error);
    throw new Error('Error al obtener libros por categoría');
  }
};

/**
 * Obtener libros destacados
 * @returns {Promise<Array>} Lista de libros destacados
 */
export const getFeaturedBooks = async () => {
  try {
    const books = await prisma.book.findMany({
      where: {
        featured: true
      },
      orderBy: {
        id: 'asc'
      },
      include: {
        author: true // Incluye la información del autor
      }
    });
    return books;
  } catch (error) {
    console.error('Error en getFeaturedBooks:', error);
    throw new Error('Error al obtener libros destacados');
  }
};

/**
 * Buscar libros por término
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Lista de libros que coinciden
 */
export const searchBooks = async (query) => {
  try {
    if (!query || !query.trim()) {
      return await getAllBooks();
    }

    const searchTerm = query.toLowerCase();

    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            author: {
              is: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                },
              },
            },
          },
          {
            category: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: {
        id: 'asc'
      },
      include: {
        author: true // Incluye la información del autor
      }
    });

    return books;
  } catch (error) {
    console.error('Error en searchBooks:', error);
    throw new Error('Error al buscar libros');
  }
};

