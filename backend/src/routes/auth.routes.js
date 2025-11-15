import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { loginSchema } from '../schemas/auth.schema.js';

const router = express.Router();

// POST /api/auth/login - Autenticar un usuario
router.post('/login', validate(loginSchema), authController.login);

export { router as authRoutes };
