import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ActividadesComponent from './components/ActividadesComponent';
import AlimentacionComponent from './components/AlimentacionComponent';
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import RecordatoriosComponent from './components/RecordatoriosComponent';


function App() {
  return (
    <div className="min-h-screen ">  
          
      <Router>
        <div>
          <header className="sticky top-0 z-80">
            <Menu />
          </header>
          <main>
            <Routes>
              
              <Route path="/" element={<Inicio />}  />
              <Route path="/actividades" element={<ActividadesComponent />} />
              <Route path="/alimentacion" element={<AlimentacionComponent />} />
              <Route path="/recordatorios" element={<RecordatoriosComponent />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
