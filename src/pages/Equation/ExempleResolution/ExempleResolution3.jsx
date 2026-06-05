import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ExempleResolution3() {
  const [equation, setEquation] = useState({ a: 0, b: 0, c: 0, x: 0 });
  const [indexEtape, setIndexEtape] = useState(1);

  function genererEquation() {
    // Format : aX + b = c
    let valA = (Math.floor(Math.random() * 8) + 2) / 2; // ex: 1.5, 2.5, 4
    const valX = Math.floor(Math.random() * 8) + 2;    // X reste entier pour la clarté
    let valB = (Math.floor(Math.random() * 10) + 1) / 2; // b décimal

    // Calcul de c pour tomber juste
    const valC = valA * valX + valB;

    setEquation({
      a: valA,
      b: valB,
      c: valC,
      x: valX
    });
  }

  useEffect(() => {
    genererEquation();
  }, []);

  const { a, b, c, x: sol } = equation;

  const etapes = [
    {
      id: 1,
      jsx: <p className="mb-2 fw-bold">Équation : <span className="text-info">{a}x + {b} = {c}</span></p>
    },
    {
      id: 2,
      jsx: <p className="text-warning ms-3 small">Étape 1 : On veut isoler le bloc avec x. Enlevons le +{b}.</p>
    },
    {
      id: 3,
      jsx: (
        <p className="mb-3 ms-3 border-start ps-2">
          On fait <span className="text-danger">-{b}</span> des deux côtés :<br/>
          {a}x + {b} <span className="text-danger">-{b}</span> = {c} <span className="text-danger">-{b}</span>
        </p>
      )
    },
    {
      id: 4,
      jsx: (
        <div className="mb-3 ms-4 p-2 bg-secondary bg-opacity-10 border-start border-info rounded">
          <p className="small mb-1 text-info">💡 Calcul à droite :</p>
          <p className="mb-0">{c} - {b} = <span className="fw-bold text-info">{(c - b).toFixed(1)}</span></p>
        </div>
      )
    },
    {
      id: 5,
      jsx: <p className="mb-3">On obtient : <span className="text-info">{a}x = {(c - b).toFixed(1)}</span></p>
    },
    {
      id: 6,
      jsx: <p className="text-warning ms-3 small">Étape 2 : On veut x tout seul. On casse la multiplication par {a}.</p>
    },
    {
      id: 7,
      jsx: (
        <p className="mb-3 ms-3 border-start ps-2">
          On divise par <span className="text-danger">{a}</span> des deux côtés :<br/>
          x = {(c - b).toFixed(1)} <span className="text-danger"> / {a}</span>
        </p>
      )
    },
    {
      id: 8,
      jsx: <p className="fs-5 fw-bold text-success border border-success p-2 rounded text-center">✅ x = {sol}</p>
    }
  ];

  function etapeSuivante() {
    if (indexEtape < etapes.length) {
      setIndexEtape(indexEtape + 1);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-dark text-light border-0 rounded-4 p-4 mb-5 shadow-sm"
      >
        <div className="card-body font-monospace">
          {etapes.slice(0, indexEtape).map((etape) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={etape.id}
              className="mb-3"
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
    </>
  );
}

export default ExempleResolution3;