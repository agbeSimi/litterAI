import  { useState } from 'react';
import { motion } from "framer-motion";

function ExempleCalculDeveloppement() {
  const [indexEtape, setIndexEtape] = useState(1);

  const etapes = [
    {
      id: 1,
      jsx: (
        <div>
          <p className="text-info fw-bold mb-1">💡 La méthode astucieuse (Distributivité) :</p>
          <p>Pour calculer une multiplication compliquée de tête, on décompose un des nombres pour utiliser la distributivité : a × (b + c) = a × b + a × c.</p>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 1</span> Décomposer le nombre complexe</p>
          <div className="text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <span className="text-warning small text-uppercase fw-bold">Calcul de départ</span><br />
            <span className="fs-5">103 × 25</span>
            <br /><br />
            <span className="text-warning small text-uppercase fw-bold">On transforme 103 en (100 + 3)</span><br />
            <span className="fs-5"><span className="text-info fw-bold">(100 + 3)</span> × 25</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 2</span> Distribuer le multiplicateur</p>
          <div className="text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <p className="text-light small mb-1">On multiplie 25 avec chaque partie de la parenthèse.</p>
            <span className="fs-5">100 × <span className="text-info fw-bold">25</span> + 3 × <span className="text-info fw-bold">25</span></span>
          </div>
        </div>
      )
    },
    {
      id: 4,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 3</span> Calculer les multiplications</p>
          <div className="text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <p className="text-light small mb-1">On effectue les multiplications en priorité.</p>
            <span className="fs-5"><span className="text-success fw-bold">2500</span> + <span className="text-success fw-bold">75</span></span>
          </div>
        </div>
      )
    },
    {
      id: 5,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 4</span> Additionner pour le résultat final</p>
          <div className="text-center p-3 border border-success rounded-3 bg-success bg-opacity-10">
            <p className="mb-1 text-success fw-bold fs-4">2575</p>
            <p className="mb-0">Et voilà ! Le calcul est terminé rapidement et sans calculatrice.</p>
          </div>
        </div>
      )
    }
  ];

  function etapeSuivante() {
    if (indexEtape < etapes.length) {
      setIndexEtape(indexEtape + 1);
    }
  }

  return (
    <div className="w-100">
      <motion.div
        className="card bg-dark text-light border-0 rounded-4 p-4 mb-4 shadow-lg"
        style={{ minHeight: '300px' }}
      >
        <div className="card-body font-monospace">
          {etapes.slice(0, indexEtape).map((etape) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={etape.id}
              className="mb-4"
            >
              {etape.jsx}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {indexEtape < etapes.length && (
        <div className="text-center">
          <button
            onClick={etapeSuivante}
            className="btn btn-primary rounded-pill px-5 py-3 shadow fw-bold border-0"
          >
            Afficher la suite...
          </button>
        </div>
      )}
    </div>
  );

}
export default ExempleCalculDeveloppement;