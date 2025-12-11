import axios from 'axios';
import { useAuthStore } from '../store/authZustandStore';


/**
 * * * Axios instance for the external app
 * * * This instance is used to make requests to the external app API.
 */
const axs = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: 'https://dummyjson.com/',
  withCredentials: false, // ---> se asegura de que las cookies (como el refreshToken) se envíen en cada request. Es necesario si el refreshToken está en una cookie HTTP-only.
  headers: {
    'Content-Type': 'application/json',
  },
});

  let isRefreshing = false;
  let failedQueue: ((token: string) => void)[] = [];

/**
 * * Interceptor to add the token to the request headers
 */
axs.interceptors.request.use(
  async (config) => {

    const token = useAuthStore.getState().accessToken; // ---> se obtiene el token del store de Zustand. Si no hay token, no se añade el header.
    // const token = sessionStorage.getItem('accessToken');

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  // Haz algo con el error de la petición
  (error) => Promise.reject(error)
);


/**
 * * Interceptor to handle 401 errors and refresh the token
 * * This interceptor is used to handle 401 errors and refresh the token if it is expired.
 */
axs.interceptors.response.use(
  // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función 
  // Haz algo con los datos de la respuesta
  (response) => response,

  // Cualquier código de estado que este fuera del rango de 2xx causa la ejecución de esta función 
  // Haz algo con los datos de la respuesta
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y la request original no ha sido reintentada, intenta refrescar el token.
    if (error.response?.status === 401 && !originalRequest._retry) {

      //Solo una vez se inicia el proceso de refresco (para evitar llamadas duplicadas).
      //Marca la request original con _retry para no entrar en bucle.
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        const refreshToken = sessionStorage.getItem('refreshToken');

        try {
          //-----> como el refreshToken está en una cookie HTTP-only, no se puede acceder a él desde el cliente. Por lo tanto, no se puede enviar el refreshToken en la petición.
          //-----> En su lugar, se envía la cookie automáticamente con la opción withCredentials: true.
          // const res = await axios.post('https://dummyjson.com/auth/refresh', {}, { withCredentials: true });

         
          const res = await axios.post('https://dummyjson.com/auth/refresh', { refreshToken });

          const newAccessToken = res.data.accessToken;

          // Recibe el nuevo accessToken y lo guarda en el contexto o la store de zustand segun se estipule.
          useAuthStore.getState().setAccessToken(newAccessToken);

          // Actualiza el header por defecto de Axios para futuras requests.
          // Marca que terminó el proceso de refresco.
          axs.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          isRefreshing = false;

          //Ejecuta todas las funciones guardadas en la cola (failedQueue) que estaban esperando el nuevo token.
          //Limpia la cola.
          failedQueue.forEach((cb) => cb(newAccessToken));
          failedQueue = [];
          
          //Vuelve a hacer la request original con el nuevo token.
          return axs(originalRequest);

        } catch (err) {
          //Si el refresh falla (token caducado o inválido):
            // Limpia el estado (logout).
            // Cancela la request.
            // Devuelve el error.
          console.log('error en el interceptor', err);
          useAuthStore.getState().logout(); // logout con zustand
          // axs.defaults.headers.Authorization = undefined; // Limpia el header de Axios.

          isRefreshing = false;
          return Promise.reject(err);
        };
      };

      return new Promise((resolve) => {
        failedQueue.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axs(originalRequest));
        });
      });
    };

    return Promise.reject(error);
  }
);

// export const addToken = (token: string) => {
//   ax.defaults.headers.Authorization = `Bearer ${token}`;
// };

// export const removeBearerToken = () => {
//   delete ax.defaults.headers.Authorization;
// };


export default axs;
