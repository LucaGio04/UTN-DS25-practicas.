import React, { useState } from 'react';

export const RegistrationPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Aquí normalmente se enviarían los datos a un servidor
    console.log('Datos del formulario:', formData);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Registro Exitoso!</h2>
        <p className="text-gray-600 mb-6">
          Gracias por registrarte en Librería El Saber. Te hemos enviado un email de confirmación.
        </p>
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