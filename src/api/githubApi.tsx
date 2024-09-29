import axios from 'axios';
import { handleError } from '../util/errorHandler';
import UserDetailModel from '../model/modelUserDetail';
import UserModel from '../model/modelUser';

const githubApiUrl = process.env.REACT_APP_GITHUB_API_URL;
const githubApiSearchUsersEndpoint = process.env.REACT_APP_GITHUB_API_SEARCH_USERS_ENDPOINT;
const githubApiUser = process.env.REACT_APP_GITHUB_API_USER;

if (!githubApiUrl || !githubApiSearchUsersEndpoint || !githubApiUser) {
  throw new Error("Las variables de entorno REACT_APP_GITHUB_API_URL o REACT_APP_GITHUB_API_SEARCH_USERS_ENDPOINT no están definidas.");
}

const apiAxios = axios.create({
  baseURL: githubApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const searchUsers = async (query: string): Promise<UserModel[]>  => {
  try {
    if (!query) {
      throw new Error("Debe proporcionar un término de búsqueda.");
    }
    console.log(query);

    const response = await apiAxios.get(`${githubApiSearchUsersEndpoint}?q=${query}`);

    if (response.status !== 200) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
    console.log(response);
    return response.data.items;

  } catch (error: any) {
    console.error("Error buscando usuarios en GitHub:", error);
    handleError(error.response ? error.response.data.message : "Error inesperado al buscar usuarios.");
    return [];
  }
};

const getUserDetails = async (username: string): Promise<UserDetailModel> => {
  try {
    if (!username) {
      throw new Error("Debe proporcionar un término de búsqueda.");
    }
    const response = await apiAxios.get(`${githubApiUrl}${githubApiUser}${username}`);
    if (response.status !== 200) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error buscando usuarios en GitHub:", error);
    handleError(`Error fetching details for user ${username}: ${error}`);
    return {} as UserDetailModel;
  }
};


export default {
  searchUsers,
  getUserDetails
};
