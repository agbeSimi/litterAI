import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ExempleInteractif from "../composant/ExempleInteractif.jsx";

function ModelageInteractif() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 min-h-screen bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-white p-5 shadow-lg rounded-4">

          <header className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary">Le Programme Interactif 🧩</h1>
            <p className="lead text-dark mt-3">
              Apprendre à manipuler les opérations pour transformer un nombre.
            </p>
          </header>

          <div className="alert alert-warning rounded-4 border-0 mb-5 shadow-sm">
            <strong>Comment ça marche ?</strong> Tu dois d'abord choisir l'opération (case bleue) puis calculer le résultat (case blanche).
          </div>

          {/* Appel de l'exemple animé */}
          <ExempleInteractif />

          <footer className="d-flex justify-content-center gap-4 mt-5 pt-4 border-top">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/pratiqueGuideInteractif")}
              className="btn rounded-pill fw-bold px-4 py-2"
              style={{ backgroundColor: 'deepskyblue', color: 'white' }}
            >
              C'est parti ! 🚀
            </motion.button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ModelageInteractif;