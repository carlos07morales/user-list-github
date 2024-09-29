import Swal from 'sweetalert2';
import services from '../services/githubService';
import { handleError } from '../util/errorHandler';
import UserModel from '../model/modelUser';
import UserDetailModel from '../model/modelUserDetail';

const getUserProfiles = async (query: string): Promise<UserModel[]> => {
  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }

    const users = await services.searchUsersService(query);

    if (!users || !Array.isArray(users)) {
      throw new Error("La respuesta de la API no tiene el formato esperado.");
    }

    if (users.length === 0) {
      Swal.fire({
        title: 'Información',
        text: "No se encontraron perfiles de usuario con el mínimo de búsqueda proporcionado. Por favor, intente de nuevo con otro termino de búsqueda.",
        icon: 'info',
      });
    }

    return users;

  } catch (error: any) {
    console.error("Error en getUserProfiles:", error);

    handleError(error.message || "Error al obtener los perfiles de usuario.");
    return [];
  }
};

const getUserDetails = async (query: string): Promise<UserDetailModel> => {
  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return {} as UserDetailModel;
    }

    const users = await services.getUserDetailsService(query);

    if (!users) {
      throw new Error("La respuesta de la API no tiene el formato esperado.");
    }

    if (!users.name) {
      Swal.fire({
        title: 'Información',
        text: "No se encontraron perfiles de usuario con el mínimo de búsqueda proporcionado. Por favor, intente de nuevo con otro termino de búsqueda.",
        icon: 'info',
      });
    }

    return users;

  } catch (error: any) {
    console.error("Error en getUserProfiles:", error);

    handleError(error.message || "Error al obtener los perfiles de usuario.");
    return {} as UserDetailModel;
  }
};

export default { getUserProfiles, getUserDetails };
