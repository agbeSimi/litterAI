import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Modelage from "./pages/Modelage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/modelage" element={<Modelage />} />
      </Routes>
    </Router>
  );
}


export default App;