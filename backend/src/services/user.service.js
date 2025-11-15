import { prisma } from '../config/prisma.js';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt'; // Importar bcrypt

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'asc'
      },
      include: {
        books: true
      }
    });
    return users;
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw new Error('Error al obtener los usuarios');
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        books: true
      }
    });

    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      error.code = 'P2025';
      throw error;
    }

    return user;
  } catch (error) {
    if (error.code === 'P2025') {
      throw error;
    }
    console.error('Error in getUserById:', error);
    throw new Error('Error al obtener el usuario');
  }
};

export const createUser = async (data) => {
  try {
    // Hash de la contraseña antes de crear el usuario
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 es el saltRounds
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const errorMessage = new Error('Ya existe un usuario con este email');
        errorMessage.statusCode = 409;
        errorMessage.code = 'P2002';
        throw errorMessage;
      }
    }
    console.error('Error in createUser:', error);
    throw new Error('Error al crear el usuario');
  }
};

export const updateUser = async (id, updateData) => {
  try {
    // Si se proporciona una nueva contraseña, hacerle hash
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        books: true
      }
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const notFoundError = new Error('Usuario no encontrado');
      notFoundError.statusCode = 404;
      notFoundError.code = 'P2025';
      throw notFoundError;
    }
    console.error('Error in updateUser:', error);
    throw new Error('Error al actualizar el usuario');
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const notFoundError = new Error('Usuario no encontrado');
      notFoundError.statusCode = 404;
      notFoundError.code = 'P2025';
      throw notFoundError;
    }
    console.error('Error in deleteUser:', error);
    throw new Error('Error al eliminar el usuario');
  }
};
