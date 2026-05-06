import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";


function ExempleResolutionLiteralPhase3() {
  const [valeurs, setValeurs] = useState({ a: 0, b: 0 });
  const [indexEtape, setIndexEtape] = useState(1);

  function genererSituation() {
    const valA = Math.floor(Math.random() * 4) + 2; // Multiplicateur (2 à 5)
    const valB = Math.floor(Math.random() * 8) + 1; // Addition (1 à 8)
    setValeurs({ a: valA, b: valB });
  }

  useEffect(() => {
    genererSituation();
  }, []);

  const etapes = [
    {
      id: 1,
      jsx: (
        <div className="text-center p-3 bg-dark-subtle rounded border border-primary">
          <p className="text-info fw-bold mb-1">🔍 Expression à analyser :</p>
          <p className="fs-2 fw-bold mb-0 text-primary">{valeurs.a} * x + {valeurs.b}</p>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <div className="d-flex align-items-center gap-3">
          <div className="p-2 border border-secondary rounded text-center" style={{minWidth: '80px'}}>
            <span className="fs-5 fw-bold text-primary">x</span>
          </div>
          <div className="flex-grow-1">
            <p className="mb-0 fw-bold text-primary">1. Choisir un nombre.</p>
            <p className="small text-warning mb-0 italic">C'est notre point de départ.</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      jsx: (
        <div className="d-flex align-items-center gap-3">
          <div className="p-2 border border-secondary rounded text-center" style={{minWidth: '80px'}}>
            <span className="fs-5 text-primary fw-bold text-white">{valeurs.a} * x</span>
          </div>
          <div className="flex-grow-1">
            <p className="mb-0 fw-bold text-primary">2. Multiplier par {valeurs.a}.</p>
            <p className="small text-warning mb-0 italic">C'est une multiplication prioritaire.</p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      jsx: (
        <div className="d-flex align-items-center gap-3">
          <div className="p-2 border border-secondary rounded text-center" style={{minWidth: '130px'}}>
            <span className="fs-5 fw-bold text-primary">{valeurs.a} * x + {valeurs.b}</span>
          </div>
          <div className="flex-grow-1">
            <p className="mb-0 fw-bold text-primary">3. Ajouter {valeurs.b}.</p>
            <p className="small text-warning mb-0 italic">On termine par l'addition car elle n'est pas prioritaire.</p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      jsx: (
        <div className="mt-3 p-3 bg-primary bg-opacity-10 rounded border border-primary text-center">
          <p className="mb-0 fw-bold text-primary">📜 Programme de calcul trouvé :</p>
          <ol className="text-start mt-2 small">
            <li>Choisir un nombre</li>
            <li>Le multiplier par {valeurs.a}</li>
            <li>Lui ajouter {valeurs.b}</li>
          </ol>
        </div>
      )
    },
    {
      id: 6,
      jsx: (
        <div className="mt-2">
          <p className="small text-warning">
            <span className="badge badge- bg-primary me-2">Attention aux priorités !</span>
            Dans 2(x-1) + 3, on fait d'abord x-1 puis 2*(x-1) puis + 3
          </p>
        </div>
      )
    },
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

export default ExempleResolutionLiteralPhase3;