import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";


function ExempleResolutionLiteralPhase2() {
  const [valeurs, setValeurs] = useState({ a: 0, b: 0, x: 5 });
  const [indexEtape, setIndexEtape] = useState(1);

  function genererSituation() {
    const valA = Math.floor(Math.random() * 4) + 2; // Multiplicateur simple
    const valB = Math.floor(Math.random() * 6) + 1; // Addition simple
    setValeurs({ a: valA, b: valB, x: 5 });
  }

  useEffect(() => {
    genererSituation();
  }, []);

  const etapes = [
    {
      id: 1,
      jsx: (
        <div>
          <p className="text-info fw-bold mb-1">📋 Explication :</p>
          <p>Une lettre est une boîte qui contient un nombre qu'on ne connaît pas
            encore.</p>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Exemple</span>
          (3 × <span className="text-warning fw-bold">X</span>) + 5
        </p>
      )
    },
    {
      id: 3,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Cela signifie</span>
          Qu'on doit multiplier X par <span className="fw-bold">3</span>.
        </p>
      )
    },
    {
      id: 4,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Ensuite</span>
          On additionnera <span className="fw-bold">5</span> à ce résultat.
        </p>
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

export default ExempleResolutionLiteralPhase2;