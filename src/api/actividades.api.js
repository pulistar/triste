// actividades.api.js

import axios from 'axios';

// Define la URL del backend
const backendURL = 'https://lively-bay-02271bb0f.5.azurestaticapps.net'; // Nueva URL proporcionada en el error 404

console.log(`API URL: ${backendURL}/actividades`);

// Crea una instancia de Axios con la URL base configurada
const actividadesApi = axios.create({
  baseURL: `${backendURL}/actividades`, // Actualización de la URL base
});

// Define las funciones para interactuar con la API
export const getAllActividades = () => actividadesApi.get('/');
export const getActividad = (id) => actividadesApi.get(`/${id}`);
export const createActividad = (actividad) => actividadesApi.post('/', actividad);
export const updateActividad = (id, actividad) => actividadesApi.put(`/${id}/`, actividad);
export const deleteActividad = (id) => actividadesApi.delete(`/${id}`);
