import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ModuleCard({ titre, description, path, estActif = true }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={estActif ? {
        y: -8,
        scale: 1.015,
        transition: { duration: 0.2 }
      } : {}}
      className={`card h-100 border-0 rounded-4 p-4 shadow-sm custom-card ${!estActif ? 'card-disabled' : 'card-active'}`}
      style={{
        cursor: estActif ? 'pointer' : 'not-allowed'
      }}
      onClick={() => {
        if (estActif) {
          navigate(path);
        }
      }}
    >
      {/* Contenu principal de la carte */}
      <div className="card-body p-0 d-flex flex-column h-100">

        {/* Titre : En dégradé si actif, gris si verrouillé */}
        <h5 className={`fw-bold card-title mb-3 ${estActif ? 'text-gradient-title' : 'text-muted'}`}>
          {titre}
        </h5>

        {/* Description */}
        <p className="card-text text-secondary small flex-grow-1 opacity-85">
          {description}
        </p>

        {/* Pied de carte avec Badge Statut */}
        <div className="mt-4 pt-2 border-top border-light d-flex align-items-center justify-content-center">
          {estActif ? (
            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill fw-semibold small">
              🚀 Commencer
            </span>
          ) : (
            <span className="badge bg-secondary bg-opacity-10 text-secondary py-2 px-3 rounded-pill fw-semibold small d-flex align-items-center gap-1">
              🔒 Verrouillé
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ModuleCard;