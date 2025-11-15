import React from 'react';
import { useBookForm } from '../hooks/useForm.js';
import { useBooks } from '../hooks/useBooks.js';
import { useAuth } from '../hooks/useAuth.js';

export const AddBookPage = () => {
  const { addBook } = useBooks();
  const { isAuthenticated, token } = useAuth();
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    hasError,
    getError,
    isValid
  } = useBookForm();

  const onSubmit = async (formData) => {
    try {
      // Verificar que el usuario esté autenticado
      if (!isAuthenticated || !token) {
        alert('⚠️ Debes iniciar sesión para agregar libros. Por favor, haz login primero.');
        return;
      }

      // Agregar el libro usando la API
      await addBook(formData);
      
      // Limpiar formulario
      resetForm();
      
      // Mostrar mensaje de éxito
      alert('¡Libro agregado exitosamente al catálogo!');
      
    } catch (error) {
      console.error('Error adding book:', error);
      if (error.message.includes('Token') || error.message.includes('401') || error.message.includes('403')) {
        alert('⚠️ Tu sesión ha expirado o no estás autenticado. Por favor, inicia sesión nuevamente.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };


  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Agregar Nuevo Libro</h2>
        <p className="text-gray-600">
          Completa el formulario para agregar un nuevo libro al catálogo de la librería
        </p>
        {!isAuthenticated && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ <strong>Nota:</strong> Debes iniciar sesión para agregar libros. 
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'login'; }} className="text-blue-600 hover:underline ml-1">
                Iniciar sesión
              </a>
            </p>
          </div>
        )}
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título del Libro *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                hasError('title') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el título del libro"
            />
            {hasError('title') && (
              <p className="mt-1 text-sm text-red-600">{getError('title')}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Autor *
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={values.authorName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                hasError('authorName') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el nombre completo del autor"
            />
            {hasError('authorName') && (
              <p className="mt-1 text-sm text-red-600">{getError('authorName')}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email del Autor *
            </label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={values.authorEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                hasError('authorEmail') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="autor@email.com"
            />
            {hasError('authorEmail') && (
              <p className="mt-1 text-sm text-red-600">{getError('authorEmail')}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Si el autor no existe, se creará automáticamente
            </p>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                hasError('category') ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="ficcion">Ficción</option>
              <option value="ciencia">Ciencia</option>
              <option value="historia">Historia</option>
              <option value="biografias">Biografías</option>
              <option value="no-ficcion">No Ficción</option>
            </select>
            {hasError('category') && (
              <p className="mt-1 text-sm text-red-600">{getError('category')}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Precio *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              min="0"
              step="1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                hasError('price') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {hasError('price') && (
              <p className="mt-1 text-sm text-red-600">{getError('price')}</p>
            )}
          </div>

          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-2">
              Portada
            </label>
            <select
              id="cover"
              name="cover"
              value={values.cover}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                hasError('cover') ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="/img/ficcion-1.jpg">Ficción 1</option>
              <option value="/img/ficcion-2.jpg">Ficción 2</option>
              <option value="/img/ficcion-3.jpg">Ficción 3</option>
              <option value="/img/ficcion-4.jpg">Ficción 4</option>
              <option value="/img/ficcion-5.jpg">Ficción 5</option>
              <option value="/img/ciencia-portada.jpg">Ciencia</option>
              <option value="/img/historia-portada.jpg">Historia</option>
              <option value="/img/no-ficcion-portada.jpg">No Ficción</option>
            </select>
            {hasError('cover') && (
              <p className="mt-1 text-sm text-red-600">{getError('cover')}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vista Previa de la Portada
            </label>
            <div className="flex justify-center">
              <img
                src={values.cover}
                alt="Vista previa de portada"
                className="w-32 h-40 object-cover rounded-lg border-2 border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || !isValid()}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
              isSubmitting || !isValid()
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
          <li>• Ingresa el nombre y email del autor manualmente</li>
          <li>• Si el autor no existe, se creará automáticamente en el sistema</li>
          <li>• El libro se agregará automáticamente a la categoría seleccionada</li>
          <li>• Puedes seleccionar una imagen de portada de las opciones disponibles</li>
          <li>• Después de agregar el libro, aparecerá en el catálogo general</li>
          <li>• El formulario incluye validación en tiempo real</li>
        </ul>
      </div>
    </div>
  );
};