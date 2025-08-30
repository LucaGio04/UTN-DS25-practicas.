import React, { useState } from 'react';

export const AddBookPage = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'ficcion',
    cover: '/img/ficcion-1.jpg' // Imagen placeholder por defecto
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validar que los campos requeridos estén completos
      if (!formData.title.trim() || !formData.author.trim()) {
        throw new Error('Por favor completa todos los campos requeridos');
      }

      // Agregar el libro
      onAddBook(formData);
      
      // Limpiar formulario
      setFormData({
        title: '',
        author: '',
        category: 'ficcion',
        cover: '/img/ficcion-1.jpg'
      });
      
      setMessage('¡Libro agregado exitosamente al catálogo!');
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const coverOptions = [
    { value: '/img/ficcion-1.jpg', label: 'Ficción 1' },
    { value: '/img/ficcion-2.jpg', label: 'Ficción 2' },
    { value: '/img/ficcion-3.jpg', label: 'Ficción 3' },
    { value: '/img/ficcion-4.jpg', label: 'Ficción 4' },
    { value: '/img/ficcion-5.jpg', label: 'Ficción 5' },
    { value: '/img/ciencia-portada.jpg', label: 'Ciencia' },
    { value: '/img/historia-portada.jpg', label: 'Historia' },
    { value: '/img/no-ficcion-portada.jpg', label: 'No Ficción' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Agregar Nuevo Libro</h2>
        <p className="text-gray-600">
          Completa el formulario para agregar un nuevo libro al catálogo de la librería
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg text-center ${
          message.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título del Libro *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el título del libro"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Autor *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el nombre del autor"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ficcion">Ficción</option>
              <option value="ciencia">Ciencia</option>
              <option value="historia">Historia</option>
              <option value="biografias">Biografías</option>
              <option value="no-ficcion">No Ficción</option>
            </select>
          </div>

          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-2">
              Portada
            </label>
            <select
              id="cover"
              name="cover"
              value={formData.cover}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {coverOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vista Previa de la Portada
            </label>
            <div className="flex justify-center">
              <img
                src={formData.cover}
                alt="Vista previa de portada"
                className="w-32 h-40 object-cover rounded-lg border-2 border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isSubmitting ? 'Agregando...' : 'Agregar Libro'}
          </button>
        </div>
      </form>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Información del Formulario</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Los campos marcados con * son obligatorios</li>
          <li>• El libro se agregará automáticamente a la categoría seleccionada</li>
          <li>• Puedes seleccionar una imagen de portada de las opciones disponibles</li>
          <li>• Después de agregar el libro, aparecerá en el catálogo general</li>
        </ul>
      </div>
    </div>
  );
};
