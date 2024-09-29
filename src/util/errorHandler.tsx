// src/components/ErrorHandler.ts
import axios from 'axios';
import Swal from 'sweetalert2';

// Función para mostrar el error con SweetAlert2
const showErrorAlert = (errorMessage: string) => {
  Swal.fire({
    title: 'Error',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
};

// Manejador global para errores que quieras utilizar en tu aplicación
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Manejo de errores HTTP/Axios
    showErrorAlert(error.response?.data?.message || 'Error en la solicitud');
  } else if (error instanceof Error) {
    // Otros errores (por ejemplo, lanzados manualmente con `throw new Error`)
    showErrorAlert(error.message);
  } else if (typeof error === 'string') {
    showErrorAlert(error);
  } else {
    showErrorAlert('Ocurrió un error desconocido');
  }
};

export { handleError, showErrorAlert };
