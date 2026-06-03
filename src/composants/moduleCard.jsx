import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// On ajoute "estActif = true" par défaut pour ne pas casser la carte si tu l'utilises ailleurs
function ModuleCard({ titre, description, path, estActif = true }) {
  const navigate = useNavigate();

  return (
    <motion.div
      // Animation d'entrée (Fade in + montée), on baisse l'opacité finale si c'est inactif
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: estActif ? 1 : 0.5, y: 0 }}
      transition={{ duration: 0.5 }}

      // L'effet de lévitation au survol ne s'active QUE si le module est actif
      whileHover={estActif ? {
        y: -10,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.15)", // (Correction : 'shadow' devient 'boxShadow' pour Framer)
        scale: 1.02
      } : {}}

      className={`card card-litteral shadow-sm rounded-4 p-4 m-4 ${!estActif ? 'bg-light' : ''}`}
      style={{
        cursor: estActif ? 'pointer' : 'not-allowed',
        filter: estActif ? 'none' : 'grayscale(80%)' // Ajoute un bel effet grisé natif
      }}
      onClick={() => {
        // On empêche la navigation si le module est verrouillé
        if (estActif) {
          navigate(path);
        }
      }}
    >
      <h5 className={`fw-bold ${estActif ? 'text-primary' : 'text-secondary'}`}>
        {titre}
      </h5>
      <p className="mb-0 text-secondary">
        {description}
      </p>

      {/* Petit indicateur visuel supplémentaire si verrouillé */}
      {!estActif && (
        <div className="mt-3">
          <span className="badge bg-secondary py-2 px-3 rounded-pill">
            🔒 Module verrouillé
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default ModuleCard;