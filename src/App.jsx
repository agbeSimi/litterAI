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
import PratiqueAutonome3 from "./pages/Equation/pratiqueAutonome/PratiqueAutonome3.jsx";
import PratiqueAutonomeInteractif from "./pages/exoInteractif/pratiqueAutonome/pratiqueAutonomeInteractif.jsx";
import ModelageInteractif from "./pages/exoInteractif/modelage/modelageInteractif.jsx";
import PratiqueGuideInteractif from "./pages/exoInteractif/pratiqueGuideInteractif/pratiqueGuideInteractif.jsx";
import Contact from "./pages/Contact.jsx";
import IntroductionIAEL from "./pages/expressionLittérale/introductionIAEL.jsx";
import ModelageExpressionLitteral from "./pages/expressionLittérale/Modelage/ModelageExpressionLittéral.jsx";
import {PratiqueGuideEL} from "./pages/expressionLittérale/PratiqueGuide/pratiqueGuideEL.jsx";
import PratiqueAutonomeEL from "./pages/expressionLittérale/PratiqueAutonome/pratiqueAutonomeEL.jsx";
import IntroductionEgalite from "./pages/testerEgalite/introductionEgalite.jsx";
import ModelageTesterEgalite1 from "./pages/testerEgalite/Modelage/ModelageTesterEgalite1.jsx";
import PratiqueGuideTesterEgalite1 from "./pages/testerEgalite/pratiqueGuide/PratiqueGuideTesterEgalite1.jsx";
import PratiqueAutonomeTesterEgalite1 from "./pages/testerEgalite/PratiqueAutonome/PratiqueAutonomeTesterEgalite1.jsx";
import TesterEgalite from "./pages/testerEgalite/TesterEgalite.jsx";
import PratiqueGuideTesterEgalite2 from "./pages/testerEgalite/pratiqueGuide/PratiqueGuideTesterEgalite2.jsx";
import PratiqueAutonomeTesterEgalite2 from "./pages/testerEgalite/PratiqueAutonome/PratiqueAutonomeTesterEgalite2.jsx";
import PratiqueGuideTesterEgalite3 from "./pages/testerEgalite/pratiqueGuide/PratiqueGuideTesterEgalite3.jsx";
import PratiqueAutonomeTesterEgalite3 from "./pages/testerEgalite/PratiqueAutonome/PratiqueAutonomeTesterEgalite3.jsx";
import SousAccueilExoInteractif from "./pages/exoInteractif/SousAccueilExoInteractif.jsx";
import SousAccueilCalculLitteral from "./pages/CalculLiteral/sousAccueilCalculLitteral.jsx";
import SousAccueilExpressionLitterale from "./pages/expressionLittérale/SousAccueilExpressionLitterale.jsx";
import SousAccueilEquation from "./pages/Equation/SousAccueilEquation.jsx";
import MachineExo from "./MachineExo.jsx";
import PageMachineEquations from "./pages/Equation/PageMachineEquations.jsx";
import PageMachineCalculLitteral from "./pages/CalculLiteral/pageMachineCalculLitteral.jsx";
import PageMachineTesterEgalite from "./pages/testerEgalite/pageMachineTesterEgalite.jsx";
import PageMachineExpressionLitteral from "./pages/expressionLittérale/pageMachineExpressionLittérale.jsx";
import PageMachineExoInteractif from "./pages/exoInteractif/pageMachineExoInteractif.jsx";
import IntroductionCalculerDeveloppement from "./pages/CalculerDeveloppement/IntroductionCalculerDeveloppement.jsx";
import SousAccueilTesterEgalite from "./pages/testerEgalite/SousAccueilTesterEgalite.jsx";
import PageMachineCalculerDeveloppement from "./pages/CalculerDeveloppement/pageMachineCalculerDeveloppement.jsx";
import SousAccueilCalculerDeveloppement from "./pages/CalculerDeveloppement/SousAccueilCalculerDeveloppement.jsx";
import ModelageCalculDeveloppement from "./pages/CalculerDeveloppement/Modelage/ModelageCalculDeveloppement.jsx";
import PratiqueGuideCalculDeveloppement
  from "./pages/CalculerDeveloppement/pratiqueGuide/pratiqueGuideCalculDeveloppement.jsx";
import PratiqueAutonomeDeveloppement
  from "./pages/CalculerDeveloppement/pratiqueAutonome/PratiqueAutonomeDeveloppement.jsx";
import IntroductionCalculFactorisation from "./pages/CalculerFactorisation/IntroductionCalculFactorisation.jsx";
import SousAccueilCalculFactorisation from "./pages/CalculerFactorisation/SousAccueilCalculFactorisation.jsx";
import PageMachineCalculFactorisation from "./pages/CalculerFactorisation/pageMachineCalculFactorisation.jsx";
import ModelageCalculFactorisation from "./pages/CalculerFactorisation/Modelage/ModelageCalculFactorisation.jsx";
import PratiqueGuideCalculFactorisation
  from "./pages/CalculerFactorisation/pratiqueGuide/pratiqueGuideCalculFactorisation.jsx";
