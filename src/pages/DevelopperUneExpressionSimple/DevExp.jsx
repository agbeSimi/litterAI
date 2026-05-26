import logoRobot from "../../assets/logo_robot.png";
import CarteConcept from "../../composants/CarteConcept.jsx";
import CarteExplication from "../../composants/CarteExplication.jsx";
import {useNavigate} from "react-router-dom";

function DevExp() {
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
      <h2 className="text-secondary mb-5">Chapitre : Déveloper une expression</h2>
      <h4 className="fw-bold text-secondary">Objectif : Comprendre comment distribuer un multiplicateur pour transformer un produit en somme</h4>
      <CarteConcept
        description="La distributivité, c'est comme un livreur qui dépose le même colis à chaque maison d'un quartier ! Le nombre collé devant la parenthèse est 'distribué' et vient multiplier chaque nombre à l'intérieur."
      />

      <CarteExplication
        description="Cette technique permet de casser un gros bloc de calcul avec des parenthèses en plusieurs petites additions beaucoup plus simples. C'est l'outil indispensable pour le calcul mental et la résolution d'équations !"
      />
      <div className="text-center mt-5">
        <div className="text-center mt-5">
          <button onClick={() => navigate("/ModelageDevExp")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
            Phase 1
          </button>
        <button onClick={() => navigate("/ModelageDevExp")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
          Phase 2
        </button>
          <button onClick={() => navigate("/ModelageDevExp")} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
            Phase 3
          </button>
      </div>
    </div>
    </div>
  );
}

export default DevExp;