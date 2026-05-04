import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageEquation from './pages/Equation/pageEquation.jsx';
import Modelage from "./pages/Equation/Modelage.jsx";
import PratiqueGuide from "./pages/Equation/PratiqueGuide.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PratiqueAutonome from "./pages/Equation/PratiqueAutonome.jsx";
import Accueil from "./pages/Accueil.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/equation" element={<PageEquation />} />
        <Route path="/modelage" element={<Modelage />} />
        <Route path="/pratiqueGuide" element={<PratiqueGuide/>}/>
        <Route path="/pratiqueAutonome" element={<PratiqueAutonome/>}/>
      </Routes>
    </Router>
  );
}


export default App;