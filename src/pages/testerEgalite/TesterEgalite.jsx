import logoRobot from "../../assets/logo_robot.png";
import CarteConcept from "../../composants/CarteConcept.jsx";
import CarteExplication from "../../composants/CarteExplication.jsx";
import {useNavigate} from "react-router-dom";

function TesterEgalite() {
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
      <h2 className="text-secondary mb-5">Chapitre : Tester les égalités</h2>
      <h4 className="fw-bold text-secondary">Objectif : Remplacer les lettres par des nombres pour vérifier si une égalité est vraie ou fausse.</h4>
      <CarteConcept
        description="Une égalité est composée de deux côtés séparés par un signe '=' :
        Le membre de gauche et le membre de droite. Tester une égalité consiste à vérifier si ces deux
         côtés donnent le même résultat lorsqu'on remplace les lettres par des nombres."/>
      <CarteExplication
        description={
          `On calcule chaque côté séparément :\n\n` +
          `1. Remplacer : On réécrit chaque membre en remplaçant les lettres par les nombres donnés.\n\n` +
          `2. Calculer : On effectue les calculs de chaque côté en respectant les priorités opératoires.\n\n` +
          `3. Conclure : Si les deux totaux sont identiques, l'égalité est VRAIE. S'ils sont différents, elle est FAUSSE.`
        }
      />
      <div className="text-center mt-5">
        <div className="text-center mt-5">
          <button onClick={() => navigate("/ModelageTesterEgalite1")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
            Phase 1
          </button>
          <button onClick={() => navigate("/PratiqueAutonomeTesterEgalite2")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
            Phase 2
          </button>
          <button onClick={() => navigate("/PratiqueAutonomeTesterEgalite3")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
            Phase 3
          </button>
        </div>
      </div>
    </div>
  );
}

export default TesterEgalite;