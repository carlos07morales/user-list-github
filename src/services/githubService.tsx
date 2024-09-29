import api from '../api/githubApi';
import UserModel from '../model/modelUser';
import UserDetailModel from '../model/modelUserDetail';
import { handleError } from '../util/errorHandler';

const searchUsersService = async (query: string): Promise<UserModel[]> => {
  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      throw new Error("El término de búsqueda no es válido. Debe ser una cadena no vacía.");
    }

    const users = await api.searchUsers(query);

    if (!users || users.length === 0) {
      throw new Error("No se encontraron usuarios con el término de búsqueda proporcionado.");
    }

    return users;

  } catch (error : any) {
    console.error("Error en searchUsersService:", error);
    handleError(error.message || "Error al buscar usuarios en el servicio.");
    return [];
  }
};

const getUserDetailsService = async (query: string): Promise<UserDetailModel> => {
  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      throw new Error("El término de búsqueda no es válido. Debe ser una cadena no vacía.");
    }

    const users = await api.getUserDetails(query);

    if (!users) {
      throw new Error("No se encontraron usuarios con el término de búsqueda proporcionado.");
    }

    return users;

  } catch (error : any) {
    console.error("Error en searchUsersService:", error);
    handleError(error.message || "Error al buscar usuarios en el servicio.");
    return {} as UserDetailModel;
  }
};

export default {
  searchUsersService,
  getUserDetailsService
};
