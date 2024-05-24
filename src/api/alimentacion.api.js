import axios from 'axios';

// Define la URL del backend
const backendURL = 'http://127.0.0.1:8000';

console.log(`API URL: ${backendURL}/api/ali/alimentacion/`);

// Crea una instancia de Axios con la URL base configurada
const alimentacionesApi = axios.create({
  baseURL: `${backendURL}/api/ali/alimentacion/`,
});

// Define las funciones para interactuar con la API
export const getAllAlimentaciones = () => alimentacionesApi.get('/');
export const getAlimentacion = (id) => alimentacionesApi.get(`/${id}`);
export const createAlimentacion = (alimentacion) => alimentacionesApi.post('/', alimentacion);
export const updateAlimentacion = (id, alimentacion) => alimentacionesApi.put(`/${id}/`, alimentacion);
export const deleteAlimentacion = (id) => alimentacionesApi.delete(`/${id}`);
