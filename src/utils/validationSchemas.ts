import * as yup from 'yup';
import type { HotelFormData, RoomConfigurationSchema } from '../types';

export const hotelSchema: yup.ObjectSchema<HotelFormData> = yup.object({
  nombre: yup.string().required('El nombre es requerido'),
  direccion: yup.string().required('La dirección es requerida'),
  ciudad: yup.string().required('La ciudad es requerida'),
  nit: yup.number().min(9, 'El nit debe tener 9 dígitos').required('El nit es requerido'),
  max_habitaciones: yup.number().min(1, 'La cantidad de habitaciones debe ser mínimo 1').required('La cantidad de habitaciones es requerida'),
});

export const roomSchema: yup.ObjectSchema<RoomConfigurationSchema> = yup.object({
  room_type: yup.number().min(1).required('El tipo de habitación es requerido'),
  accommodation: yup.number().min(1).required('La acomodación es requerida'),
  amount: yup.number().min(1, 'La cantidad de habitaciones debe ser mínimo 1').required('La cantidad es requerida'),
});