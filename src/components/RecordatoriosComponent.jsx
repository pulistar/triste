import React, { useEffect, useState } from 'react';
import { createRecordatorio, deleteRecordatorio, getAllRecordatorios, updateRecordatorio } from '../api/recordatorio.api';

const RecordatoriosComponent = () => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [recordatorioId, setRecordatorioId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);

  useEffect(() => {
    loadRecordatorios();
  }, []);

  const handleShowDetail = (recordatorioId) => {
    setShowDetail(showDetail === recordatorioId ? null : recordatorioId);
  };

  const loadRecordatorios = () => {
    getAllRecordatorios()
      .then(response => setRecordatorios(response.data))
      .catch(error => console.error(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const nuevoRecordatorio = { titulo, descripcion, fecha, hora };
    createRecordatorio(nuevoRecordatorio)
      .then(() => {
        loadRecordatorios();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (recordatorio) => {
    setRecordatorioId(recordatorio.id);
    setTitulo(recordatorio.titulo);
    setDescripcion(recordatorio.descripcion);
    setFecha(recordatorio.fecha);
    setHora(recordatorio.hora);
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const recordatorioActualizado = { titulo, descripcion, fecha, hora };
    updateRecordatorio(recordatorioId, recordatorioActualizado)
      .then(() => {
        loadRecordatorios();
        resetForm();
        setShowForm(false);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (recordatorioId) => {
    deleteRecordatorio(recordatorioId)
      .then(() => {
        loadRecordatorios();
      })
      .catch(error => console.error(error));
  };

  const resetForm = () => {
    setTitulo('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setRecordatorioId(null);
  };

  return (
    <div id='recordatorios' className="container mx-auto px-4 py-8">
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-extrabold leading-tight md:text-4xl md:mb-5">
          Gestión de <span className="font-bold text-blue-600">Recordatorios</span>
        </h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        >
          {showForm ? "Cerrar Formulario" : "Nuevo Recordatorio"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={recordatorioId ? handleUpdate : handleCreate} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Título:</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Fecha:</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Hora:</label>
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">Descripción:</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                rows="3"
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 focus:bg-blue-700 transition duration-300">Guardar</button>
        </form>
      )}

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {recordatorios.map(recordatorio => (
          <li key={recordatorio.id} className="bg-slate-100 rounded-lg shadow-md p-6 relative z-10">
            <h2 className="text-lg font-semibold mb-2">{recordatorio.titulo}</h2>
            <p className="text-gray-500 mb-2">{recordatorio.fecha} - {recordatorio.hora}</p>
            <p className="mb-4">{recordatorio.descripcion}</p>

            <div className="flex justify-between items-center">
              <button onClick={() => handleShowDetail(recordatorio.id)} className="text-blue-500">
                {showDetail === recordatorio.id ? "Ocultar" : "Ver"}
              </button>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(recordatorio)} className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300">Editar</button>
                <button onClick={() => handleDelete(recordatorio.id)} className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-300">Eliminar</button>
              </div>
            </div>

            {showDetail === recordatorio.id && (
              <div className="mt-4 border-t pt-4">
                <p><strong>Fecha:</strong> {recordatorio.fecha}</p>
                <p><strong>Hora:</strong> {recordatorio.hora}</p>
                <p><strong>Descripción:</strong> {recordatorio.descripcion}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordatoriosComponent;
