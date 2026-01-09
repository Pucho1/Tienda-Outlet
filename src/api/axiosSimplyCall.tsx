import axios from 'axios';
import { useAuthStore } from '../store/authZustandStore';

// Vite expone en el cliente SOLO las variables de entorno que empiezan por VITE_
// Si quieres usar `BASE_URL` en el cliente, renómbrala a `VITE_BASE_URL` o usa
// la variable ya definida `VITE_EXTERNAL_APP_API` en tu `.env`.
// const baseURL = import.meta.env.VITE_EXTERNAL_APP_API || import.meta.env.VITE_BASE_URL || 'http://localhost:3000/';

const newAxs = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false, // ---> se asegura de que las cookies (como el refreshToken) se envíen en cada request. Es necesario si el refreshToken está en una cookie HTTP-only.
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * * Interceptor to add the token to the request headers
 */
newAxs.interceptors.request.use(
  async (config) => {

    const token = useAuthStore.getState().accessToken; // ---> se obtiene el token del store de Zustand. Si no hay token, no se añade el header.
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  // Haz algo con el error de la petición
  (error) => Promise.reject(error)
);

export default newAxs;
