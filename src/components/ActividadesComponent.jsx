import React, { useEffect, useState } from 'react';
import { createActividad, deleteActividad, getAllActividades, updateActividad } from '../api/actividades.api';

const ActividadesComponent = () => {
  const [actividades, setActividades] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [duracion, setDuracion] = useState('');
  const [tipo, setTipo] = useState('ejercicio');
  const [actividadId, setActividadId] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const [showDetail, setShowDetail] = useState(null); 



  useEffect(() => {
    loadActividades();
  }, []);

  const handleShowDetail = (actividadId) => {
    setShowDetail(showDetail === actividadId ? null : actividadId);
  };

  const loadActividades = () => {
    getAllActividades()
      .then(response => setActividades(response.data))
      .catch(error => console.error(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const nuevaActividad = { titulo, descripcion, fecha, hora, duracion, tipo };
    createActividad(nuevaActividad)
      .then(() => {
        loadActividades();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (actividad) => {
    setActividadId(actividad.id);
    setTitulo(actividad.titulo);
    setDescripcion(actividad.descripcion);
    setFecha(actividad.fecha);
    setHora(actividad.hora);
    setDuracion(actividad.duracion);
    setTipo(actividad.tipo);
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const actividadActualizada = { titulo, descripcion, fecha, hora, duracion, tipo };
    updateActividad(actividadId, actividadActualizada)
      .then(() => {
        loadActividades();
        resetForm();
        setShowForm(false);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (actividadId) => {
    deleteActividad(actividadId)
      .then(() => {
        loadActividades();
      })
      .catch(error => console.error(error));
  };

  const resetForm = () => {
    setTitulo('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setDuracion('');
    setTipo('ejercicio');
    setActividadId(null);
  };

  return (

    <div id='actividades' className="container mx-auto px-4 py-8 ">
      <div className='flex justify-between mb-6'>
        <h1 className="text-2xl font-extrabold leading-tight  md:text-4xl md:mb-5">
          Mis <span className="font-bold text-blue-600">Actividades</span>
        </h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className=" bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
          >
          {showForm ? "Cerrar Formulario" : "Nueva Actividad"}
        </button>
      </div>


      {showForm && (
        <form onSubmit={actividadId ? handleUpdate : handleCreate} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Título:</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Fecha:</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Hora:</label>
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Duración:</label>
              <input
                type="text"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">Descripción:</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Tipo:</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="ejercicio">Ejercicio</option>
                <option value="dieta">Dieta</option>
                <option value="hidratacion">Hidratación</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 focus:bg-blue-700 transition duration-300">Guardar</button>
        </form>
      )}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-20">
        {actividades.map(actividad => (
          <li key={actividad.id} className=" rounded-lg bg-slate-100 shadow-md p-6 relative z-10">
    
              <h2 className="text-lg font-semibold mb-2">{actividad.titulo}</h2>
              <p className="text-gray-500 mb-2">{actividad.fecha} - {actividad.hora}</p>
              <p className="mb-4">{actividad.descripcion}</p>


              <div className="flex justify-between items-center">
                    <button onClick={() => handleShowDetail(actividad.id)} className="text-blue-500">
                      {showDetail === actividad.id ? "Ocultar" : "Ver"}
                    </button>
                  
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(actividad)} className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300">Editar</button>
                    <button onClick={() => handleDelete(actividad.id)} className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-300">Eliminar</button>
                  </div>
                
              </div>
              

              {showDetail === actividad.id && (
                <div className="mt-4 border-t pt-4">
                  <p><strong>Fecha:</strong> {actividad.fecha}</p>
                  <p><strong>Hora:</strong> {actividad.hora}</p>
                  <p><strong>Duración:</strong> {actividad.duracion}</p>
                  <p><strong>Tipo:</strong> {actividad.tipo}</p>
                </div>
              )}
         
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActividadesComponent;

