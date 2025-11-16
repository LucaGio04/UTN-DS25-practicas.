import * as yup from 'yup';

export const bookSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede tener más de 100 caracteres'),
  authorName: yup
    .string()
    .required('El nombre del autor es requerido')
    .min(3, 'El nombre del autor debe tener al menos 3 caracteres')
    .max(100, 'El nombre del autor no puede tener más de 100 caracteres'),
  authorEmail: yup
    .string()
    .required('El email del autor es requerido')
    .email('El email debe ser válido'),
  category: yup
    .string()
    .required('La categoría es requerida')
    .oneOf(['ficcion', 'ciencia', 'historia', 'biografias', 'no-ficcion'], 'Selecciona una categoría válida'),
  cover: yup
    .string()
    .required('La portada es requerida'),
  price: yup
    .number()
    .required('El precio es requerido')
    .min(0, 'El precio debe ser mayor o igual a 0')
    .typeError('El precio debe ser un número válido'),
});

