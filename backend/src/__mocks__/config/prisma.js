// Mock manual de prisma.js para tests
// Jest usará este archivo automáticamente cuando se mockee '../config/prisma.js'
const { jest } = require('@jest/globals');

const prisma = {
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

module.exports = { prisma, default: prisma };

