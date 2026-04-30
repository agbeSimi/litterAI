import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Modelage from "./pages/Modelage.jsx";
import PratiqueGuide from "./pages/PratiqueGuide.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PratiqueAutonome from "./pages/PratiqueAutonome.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/modelage" element={<Modelage />} />
        <Route path="/pratiqueGuide" element={<PratiqueGuide/>}/>
        <Route path="/pratiqueAutonome" element={<PratiqueAutonome/>}/>
      </Routes>
    </Router>
  );
}


export default App;