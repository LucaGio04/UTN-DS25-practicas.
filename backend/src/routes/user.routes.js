import express from 'express';
import * as userController from '../../src/controllers/user.controller.js';
import { validate } from '../../src/middleware/validation.middleware.js';
import { createUserSchema, updateUserSchema } from '../../src/schemas/user.schema.js';

const router = express.Router();

// GET /api/users - Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// POST /api/users - Crear un nuevo usuario
router.post('/', validate(createUserSchema), userController.createUser);

// PUT /api/users/:id - Actualizar un usuario
router.put('/:id', validate(updateUserSchema), userController.updateUser);

// DELETE /api/users/:id - Eliminar un usuario
router.delete('/:id', userController.deleteUser);

export { router as userRoutes };
