import React from "react";
import { motion } from "framer-motion";
import ExempleResolution from "../composants/ExempleResolution.jsx";


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
          <ExempleResolution/>


            {/* --- Actions --- */}
            <footer className="d-flex justify-content-between mt-5 pt-4 border-top">
              <motion.div
                // Animation au survol (Effet de lévitation)
                whileHover={{
                  y: -10,
                  shadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  scale: 1.02
                }}
              >

                <button className="btn btn-sm px-md-5 py-md-3 px-4 rounded-pill fw-bold" style={{ backgroundColor: 'orangered', color: 'white' }}>
                  🎬 Vidéo : Le Mystère de la Balance
                </button>
              </motion.div>

              <motion.div
                // Animation au survol (Effet de lévitation)
                whileHover={{
                  y: -10,
                  shadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  scale: 1.02
                }}
              >
                <button className="btn btn-sm px-md-5 py-md-3 rounded-pill fw-bold" style={{ backgroundColor: 'deepskyblue', color: 'white' }}>
                  Pratique Guidée
                </button>
              </motion.div>

            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modelage;