import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  apellido: yup
    .string()
    .required('El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  fechaNacimiento: yup
    .date()
    .required('La fecha de nacimiento es requerida')
    .max(new Date(), 'La fecha de nacimiento no puede ser futura')
    .typeError('La fecha de nacimiento debe ser válida'),
  email: yup
    .string()
    .required('El email es requerido')
    .email('El email debe ser válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    ),
  sexo: yup
    .string()
    .required('El sexo es requerido')
    .oneOf(['masculino', 'femenino', 'otro'], 'Selecciona una opción válida'),
  temaFavorito: yup
    .string()
    .notRequired(),
});

