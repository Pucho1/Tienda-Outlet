import axios from 'axios';

// Vite expone en el cliente SOLO las variables de entorno que empiezan por VITE_
// Si quieres usar `BASE_URL` en el cliente, renómbrala a `VITE_BASE_URL` o usa
// la variable ya definida `VITE_EXTERNAL_APP_API` en tu `.env`.
// const baseURL = import.meta.env.VITE_EXTERNAL_APP_API || import.meta.env.VITE_BASE_URL || 'http://localhost:3000/';

const newAxs = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // ---> se asegura de que las cookies (como el refreshToken) se envíen en cada request. Es necesario si el refreshToken está en una cookie HTTP-only.
  headers: {
    'Content-Type': 'application/json',
  },
});

export default newAxs;
