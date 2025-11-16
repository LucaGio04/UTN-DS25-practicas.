import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../hooks/useAuth.js';
import { loginSchema } from '../schemas/login.schema.js';

export const LoginPage = ({ setCurrentPage }) => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur', // Validar al perder el foco
  });

  const onSubmit = async (data) => {
    setLoginError(null);
    try {
      const success = await login(data.email, data.password);
      console.log('Resultado del login:', success);
      
      if (success) {
        // Verificar que el token se haya guardado correctamente
        const token = localStorage.getItem('jwtToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          console.log('Login exitoso - Datos verificados:', {
            token: !!token,
            user: parsedUser,
            tieneNombre: !!parsedUser?.name,
            nombre: parsedUser?.name || 'NO TIENE'
          });
          
          // Esperar un momento para que React actualice el estado
          // Esto permite que el componente App.jsx detecte el cambio de estado
          await new Promise(resolve => setTimeout(resolve, 150));
          
          // Redirigir después de que el estado se haya actualizado
          setCurrentPage('inicio');
        } else {
          setLoginError('Error: El token no se guardó correctamente. Intenta nuevamente.');
        }
      } else {
        setLoginError('Error en el login. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error during login submission:', error);
      setLoginError(error.message || 'Ocurrió un error inesperado.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 p-3 rounded-full mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
          <p className="text-gray-600 text-sm">Ingresa tus credenciales para acceder</p>
        </div>
        
        {loginError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <div>
                <strong className="font-bold block">Error de autenticación</strong>
                <span className="text-sm">{loginError}</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">📧</span>
              </div>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="tu@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <span className="mr-1">❌</span>
                {errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔒</span>
              </div>
              <input
                type="password"
                id="password"
                {...register('password')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <span className="mr-1">❌</span>
                {errors.password.message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('registros');
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
