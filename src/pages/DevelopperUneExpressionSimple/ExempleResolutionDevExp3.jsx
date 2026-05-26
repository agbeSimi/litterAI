import { useState } from 'react';
import { motion } from "framer-motion";

function ExempleResolutionDevExp3() {
  const [indexEtape, setIndexEtape] = useState(1);

  const etapes = [
    {
      id: 1,
      jsx: (
        <div>
          <p className="text-info fw-bold mb-1">📋 Étape 1 : L'expression de départ</p>
          <p className="fs-4 mb-0">
            <span className="text-warning fw-bold">10,5</span>( <span className="text-success fw-bold">10</span> + <span className="text-info fw-bold">a</span> )
          </p>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <div>
          <p className="mb-1">
            <span className="badge bg-primary me-2">1ère distribution</span>
            Le <span className="text-warning fw-bold">10,5</span> attaque le <span className="text-success fw-bold">10</span>
          </p>
          <p className="ms-4 mb-0 fs-5">
            ↪ <span className="text-warning fw-bold">10,5</span> * <span className="text-success fw-bold">10</span>
          </p>
        </div>
      )
    },
    {
      id: 3,
      jsx: (
        <div>
          <p className="mb-1">
            <span className="badge bg-primary me-2">2ème distribution</span>
            Le <span className="text-warning fw-bold">10,5</span> attaque le <span className="text-info fw-bold">a</span>
          </p>
          <p className="ms-4 mb-0 fs-5">
            ↪ <span className="text-warning fw-bold">10,5</span> * <span className="text-info fw-bold">a</span>
          </p>
        </div>
      )
    },
    {
      id: 4,
      jsx: (
        <div className="mt-3 p-3 bg-secondary bg-opacity-25 rounded border border-secondary">
          <p className="mb-2">
            <span className="badge bg-success me-2">Résultat</span>
            On relie les deux parties avec l'addition centrale :
          </p>
          <p className="fs-4 text-center fw-bold mb-0">
            (<span className="text-warning">10,5</span> * <span className="text-success">10</span>) + (<span className="text-warning">10,5</span> * <span className="text-info">a</span>)
          </p>
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
        style={{ minHeight: '380px' }}
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

export default ExempleResolutionDevExp3;