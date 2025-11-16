import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../hooks/useAuth.js';
import { registrationSchema } from '../schemas/registration.schema.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const RegistrationPage = ({ setCurrentPage }) => {
  const { login } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      // Mapear los datos del formulario a lo que espera el backend
      const userData = {
        email: data.email,
        name: `${data.nombre} ${data.apellido}`.trim(), // Combinar nombre y apellido
        password: data.password,
      };

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Error al registrar usuario');
      }

      // Hacer login automáticamente después del registro
      const loginSuccess = await login(data.email, data.password);
      if (loginSuccess) {
        setIsSubmitted(true);
        console.log('Usuario registrado y logueado exitosamente:', responseData);
        // Redirigir a inicio después de un breve delay
        setTimeout(() => {
          if (setCurrentPage) {
            setCurrentPage('inicio');
          }
        }, 2000);
      } else {
        // Si el login falla, solo mostrar el mensaje de registro exitoso
        setIsSubmitted(true);
        console.log('Usuario registrado exitosamente:', responseData);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Registro Exitoso!</h2>
        <p className="text-gray-600 mb-6">
          Gracias por registrarte en Librería El Saber. Has sido autenticado automáticamente.
          {setCurrentPage && (
            <span className="block mt-2 text-sm text-blue-600">
              Redirigiendo a la página principal...
            </span>
          )}
        </p>
        {!setCurrentPage && (
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Registrar Otro Usuario
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Formulario de Registro</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              {...register('nombre')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
              Apellido *
            </label>
            <input
              type="text"
              id="apellido"
              {...register('apellido')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.apellido ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Tu apellido"
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs mt-1">{errors.apellido.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Nacimiento *
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            {...register('fechaNacimiento')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.fechaNacimiento ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.fechaNacimiento && (
            <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña *
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Mínimo 8 caracteres"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-3">Sexo *</legend>
            <div className="space-y-3">
              {[
                { id: 'masculino', label: 'Masculino' },
                { id: 'femenino', label: 'Femenino' },
                { id: 'otro', label: 'Otro' }
              ].map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`sexo-${option.id}`}
                    type="radio"
                    value={option.id}
                    {...register('sexo')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={`sexo-${option.id}`} className="ml-3 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.sexo && (
              <p className="text-red-500 text-xs mt-1">{errors.sexo.message}</p>
            )}
          </fieldset>
        </div>

        <div>
          <label htmlFor="temaFavorito" className="block text-sm font-medium text-gray-700 mb-2">
            Tema Favorito
          </label>
          <select
            id="temaFavorito"
            {...register('temaFavorito')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Selecciona un tema</option>
            <option value="ficcion">Ficción</option>
            <option value="ciencia">Ciencia</option>
            <option value="historia">Historia</option>
            <option value="biografias">Biografías</option>
            <option value="arte">Arte</option>
            <option value="filosofia">Filosofía</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Registrando...' : 'Completar Registro'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Al registrarte, aceptas nuestros{' '}
          <a href="#" className="text-blue-600 hover:underline">Términos y Condiciones</a>
        </p>
      </div>
    </div>
  );
}; 