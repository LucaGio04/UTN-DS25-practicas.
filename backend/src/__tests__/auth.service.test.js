import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock de Prisma config - Jest usará automáticamente __mocks__/config/prisma.js
jest.mock('../config/prisma.js');

// Importar el mock después de mockearlo
import { prisma } from '../config/prisma.js';

// Mock de bcrypt y jwt ANTES de importar el servicio
const mockCompare = jest.fn();
jest.mock('bcrypt', () => ({
  compare: mockCompare,
}));

const mockSign = jest.fn();
jest.mock('jsonwebtoken', () => ({
  sign: mockSign,
}));

// Importar después de los mocks
import { loginUser } from '../services/auth.service.js';

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Configurar JWT_SECRET para los tests
    process.env.JWT_SECRET = 'test-secret-key';
  });

  describe('loginUser', () => {
    it('debe lanzar error si JWT_SECRET no está definido', async () => {
      delete process.env.JWT_SECRET;

      await expect(loginUser('test@email.com', 'password')).rejects.toThrow(
        'Error de configuración del servidor'
      );
    });

    it('debe lanzar error si el usuario no existe', async () => {
      process.env.JWT_SECRET = 'test-secret-key';
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(loginUser('nonexistent@email.com', 'password')).rejects.toThrow(
        'Credenciales inválidas'
      );

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'nonexistent@email.com' },
      });
    });

    it('debe lanzar error si la contraseña es incorrecta', async () => {
      process.env.JWT_SECRET = 'test-secret-key';
      const mockUser = {
        id: 1,
        email: 'test@email.com',
        name: 'Test User',
        password: 'hashedPassword',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(false);

      await expect(loginUser('test@email.com', 'wrongPassword')).rejects.toThrow(
        'Credenciales inválidas'
      );

      expect(mockCompare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
    });

    it('debe retornar token y usuario si las credenciales son correctas', async () => {
      process.env.JWT_SECRET = 'test-secret-key';
      const mockUser = {
        id: 1,
        email: 'test@email.com',
        name: 'Test User',
        password: 'hashedPassword',
      };

      const mockToken = 'mock-jwt-token';

      prisma.user.findUnique.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(true);
      mockSign.mockReturnValue(mockToken);

      const result = await loginUser('test@email.com', 'correctPassword');

      expect(result).toEqual({
        token: mockToken,
        user: {
          id: 1,
          email: 'test@email.com',
          name: 'Test User',
        },
      });

      expect(mockSign).toHaveBeenCalledWith(
        { userId: 1, email: 'test@email.com' },
        'test-secret-key',
        { expiresIn: '1h' }
      );
    });
  });
});