import PratiqueAutonomeFactorisation
  from "./pages/CalculerFactorisation/pratiqueAutonome/PratiqueAutonomeFactorisation.jsx";
import IntroductionCalculLitteral from "./pages/CalculLiteral/introductionCalculLitteral.jsx";
import PageMachineDevExp from "./pages/DevelopperUneExpressionSimple/pageMachineDevExp.jsx";
import SousAccueilDevExp from "./pages/DevelopperUneExpressionSimple/sousAccueilDevExp.jsx";
import IntroductionDevExp from "./pages/DevelopperUneExpressionSimple/introductionDevExp.jsx";
import DevExp from "./pages/DevelopperUneExpressionSimple/DevExp.jsx";
import ModelageDevExp from "./pages/DevelopperUneExpressionSimple/Modelage/ModelageDevExp.jsx";
import PratiqueGuideDevExpP1 from "./pages/DevelopperUneExpressionSimple/PratiqueGuide/pratiqueGuideDevExpP1.jsx";
import PratiqueGuideDevExpP2 from "./pages/DevelopperUneExpressionSimple/PratiqueGuide/pratiqueGuideDevExpP2.jsx";
import PratiqueGuideDevExpP3 from "./pages/DevelopperUneExpressionSimple/PratiqueGuide/pratiqueGuideDevExpP3.jsx";
import ModelageDevExp2 from "./pages/DevelopperUneExpressionSimple/Modelage/ModelageDevExp2.jsx";
import ModelageDevExp3 from "./pages/DevelopperUneExpressionSimple/Modelage/ModelageDevExp3.jsx";
import PratiqueAutonomeDevExp1
  from "./pages/DevelopperUneExpressionSimple/PratiqueAutonome/pratiqueAutonomeDevExp1.jsx";
import PratiqueAutonomeDevExp2
  from "./pages/DevelopperUneExpressionSimple/PratiqueAutonome/pratiqueAutonomeDevExp2.jsx";
