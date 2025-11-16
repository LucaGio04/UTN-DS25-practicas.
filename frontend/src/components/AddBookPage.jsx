import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBooks } from '../hooks/useBooks.js';
import { useAuth } from '../hooks/useAuth.js';
import { bookSchema } from '../schemas/book.schema.js';

export const AddBookPage = () => {
  const { addBook } = useBooks();
  const { isAuthenticated, token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(bookSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      authorName: '',
      authorEmail: '',
      category: 'ficcion',
      cover: '/img/ficcion-1.jpg',
      price: 0,
    },
  });

  const watchedCover = watch('cover');

  const onSubmit = async (data) => {
    try {
      // Verificar que el usuario esté autenticado
      if (!isAuthenticated || !token) {
        alert('⚠️ Debes iniciar sesión para agregar libros. Por favor, haz login primero.');
        return;
      }

      // Agregar el libro usando la API
      await addBook(data);
      
      // Limpiar formulario
      reset();
      
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

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título del Libro *
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el título del libro"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Autor *
            </label>
            <input
              type="text"
              id="authorName"
              {...register('authorName')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.authorName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el nombre completo del autor"
            />
            {errors.authorName && (
              <p className="mt-1 text-sm text-red-600">{errors.authorName.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email del Autor *
            </label>
            <input
              type="email"
              id="authorEmail"
              {...register('authorEmail')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.authorEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="autor@email.com"
            />
            {errors.authorEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.authorEmail.message}</p>
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
              {...register('category')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="ficcion">Ficción</option>
              <option value="ciencia">Ciencia</option>
              <option value="historia">Historia</option>
              <option value="biografias">Biografías</option>
              <option value="no-ficcion">No Ficción</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Precio *
            </label>
            <input
              type="number"
              id="price"
              {...register('price', { valueAsNumber: true })}
              min="0"
              step="1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-2">
              Portada
            </label>
            <select
              id="cover"
              {...register('cover')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cover ? 'border-red-500' : 'border-gray-300'
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
            {errors.cover && (
              <p className="mt-1 text-sm text-red-600">{errors.cover.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vista Previa de la Portada
            </label>
            <div className="flex justify-center">
              <img
                src={watchedCover}
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
          <li>• Ingresa el nombre y email del autor manualmente</li>
          <li>• Si el autor no existe, se creará automáticamente en el sistema</li>
          <li>• El libro se agregará automáticamente a la categoría seleccionada</li>
          <li>• Puedes seleccionar una imagen de portada de las opciones disponibles</li>
          <li>• Después de agregar el libro, aparecerá en el catálogo general</li>
          <li>• El formulario incluye validación en tiempo real con React Hook Form y Yup</li>
        </ul>
      </div>
    </div>
  );
};