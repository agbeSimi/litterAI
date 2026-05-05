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
          <p className="text-info fw-bold mb-1">📋 Le défi :</p>
          <p>Traduire ce programme en une formule mathématique.</p>
          <ul className="list-unstyled ms-3 border-start ps-3 text-primary">
            <li>1. Choisir un nombre</li>
            <li>2. Multiplier par {valeurs.a}</li>
            <li>3. Ajouter {valeurs.b}</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Étape 1</span>
          On choisit un nombre, mais on ne le connaît pas encore. On l'appelle <span className="text-warning fw-bold">x</span>.
        </p>
      )
    },
    {
      id: 3,
      jsx: (
        <div className="d-flex align-items-center justify-content-center bg-dark-subtle p-2 rounded">
          <span className="fs-4 text-primary">Démarrage : </span>
          <span className="fs-3 ms-3 fw-bold text-secondary ">x</span>
        </div>
      )
    },
    {
      id: 4,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Étape 2</span>

          On doit multiplier ce nombre par <span className="fw-bold">{valeurs.a}</span>.
        </p>
      )
    },
    {
      id: 5,
      jsx: (
        <div className="text-center">
          <p className="mb-1 text-primary small">L'opération s'écrit d'abord :</p>
          <div className="d-flex align-items-center justify-content-center bg-dark-subtle p-2 rounded">
            <span className="fs-4 text-primary fw-bold">{valeurs.a} × <span className="text-secondary">X</span></span>
          </div>
        </div>
      )
    },
    {
      id: 6,
      jsx: (
        <p className="text-warning ms-3 small italic">
          💡 Astuce : <span className="fw-bold">{valeurs.a} × x</span> peut s'écrire plus simplement <span className="fw-bold text-white">{valeurs.a}x</span> !
        </p>
      )
    },
    {
      id: 7,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Étape 3</span>
          Maintenant, on ajoute <span className="fw-bold">{valeurs.b}</span> à tout ce qu'on a déjà fait.
        </p>
      )
    },
    {
      id: 8,
      jsx: (
        <div className="p-3 bg-dark rounded border border-primary text-center">
          <p className="mb-1 text-primary small">Voici notre formule finale (l'expression littérale) :</p>
          <p className="fs-3 mb-0 fw-bold text-primary">({valeurs.a} × X) + {valeurs.b}</p>
        </div>
      )
    },
    {
      id: 9,
      jsx: (
        <div className="mt-2">
          <p className="fw-bold text-info">🔍 Pourquoi c'est utile ?</p>
          <p className="small mb-0">Si tu décides que ton nombre de départ <span className="text-warning">x</span> est <span className="fw-bold text-white">10</span> :</p>
          <p className="text-center font-monospace mt-2">
            ({valeurs.a} × <span className="text-warning">10</span>) + {valeurs.b} = <span className="text-primary">{valeurs.a * 10 + valeurs.b}</span>
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