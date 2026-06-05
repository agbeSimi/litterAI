import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ModelageLecon({
                         titre,
                         description,
                         routePratiqueGuidee,
                         srcVideo,
                         ComponentExemple,
                         children // Permet d'insérer des éléments spécifiques comme un bloc de rappel
                       }) {
  const [afficheVideo, setAfficheVideo] = useState(false);
  const navigate = useNavigate();

  const toggleVideo = () => setAfficheVideo(!afficheVideo);

  return (
    <div className="container py-5 min-vh-100 bg-light pt-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-8">

          <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">

            {/* --- En-tête --- */}
            <header className="text-center mb-5">
              <h1 className="display-5 fw-bolder custom-logo mb-4">
                {titre}
              </h1>
              <p className="lead text-secondary fw-normal px-md-3 opacity-90">
                {description}
              </p>
            </header>

            {/* --- Contenu & Rappel des Concepts --- */}
            <div className="card bg-light border-0 p-3 p-md-4 rounded-4 mb-4">
              {children}
              {ComponentExemple && <ComponentExemple />}
            </div>

            {/* --- Lecteur Vidéo --- */}
            {afficheVideo && srcVideo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm border">
                  <video controls width="100%">
                    <source src={srcVideo} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              </motion.div>
            )}

            {/* --- Actions --- */}
            <footer className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4 pt-4 border-top">

              {srcVideo && (
                <button
                  onClick={toggleVideo}
                  className={`btn rounded-pill px-4 py-3 fw-bold shadow-sm btn-hover-scale ${
                    afficheVideo ? 'btn-secondary' : 'btn-danger btn-gradient-danger'
                  }`}
                >
                  🎬 {afficheVideo ? "Masquer la vidéo" : "Vidéo explicative"}
                </button>
              )}

              <button
                onClick={() => navigate(routePratiqueGuidee)}
                className="btn btn-primary btn-gradient-primary rounded-pill px-4 py-3 fw-bold shadow-sm"
              >
                🚀 Pratique Guidée
              </button>

            </footer>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelageLecon;