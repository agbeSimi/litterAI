import {motion} from "framer-motion";
import React, {useState} from "react";
import ExempleResolutionLiteralPhase2 from "./ExempleResolutionLiteralPhase2.jsx";
import {useNavigate} from "react-router-dom";
import ExempleResolutionLiteralPhase3 from "./ExempleResolutionLiteralPhase3.jsx";

function ModelageCalculLiteralPhase3() {
  const [afficheVideo, setAfficheVideo] = useState(false);
  const goToVideo = () => {
    setAfficheVideo( !afficheVideo );
  };
  const navigate = useNavigate();

  return(
    <div className="container py-5 min-h-screen bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-white p-5 shadow-lg rounded-4">

          {/* --- Header --- */}
          <header className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary">
              Expression littéraire
            </h1>
            <p className="lead text-dark mt-4">
              Savoir lire une formule complexe et décrire les étapes du calcul.
              <br />
              <br />
              <span className="fw-bold">Règle :</span> On inverse la logique. On part de la lettre pour aller vers la phrase.

            </p>

          </header>

          {/* --- Rappel Concepts --- */}
          <div className="card bg-light border-0 p-3 mb-5">
            {/* --- Résolution Sombre --- */}
            <ExempleResolutionLiteralPhase3/>

            {/* --- Actions --- */}
            <footer className="d-flex justify-content-center gap-4 mt-5 pt-4 border-top">
              <motion.div
                // Animation au survol (Effet de lévitation)
                whileHover={{
                  y: -10,
                  shadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  scale: 1.02
                }}
              >

                <button onClick={goToVideo} className="btn btn-sm px-md-5 py-md-3 px-4 rounded-pill fw-bold d-flex flex-wrap justify-content-center gap-3 mt-4" style={{ backgroundColor: 'orangered', color: 'white' }}>
                  🎬 Vidéo éxplicative
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
                <button  className="btn btn-sm px-md-5 py-md-3 px-4 rounded-pill fw-bold d-flex flex-wrap justify-content-center gap-3 mt-4" style={{ backgroundColor: 'deepskyblue', color: 'white' }}>
                  Pratique Guidée
                </button>
              </motion.div>

            </footer>
            {afficheVideo && (
              <div className="mt-3">
                <video controls width="100%" className="rounded-4">
                  <source src="/videos/Niveau-1-1-Introduction-au-calcul-litteral.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelageCalculLiteralPhase3;