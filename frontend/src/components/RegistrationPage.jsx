import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';

export const RegistrationPage = ({ setCurrentPage }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    email: '',
    password: '',
    sexo: '',
    temaFavorito: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Mapear los datos del formulario a lo que espera el backend
      const userData = {
        email: formData.email,
        name: `${formData.nombre} ${formData.apellido}`.trim(), // Combinar nombre y apellido
        password: formData.password,
      };

      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar usuario');
      }

      // Hacer login automáticamente después del registro
      const loginSuccess = await login(formData.email, formData.password);
      if (loginSuccess) {
        setIsSubmitted(true);
        console.log('Usuario registrado y logueado exitosamente:', data);
        // Redirigir a inicio después de un breve delay
        setTimeout(() => {
          if (setCurrentPage) {
            setCurrentPage('inicio');
          }
        }, 2000);
      } else {
        // Si el login falla, solo mostrar el mensaje de registro exitoso
        setIsSubmitted(true);
        console.log('Usuario registrado exitosamente:', data);
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
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                email: '',
                password: '',
                sexo: '',
                temaFavorito: ''
              });
            }}
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Tu nombre"
            />
          </div>
          
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
              Apellido *
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              required
              value={formData.apellido}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Tu apellido"
            />
          </div>
        </div>

        <div>
          <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Nacimiento *
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            required
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Mínimo 8 caracteres"
            minLength="8"
          />
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
                    name="sexo"
                    type="radio"
                    value={option.id}
                    required
                    checked={formData.sexo === option.id}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={`sexo-${option.id}`} className="ml-3 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <label htmlFor="temaFavorito" className="block text-sm font-medium text-gray-700 mb-2">
            Tema Favorito
          </label>
          <select
            id="temaFavorito"
            name="temaFavorito"
            value={formData.temaFavorito}
            onChange={handleInputChange}
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Completar Registro
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