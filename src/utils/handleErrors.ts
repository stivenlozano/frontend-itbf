import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const handleErrors = (err: unknown) => {
  if (err instanceof AxiosError) {
    const errorData = err.response?.data;

    if (errorData?.errors) {
      const message = String(Object.values(errorData.errors).flat()[0]);
      toast.error(message);
    } else if (errorData?.status === 500) {
      toast.error(errorData.message || 'Error interno del servidor');
    } else {
      toast.error('Ocurrió un error inesperado');
    }
  } else {
    toast.error('Error desconocido');
  }
};