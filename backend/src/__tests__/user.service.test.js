import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock de Prisma config - Jest usará automáticamente __mocks__/config/prisma.js
jest.mock('../config/prisma.js');

// Importar Prisma después del mock (para el error P2002)
import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma.js';

// Mock de bcrypt ANTES de importar el servicio
const mockHash = jest.fn();
jest.mock('bcrypt', () => ({
  hash: mockHash,
}));

// Importar después de los mocks
import { createUser, getUserById, getAllUsers } from '../services/user.service.js';

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('debe retornar todos los usuarios con sus libros', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'Usuario 1',
          email: 'user1@email.com',
          books: [],
        },
        {
          id: 2,
          name: 'Usuario 2',
          email: 'user2@email.com',
          books: [],
        },
      ];

      prisma.user.findMany.mockResolvedValue(mockUsers);

      const result = await getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        include: { books: true },
      });
    });
  });

  describe('getUserById', () => {
    it('debe retornar un usuario por ID si existe', async () => {
      const mockUser = {
        id: 1,
        name: 'Usuario Test',
        email: 'test@email.com',
        books: [],
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getUserById(1);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { books: true },
      });
    });

    it('debe lanzar error 404 si el usuario no existe', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(getUserById(999)).rejects.toThrow('Usuario no encontrado');

      const error = await getUserById(999).catch((e) => e);
      expect(error.statusCode).toBe(404);
    });
  });

  describe('createUser', () => {
    it('debe crear un usuario con contraseña hasheada', async () => {
      const userData = {
        name: 'Nuevo Usuario',
        email: 'nuevo@email.com',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';
      const mockCreatedUser = {
        id: 1,
        ...userData,
        password: hashedPassword,
      };

      mockHash.mockResolvedValue(hashedPassword);
      prisma.user.create.mockResolvedValue(mockCreatedUser);

      const result = await createUser(userData);

      expect(result).toEqual(mockCreatedUser);
      expect(mockHash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    });

    it('debe lanzar error 409 si el email ya existe', async () => {
      const userData = {
        name: 'Usuario',
        email: 'existente@email.com',
        password: 'password123',
      };

      const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '5.0.0',
      });

      mockHash.mockResolvedValue('hashedPassword');
      prisma.user.create.mockRejectedValue(prismaError);

      await expect(createUser(userData)).rejects.toThrow('Ya existe un usuario con este email');

      const error = await createUser(userData).catch((e) => e);
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe('P2002');
    });
  });
});

