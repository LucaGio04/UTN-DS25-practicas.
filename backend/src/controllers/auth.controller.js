import * as authService from '../services/auth.service.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);
    
    res.status(200).json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name },
      message: 'Login exitoso',
    });
  } catch (error) {
    console.error('Error en el login:', error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: error.message,
    });
  }
};
