import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock de Prisma config - Jest usará automáticamente __mocks__/config/prisma.js
jest.mock('../config/prisma.js');

// Importar después de los mocks
import { getBookById, getAllBooks } from '../services/book.service.js';
import { prisma } from '../config/prisma.js';

describe('Book Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('debe retornar todos los libros con sus autores', async () => {
      const mockBooks = [
        {
          id: 1,
          title: 'Libro 1',
          author: { id: 1, name: 'Autor 1', email: 'autor1@email.com' },
        },
        {
          id: 2,
          title: 'Libro 2',
          author: { id: 2, name: 'Autor 2', email: 'autor2@email.com' },
        },
      ];

      prisma.book.findMany.mockResolvedValue(mockBooks);

      const result = await getAllBooks();

      expect(result).toEqual(mockBooks);
      expect(prisma.book.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        include: { author: true },
      });
    });

    it('debe lanzar error si hay un problema con la base de datos', async () => {
      prisma.book.findMany.mockRejectedValue(new Error('Database error'));

      await expect(getAllBooks()).rejects.toThrow('Error al obtener los libros');
    });
  });

  describe('getBookById', () => {
    it('debe retornar un libro por ID si existe', async () => {
      const mockBook = {
        id: 1,
        title: 'Libro Test',
        author: { id: 1, name: 'Autor Test', email: 'autor@email.com' },
      };

      prisma.book.findUnique.mockResolvedValue(mockBook);

      const result = await getBookById(1);

      expect(result).toEqual(mockBook);
      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { author: true },
      });
    });

    it('debe lanzar error 404 si el libro no existe', async () => {
      prisma.book.findUnique.mockResolvedValue(null);

      await expect(getBookById(999)).rejects.toThrow('Libro no encontrado');

      const error = await getBookById(999).catch((e) => e);
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe('P2025');
    });
  });
});

