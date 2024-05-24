import React, { useEffect, useState } from 'react';
import { createAlimentacion, deleteAlimentacion, getAllAlimentaciones, updateAlimentacion } from '../api/alimentacion.api';

const AlimentacionComponent = () => {
  const [alimentaciones, setAlimentaciones] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [tipoComida, setTipoComida] = useState('desayuno');
  const [calorias, setCalorias] = useState('');
  const [alimentacionId, setAlimentacionId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);

  useEffect(() => {
    loadAlimentaciones();
  }, []);

  const handleShowDetail = (alimentacionId) => {
    setShowDetail(showDetail === alimentacionId ? null : alimentacionId);
  };

  const loadAlimentaciones = () => {
    getAllAlimentaciones()
      .then(response => setAlimentaciones(response.data))
      .catch(error => console.error(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const nuevaAlimentacion = { nombre, descripcion, fecha, hora, tipo_comida: tipoComida, calorias };
    createAlimentacion(nuevaAlimentacion)
      .then(() => {
        loadAlimentaciones();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (alimentacion) => {
    setAlimentacionId(alimentacion.id);
    setNombre(alimentacion.nombre);
    setDescripcion(alimentacion.descripcion);
    setFecha(alimentacion.fecha);
    setHora(alimentacion.hora);
    setTipoComida(alimentacion.tipo_comida);
    setCalorias(alimentacion.calorias);
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const alimentacionActualizada = { nombre, descripcion, fecha, hora, tipo_comida: tipoComida, calorias };
    updateAlimentacion(alimentacionId, alimentacionActualizada)
      .then(() => {
        loadAlimentaciones();
        resetForm();
        setShowForm(false);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (alimentacionId) => {
    deleteAlimentacion(alimentacionId)
      .then(() => {
        loadAlimentaciones();
      })
      .catch(error => console.error(error));
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setTipoComida('desayuno');
    setCalorias('');
    setAlimentacionId(null);
  };

  return (
    <div id='alimentacion' className="container mx-auto px-4 py-8">
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-extrabold leading-tight md:text-4xl md:mb-5">
          Mis <span className="font-bold text-blue-600">Alimentación</span>
        </h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        >
          {showForm ? "Cerrar Formulario" : "Nueva Alimentación"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={alimentacionId ? handleUpdate : handleCreate} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
              <label className="block text-sm font-semibold mb-1">Calorías:</label>
              <input
                type="number"
                value={calorias}
                onChange={(e) => setCalorias(e.target.value)}
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
              <label className="block text-sm font-semibold mb-1">Tipo de Comida:</label>
              <select
                value={tipoComida}
                onChange={(e) => setTipoComida(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="cena">Cena</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 focus:bg-blue-700 transition duration-300">Guardar</button>
        </form>
      )}

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-20">
        {alimentaciones.map(alimentacion => (
          <li key={alimentacion.id} className="bg-slate-100 rounded-lg shadow-md p-6 relative z-10">
            <h2 className="text-lg font-semibold mb-2">{alimentacion.nombre}</h2>
            <p className="text-gray-500 mb-2">{alimentacion.fecha} - {alimentacion.hora}</p>
            <p className="mb-4">{alimentacion.descripcion}</p>

            <div className="flex justify-between items-center">
              <button onClick={() => handleShowDetail(alimentacion.id)} className="text-blue-500">
                {showDetail === alimentacion.id ? "Ocultar" : "Ver"}
              </button>

              <div className="flex space-x-2">
                <button onClick={() => handleEdit(alimentacion)} className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300">Editar</button>
                <button onClick={() => handleDelete(alimentacion.id)} className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-300">Eliminar</button>
              </div>
            </div>

            {showDetail === alimentacion.id && (
              <div className="mt-4 border-t pt-4">
                <p><strong>Fecha:</strong> {alimentacion.fecha}</p>
                <p><strong>Hora:</strong> {alimentacion.hora}</p>
                <p><strong>Calorías:</strong> {alimentacion.calorias}</p>
                <p><strong>Tipo de Comida:</strong> {alimentacion.tipo_comida.charAt(0).toUpperCase() + alimentacion.tipo_comida.slice(1)}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlimentacionComponent
