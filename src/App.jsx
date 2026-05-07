import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageEquation from './pages/Equation/pageEquation.jsx';
import Modelage1 from "./pages/Equation/Modelage/Modelage1.jsx";
import PratiqueGuide1 from "./pages/Equation/pratiqueGuide/PratiqueGuide1.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PratiqueAutonome1 from "./pages/Equation/pratiqueAutonome/PratiqueAutonome1.jsx";
import Accueil from "./pages/Accueil.jsx";
import Credit from "./pages/Credit.jsx";
import ModelageCalculLiteralPhase2 from "./pages/CalculLiteral/modelage/ModelageCalculLiteralPhase2.jsx";
import CalculLiteral from "./pages/CalculLiteral/CalculLiteral.jsx";
import IntroductionIA from "./pages/CalculLiteral/introductionIA.jsx";
import PratiqueGuidePhase2CL from "./pages/CalculLiteral/pratiqueGuide/pratiqueGuidePhase2CL.jsx";
import ModelageCalculLiteralPhase1 from "./pages/CalculLiteral/modelage/ModelageCalculLiteralPhase1.jsx";
import ModelageCalculLiteralPhase3 from "./pages/CalculLiteral/modelage/ModelageCalculLiteralPhase3.jsx";
import PratiqueGuidePhase3CL from "./pages/CalculLiteral/pratiqueGuide/pratiqueGuidePhase3CL.jsx";
import PratiqueAutonomeCL1 from "./pages/CalculLiteral/pratiqueAutonome/PratiqueAutonomeCL1.jsx";
import PratiqueGuidePhase1CL from "./pages/CalculLiteral/pratiqueGuide/pratiqueGuidePhase1CL.jsx";
import PratiqueAutonomeCL2 from "./pages/CalculLiteral/pratiqueAutonome/PratiqueAutonomeCL2.jsx";
import PratiqueAutonomeCL3 from "./pages/CalculLiteral/pratiqueAutonome/PratiqueAutonomeCL3.jsx";
import Modelage2 from "./pages/Equation/Modelage/Modelage2.jsx";
import PratiqueGuide2 from "./pages/Equation/pratiqueGuide/PratiqueGuide2.jsx";
import PratiqueAutonome2 from "./pages/Equation/pratiqueAutonome/PratiqueAutonome2.jsx";
import PratiqueGuide3 from "./pages/Equation/pratiqueGuide/PratiqueGuide3.jsx";
import Modelage3 from "./pages/Equation/Modelage/Modelage 3.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil/>}/>
        <Route path="credit" element={<Credit/>}/>
        <Route path="/equation" element={<PageEquation/>}/>
        <Route path="/modelage" element={<Modelage1/>}/>
        <Route path="/modelage2" element={<Modelage2/>}/>
        <Route path="/modelage3" element={<Modelage3/>}/>


        <Route path="/calculLiteral" element={<CalculLiteral/>}/>
        <Route path="/introductionIA" element={<IntroductionIA/>}/>
        <Route path="/ModelageCalculLiteralPhase1" element={<ModelageCalculLiteralPhase1/>}/>
        <Route path="/modelageCalculLiteralPhase2" element={<ModelageCalculLiteralPhase2/>}/>
        <Route path="/modelageCalculLiteralPhase3" element={<ModelageCalculLiteralPhase3/>}/>
        <Route path="/PratiqueAutonomeCL1" element={<PratiqueAutonomeCL1/>}/>
        <Route path="/PratiqueAutonomeCL2" element={<PratiqueAutonomeCL2/>}/>
        <Route path="/PratiqueAutonomeCL3" element={<PratiqueAutonomeCL3/>}/>
        <Route path="/PratiqueGuidePhase1CL" element={<PratiqueGuidePhase1CL/>}/>
        <Route path="/pratiqueGuidePhase2CL" element={<PratiqueGuidePhase2CL/>}/>
        <Route path="/pratiqueGuidePhase3CL" element={<PratiqueGuidePhase3CL/>}/>
        <Route path="/pratiqueGuide" element={<PratiqueGuide1/>}/>
        <Route path="/pratiqueGuide2" element={<PratiqueGuide2/>}/>
        <Route path="/pratiqueGuide3" element={<PratiqueGuide3/>}/>

        <Route path="/pratiqueAutonome" element={<PratiqueAutonome1/>}/>
        <Route path="/pratiqueAutonome2" element={<PratiqueAutonome2/>}/>
      </Routes>
    </Router>
  );
}


export default App;