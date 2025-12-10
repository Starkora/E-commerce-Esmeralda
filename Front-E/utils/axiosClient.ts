import axios from 'axios';

// Crear instancia de axios configurada para Sanctum
// En desarrollo, usar rutas relativas para aprovechar el proxy de Next.js
// En producción, usar la URL completa del backend
const axiosClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token XSRF en cada request
axiosClient.interceptors.request.use((config) => {
  // Obtener el token XSRF de las cookies
  const xsrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  
  return config;
});

export default axiosClient;
