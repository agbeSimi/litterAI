import logoRobot from "../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";
import ModuleCard from "./moduleCard.jsx";

function Accueil(){
  const navigate = useNavigate();

  function goHome() {
    navigate("/")
  }

  return(
    <div className="text-center mb-5 min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <img
        src={logoRobot}
        alt="LitterAl"
        className="mb-4"
        style={{ width: '120px' }}
        onClick={goHome}
      />
      <h1 className="display-4 fw-bold text-primary mb-5 mt-3">Litter AI</h1>
      <h3 className="text-secondary mb-5">L'intelligence artificielle au service de ta réussite en mathématiques.</h3>
      <h5 className="fw text-secondary">Un projet conçu par Morgan MARTIN — Professeur
        Agrégé de Mathématiques</h5>
          <ModuleCard
            titre="Equations"
            description="Apprendre à isoler x et maîtriser la balance algébrique."
            path="/equation"/>
          <ModuleCard
            titre="Calcul Littéral"
            description="Passer des phrases aux formules et comprendre le rôle des lettres."/>
    </div>
  )
}

export default Accueil;