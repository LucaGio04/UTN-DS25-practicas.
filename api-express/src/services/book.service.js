import { prisma } from '../config/prisma.js';
import { Prisma } from '@prisma/client';

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
      where: { id: parseInt(id) }
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
 * @param {Object} data - Datos del libro (title, author, cover, category, price)
 * @returns {Promise<Object>} Libro creado
 * @throws {Error} Si hay errores de validación o de BD
 */
export const createBook = async (data) => {
  try {
    // Validaciones de negocio
    if (!data.title || !data.author || !data.category) {
      const error = new Error('Faltan campos requeridos: title, author, category');
      error.statusCode = 400;
      throw error;
    }

    if (data.price !== undefined && data.price < 0) {
      const error = new Error('El precio debe ser mayor o igual a 0');
      error.statusCode = 400;
      throw error;
    }

    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        cover: data.cover || '/img/ficcion-1.jpg',
        category: data.category,
        price: data.price || 0,
        featured: data.featured || false
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
    // Validación de precio si se proporciona
    if (updateData.price !== undefined && updateData.price < 0) {
      const error = new Error('El precio debe ser mayor o igual a 0');
      error.statusCode = 400;
      throw error;
    }

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: updateData
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
              contains: searchTerm,
              mode: 'insensitive'
            }
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
      }
    });

    return books;
  } catch (error) {
    console.error('Error en searchBooks:', error);
    throw new Error('Error al buscar libros');
  }
};

