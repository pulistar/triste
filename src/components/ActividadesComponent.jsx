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
    <div id='actividades' className="container mx-auto px-4 py-8">
      <div className='flex justify-between mb-6'>
        <h1 className="text-2xl font-extrabold leading-tight md:text-4xl md:mb-5">
          Mis <span className="font-bold text-blue-600">Actividades</span>
        </h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        >
          {showForm ? "Cerrar Formulario" : "Nueva Actividad"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={actividadId ? handleUpdate : handleCreate} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form inputs */}
          </div>
          <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 focus:bg-blue-700 transition duration-300">Guardar</button>
        </form>
      )}

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-20">
        {actividades.map(actividad => (
          <li key={actividad.id} className="rounded-lg bg-slate-100 shadow-md p-6 relative z-10">
            {/* Actividad details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActividadesComponent;