import PratiqueAutonomeDevExp3
  from "./pages/DevelopperUneExpressionSimple/PratiqueAutonome/pratiqueAutonomeDevExp3.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./composants/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login/>}/>

          <Route path="/" element={<Accueil/>}/>
          <Route path="credit" element={<Credit/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/machineExo" element={<MachineExo/>}/>

          <Route path="/equation" element={<PageEquation/>}/>
          <Route path="/sousAccueilEquation" element={<SousAccueilEquation/>}/>
          <Route path="/PageMachineEquations" element={<PageMachineEquations/>}/>
          <Route path="/modelage" element={<Modelage1/>}/>
          <Route path="/modelage2" element={<Modelage2/>}/>
          <Route path="/modelage3" element={<Modelage3/>}/>
          <Route path="/pratiqueGuide" element={<PratiqueGuide1/>}/>
          <Route path="/pratiqueGuide2" element={<PratiqueGuide2/>}/>
          <Route path="/pratiqueGuide3" element={<PratiqueGuide3/>}/>
          <Route path="/pratiqueAutonome" element={<PratiqueAutonome1/>}/>
          <Route path="/pratiqueAutonome2" element={<PratiqueAutonome2/>}/>
          <Route path="/pratiqueAutonome3" element={<PratiqueAutonome3/>}/>


          <Route path="/calculLitteral" element={<CalculLiteral/>}/>
          <Route path="/sousAccueilCalculLitteral" element={<SousAccueilCalculLitteral/>}/>
          <Route path="/IntroductionCalculLitteral" element={<IntroductionCalculLitteral/>}/>
          <Route path="/ModelageCalculLiteralPhase1" element={<ModelageCalculLiteralPhase1/>}/>
          <Route path="/modelageCalculLiteralPhase2" element={<ModelageCalculLiteralPhase2/>}/>
          <Route path="/modelageCalculLiteralPhase3" element={<ModelageCalculLiteralPhase3/>}/>
          <Route path="pageMachineCalculLitteral" element={<PageMachineCalculLitteral/>}/>
          <Route path="/PratiqueAutonomeCL1" element={<PratiqueAutonomeCL1/>}/>
          <Route path="/PratiqueAutonomeCL2" element={<PratiqueAutonomeCL2/>}/>
          <Route path="/PratiqueAutonomeCL3" element={<PratiqueAutonomeCL3/>}/>
          <Route path="/PratiqueGuidePhase1CL" element={<PratiqueGuidePhase1CL/>}/>
          <Route path="/pratiqueGuidePhase2CL" element={<PratiqueGuidePhase2CL/>}/>
          <Route path="/pratiqueGuidePhase3CL" element={<PratiqueGuidePhase3CL/>}/>



          <Route path="/sousAccueilExoInteractif" element={<SousAccueilExoInteractif/>}/>
          <Route path="/modelageInteractif" element={<ModelageInteractif/>}/>
          <Route path="/pageMachineExoInteractif" element={<PageMachineExoInteractif/>}/>
          <Route path="/PratiqueGuideInteractif" element={<PratiqueGuideInteractif/>}/>
          <Route path="/PratiqueAutonomeInteractif" element={<PratiqueAutonomeInteractif/>}/>


          <Route path="/IntroductionIAEL" element={<IntroductionIAEL/>}/>
          <Route path="/SousAccueilExpressionLitterale" element={<SousAccueilExpressionLitterale/>}/>
          <Route path="/pageMachineExpressionLitteral" element={<PageMachineExpressionLitteral/>}/>
          <Route path="/ModelageExpressionLitterale" element={<ModelageExpressionLitteral/>}/>
          <Route path="/PratiqueGuideEL" element={<PratiqueGuideEL/>}/>
          <Route path="/pratiqueAutonomeEL" element={<PratiqueAutonomeEL/>}/>


          <Route path="/introductionEgalite" element={<IntroductionEgalite/>}/>
          <Route path="/SousAccueilTesterEgalite" element={<SousAccueilTesterEgalite/>}/>
          <Route path="pageMachineTesterEgalite" element={<PageMachineTesterEgalite/>}/>
          <Route path="/TesterEgalite" element={<TesterEgalite/>}/>

          <Route path="/ModelageTesterEgalite1" element={<ModelageTesterEgalite1/>}/>
          <Route path="/PratiqueGuideTesterEgalite1" element={<PratiqueGuideTesterEgalite1/>}/>
          <Route path="/PratiqueGuideTesterEgalite2" element={<PratiqueGuideTesterEgalite2/>}/>
          <Route path="/PratiqueGuideTesterEgalite3" element={<PratiqueGuideTesterEgalite3/>}/>
          <Route path="/PratiqueAutonomeTesterEgalite1" element={<PratiqueAutonomeTesterEgalite1/>}/>
          <Route path="/PratiqueAutonomeTesterEgalite2" element={<PratiqueAutonomeTesterEgalite2/>}/>
          <Route path="/PratiqueAutonomeTesterEgalite3" element={<PratiqueAutonomeTesterEgalite3/>}/>

          <Route path="/IntroductionCalculerDeveloppement" element={<IntroductionCalculerDeveloppement/>}/>
          <Route path="/SousAccueilCalculerDeveloppement" element={<SousAccueilCalculerDeveloppement/>}/>
          <Route path="/PageMachineCalculerDeveloppement" element={<PageMachineCalculerDeveloppement/>}/>
          <Route path="/ModelageCalculDeveloppement" element={<ModelageCalculDeveloppement/>}/>
          <Route path="/PratiqueGuideCalculDeveloppement" element={<PratiqueGuideCalculDeveloppement/>}/>
          <Route path="/PratiqueAutonomeDeveloppement" element={<PratiqueAutonomeDeveloppement/>}/>


          <Route path="/IntroductionCalculFactorisation" element={<IntroductionCalculFactorisation/>}/>
          <Route path="/SousAccueilCalculFactorisation" element={<SousAccueilCalculFactorisation/>}/>
          <Route path="/PageMachineCalculFactorisation" element={<PageMachineCalculFactorisation/>}/>
          <Route path="/ModelageCalculFactorisation" element={<ModelageCalculFactorisation/>}/>
          <Route path="/PratiqueGuideCalculFactorisation" element={<PratiqueGuideCalculFactorisation/>}/>
          <Route path="/PratiqueAutonomeFactorisation" element={<PratiqueAutonomeFactorisation/>}/>

          <Route path="/PageMachineDevExp" element={<PageMachineDevExp/>}/>
          <Route path="/SousAccueilDevExp" element={<SousAccueilDevExp/>}/>
          <Route path="/IntroductionDevExp" element={<IntroductionDevExp/>}/>
          <Route path="/DevExp" element={<DevExp/>}/>
          <Route path="/ModelageDevExp" element={<ModelageDevExp/>}/>
          <Route path="/ModelageDevExp2" element={<ModelageDevExp2/>}/>
          <Route path="/ModelageDevExp3" element={<ModelageDevExp3/>}/>
          <Route path="/PratiqueGuideDevExpP1" element={<PratiqueGuideDevExpP1/>}/>
          <Route path="/PratiqueGuideDevExpP2" element={<PratiqueGuideDevExpP2/>}/>
          <Route path="/PratiqueGuideDevExpP3" element={<PratiqueGuideDevExpP3/>}/>
          <Route path="/PratiqueAutonomeDevExp1" element={<PratiqueAutonomeDevExp1/>}/>
          <Route path="/PratiqueAutonomeDevExp2" element={<PratiqueAutonomeDevExp2/>}/>
          <Route path="/PratiqueAutonomeDevExp3" element={<PratiqueAutonomeDevExp3/>}/>
      </Routes>
    </Router>
  );
}


export default App;