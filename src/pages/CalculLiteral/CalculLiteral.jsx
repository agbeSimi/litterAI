import logoRobot from "../../assets/logo_robot.png";
import CarteConcept from "../../composants/CarteConcept.jsx";
import CarteExplication from "../../composants/CarteExplication.jsx";
import {useNavigate} from "react-router-dom";

function CalculLiteral() {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-5 min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <img
        src={logoRobot}
        alt="LitterAl"
        className="mb-4"
        style={{ width: '120px' }}
      />
      <h1 className="display-4 fw-bold text-primary mb-5 mt-3">Litter AI</h1>
      <h2 className="text-secondary mb-5">Chapitre : Le Calcul litéral</h2>
      <h4 className="fw-bold text-secondary">Objectif : Comprendre qu'une lettre cache une valeur et savoir calculer une expression</h4>
      <CarteConcept
        description="En mathématiques, une lettre est comme une 'boîte magique' : elle cache un nombre que l'on ne connaît pas encore, mais avec lequel on peut déjà faire des calculs !"/>
      <CarteExplication
        description="Utiliser des lettres permet d'écrire une seule règle qui fonctionne pour tous les nombres du monde. C'est l'outil secret des mathématiciens pour passer des phrases aux formules !"/>

      <div className="text-center mt-5">
        <div className="text-center mt-5">
          <button onClick={() => navigate("/ModelageCalculLiteralPhase1")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
            Phase 1
          </button>
        <button onClick={() => navigate("/ModelageCalculLiteralPhase2")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
          Phase 2
        </button>
          <button className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
            Phase 3
          </button>
      </div>
    </div>
    </div>
  );
}

export default CalculLiteral;