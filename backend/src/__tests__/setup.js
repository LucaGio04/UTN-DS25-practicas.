// Setup para tests - Configurar variables de entorno
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test?schema=public';
process.env.JWT_SECRET = 'test-secret-key-for-jest';
process.env.NODE_ENV = 'test';

// Mock global de Prisma antes de que se importe cualquier módulo
globalThis.prisma = undefined;

