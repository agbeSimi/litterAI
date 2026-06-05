import { useNavigate } from "react-router-dom";
import logoRobot from "../assets/logo_robot.png";
import CarteConcept from "./CarteConcept.jsx";
import CarteExplication from "./CarteExplication.jsx";

function IntroductionChapitre({ chapitre, objectif, conceptTexte, explicationTexte, phases }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex flex-column align-items-center py-5 mt-4">
      <div className="col-12 col-md-10 col-lg-8 text-center d-flex flex-column align-items-center">

        <img
          src={logoRobot}
          alt="LitterAI"
          className="mb-3 logo-bounce cursor-pointer"
          style={{ width: '100px' }}
          onClick={() => navigate("/")}
        />

        <h1 className="display-4 fw-bolder custom-logo mb-5">LitterAI</h1>

        <h2 className="text-dark fw-bold mb-3">Chapitre : {chapitre}</h2>

        <div className="bg-primary bg-opacity-10 rounded-3 p-3 mb-5 border border-primary border-opacity-10 w-100 shadow-sm">
          <h5 className="fw-semibold text-primary mb-0">Objectif : {objectif}</h5>
        </div>

        <div className="d-flex flex-column gap-4 w-100 mb-5 text-start">
          <CarteConcept description={conceptTexte} />
          <CarteExplication description={explicationTexte} />
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 w-100 mt-2">
          {phases.map((phase, index) => (
            <button
              key={index}
              onClick={() => navigate(phase.path)}
              className="btn btn-primary btn-gradient-primary rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale"
            >
              {phase.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default IntroductionChapitre;