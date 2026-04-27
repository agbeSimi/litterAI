import logoRobot from "../assets/logo_robot.png";
import CarteConcept from "../composants/CarteConcept.jsx";
import CarteExplication from "../composants/CarteExplication.jsx";
import React from "react";

function Modelage() {
  return(
    <div className="container py-5 min-h-screen bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-white p-5 shadow-lg rounded-4">

          {/* --- Header --- */}
          <header className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary">
              L'équilibre de la Balance ⚖️
            </h1>
            <p className="lead text-dark mt-4">
              Le signe "=" est le pivot.
              <br />
              <span className="fw-bold">Règle d'or :</span> Tout ce que tu retires d'un côté, tu dois le retirer de l'autre avec l'opération contraire !
            </p>
          </header>

          {/* --- Rappel Concepts --- */}
          <div className="card bg-light border-0 p-3 mb-5">
            <div className="card-body">
              <p className="mb-2">
                <i className="bi bi-arrow-right-short text-primary fs-5"></i>
                L'opposé de <strong>+5</strong> est <strong>-5</strong>.
              </p>
              <p className="mb-0">
                <i className="bi bi-arrow-right-short text-primary fs-5"></i>
                La réciproque de <strong>×3</strong> est <strong>÷3</strong>.
              </p>
            </div>

            {/* --- Résolution Sombre --- */}
            <div className="card bg-dark text-light border-0 rounded-4 p-4 mb-5 shadow-sm">
              <div className="card-body font-monospace"> {/* Police monospace pour le style code */}

                {/* Étape 1 */}
                <p className="mb-2">1. Équation : <span className="text-info">3x + 5 = 17</span></p>
                <p className="mb-4 text-warning ms-3">→ L'opposé de <span className="fw-bold">+5</span> est <span className="fw-bold">-5</span></p>

                {/* Étape 2 */}
                <p className="mb-2">2. On obtient : <span className="text-info">3x = 12</span></p>
                <p className="mb-4 text-warning ms-3">→ La réciproque de <span className="fw-bold">×3</span> est <span className="fw-bold">÷3</span></p>

                {/* Solution */}
                <p className="mb-0 fs-5">3. Solution : <span className="text-success fw-bold">x = 4</span> ✅</p>
              </div>
            </div>
            {/* --- Actions --- */}
            <footer className="d-flex justify-content-between mt-5 pt-4 border-top">
              <button className="btn btn-lg px-4 rounded-pill fw-bold" style={{ backgroundColor: '#e67e22', color: 'white' }}>
                🎬 Vidéo : Le Mystère de la Balance
              </button>

              <button className="btn btn-lg  rounded-pill fw-bold" style={{ backgroundColor: '#2ecc71', color: 'white' }}>
                Pratique Guidée
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modelage;