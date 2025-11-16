// Mock completo de @prisma/client para evitar inicialización real
import { jest } from '@jest/globals';

const mockPrismaClient = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  book: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

class MockPrismaClientKnownRequestError extends Error {
  constructor(message, options) {
    super(message);
    this.code = options?.code;
    this.clientVersion = options?.clientVersion;
  }
}

export const PrismaClient = jest.fn(() => mockPrismaClient);
export const Prisma = {
  PrismaClientKnownRequestError: MockPrismaClientKnownRequestError,
};

export default { PrismaClient, Prisma };

