import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageEquation from './pages/Equation/pageEquation.jsx';
import Modelage from "./pages/Equation/Modelage.jsx";
import PratiqueGuide from "./pages/Equation/PratiqueGuide.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PratiqueAutonome from "./pages/Equation/PratiqueAutonome.jsx";
import Accueil from "./pages/Accueil.jsx";
import Credit from "./pages/Credit.jsx";
import ModelageCalculLiteral from "./pages/CalculLiteral/ModelageCalculLiteral.jsx";
import CalculLiteral from "./pages/CalculLiteral/CalculLiteral.jsx";
import IntroductionIA from "./pages/CalculLiteral/introductionIA.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil/>}/>
        <Route path="credit" element={<Credit/>}/>
        <Route path="/equation" element={<PageEquation/>}/>
        <Route path="/modelage" element={<Modelage/>}/>
        <Route path="/calculLiteral" element={<CalculLiteral/>}/>
        <Route path="/introductionIA" element={<IntroductionIA/>}/>
        <Route path="/modelageCalculLiteral" element={<ModelageCalculLiteral/>}/>
        <Route path="/pratiqueGuide" element={<PratiqueGuide/>}/>
        <Route path="/pratiqueAutonome" element={<PratiqueAutonome/>}/>
      </Routes>
    </Router>
  );
}


export default App;