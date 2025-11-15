import { useState, useCallback } from 'react';

/**
 * Custom Hook: useForm
 * 
 * Este hook personalizado proporciona una solución completa para el manejo de formularios,
 * incluyendo validación, manejo de errores y estados de envío.
 * 
 * Conceptos aplicados:
 * - Custom Hook: Lógica reutilizable para formularios
 * - useState: Manejo de estados de formulario (valores, errores, touched, isSubmitting)
 * - useCallback: Optimización de funciones de manejo
 * - Validación: Sistema flexible de reglas de validación
 * 
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Object} validationRules - Reglas de validación para cada campo
 * @returns {Object} Objeto con valores, errores, funciones de manejo y utilidades
 */
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Función para manejar cambios en los inputs
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Función para manejar el evento blur
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validar campo cuando pierde el foco
    validateField(name, values[name]);
  }, [values]);

  // Función para validar un campo específico
  const validateField = useCallback((fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) return true;

    let error = '';

    // Validación requerida
    if (rule.required && (!value || value.toString().trim() === '')) {
      error = rule.requiredMessage || `${fieldName} es requerido`;
    }
    // Validación de longitud mínima
    else if (rule.minLength && value && value.length < rule.minLength) {
      error = rule.minLengthMessage || `${fieldName} debe tener al menos ${rule.minLength} caracteres`;
    }
    // Validación de longitud máxima
    else if (rule.maxLength && value && value.length > rule.maxLength) {
      error = rule.maxLengthMessage || `${fieldName} no puede tener más de ${rule.maxLength} caracteres`;
    }
    // Validación de email
    else if (rule.email && value && !/\S+@\S+\.\S+/.test(value)) {
      error = rule.emailMessage || 'Email inválido';
    }
    // Validación personalizada
    else if (rule.custom && typeof rule.custom === 'function') {
      const customError = rule.custom(value);
      if (customError) {
        error = customError;
      }
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return !error;
  }, [validationRules]);

  // Función para validar todo el formulario
  const validateForm = useCallback(() => {
    const fieldNames = Object.keys(validationRules);
    let isValid = true;

    fieldNames.forEach(fieldName => {
      const fieldValid = validateField(fieldName, values[fieldName]);
      if (!fieldValid) {
        isValid = false;
      }
    });

    return isValid;
  }, [values, validateField, validationRules]);

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    setTouched({}); // Marcar todos los campos como tocados

    try {
      const isValid = validateForm();
      if (!isValid) {
        throw new Error('El formulario contiene errores');
      }

      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm]);

  // Función para resetear el formulario
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Función para establecer valores manualmente
  const setFieldValue = useCallback((fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  // Función para establecer errores manualmente
  const setFieldError = useCallback((fieldName, error) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);

  // Función para verificar si un campo tiene error
  const hasError = useCallback((fieldName) => {
    return touched[fieldName] && errors[fieldName];
  }, [touched, errors]);

  // Función para obtener el mensaje de error de un campo
  const getError = useCallback((fieldName) => {
    return hasError(fieldName) ? errors[fieldName] : '';
  }, [hasError, errors]);

  // Función para verificar si el formulario es válido
  const isValid = useCallback(() => {
    return Object.keys(errors).length === 0 || Object.values(errors).every(error => !error);
  }, [errors]);

  return {
    // Valores y estado
    values,
    errors,
    isSubmitting,
    touched,
    
    // Funciones de manejo
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    
    // Funciones de utilidad
    setFieldValue,
    setFieldError,
    hasError,
    getError,
    isValid,
    validateForm,
    validateField
  };
};

/**
 * Custom Hook: useBookForm
 * 
 * Hook especializado para formularios de libros que utiliza useForm
 * con valores iniciales y reglas de validación predefinidas.
 * 
 * Conceptos aplicados:
 * - Custom Hook: Hook especializado que extiende useForm
 * - Composición de Hooks: Reutiliza useForm con configuración específica
 * - Validación: Reglas de validación específicas para libros
 * 
 * @returns {Object} Objeto con todas las funciones y estados de useForm configurados para libros
 */
export const useBookForm = () => {
  const initialValues = {
    title: '',
    author: '',
    category: 'ficcion',
    cover: '/img/ficcion-1.jpg'
  };

  const validationRules = {
    title: {
      required: true,
      requiredMessage: 'El título es requerido',
      minLength: 2,
      minLengthMessage: 'El título debe tener al menos 2 caracteres',
      maxLength: 100,
      maxLengthMessage: 'El título no puede tener más de 100 caracteres'
    },
    author: {
      required: true,
      requiredMessage: 'El autor es requerido',
      minLength: 2,
      minLengthMessage: 'El autor debe tener al menos 2 caracteres',
      maxLength: 50,
      maxLengthMessage: 'El autor no puede tener más de 50 caracteres'
    },
    category: {
      required: true,
      requiredMessage: 'La categoría es requerida'
    },
    cover: {
      required: true,
      requiredMessage: 'La portada es requerida'
    }
  };

  return useForm(initialValues, validationRules);
};
