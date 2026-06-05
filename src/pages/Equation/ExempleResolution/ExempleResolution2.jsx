import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

function ExempleResolution2() {
  const [equation, setEquation] = useState({ a: 0, b: 0, c: 0, x: 0 });
  const[indexEtape, setIndexEtape] = useState(1);


  function genererEquationAleatoire() {
    let valA = Math.floor(Math.random() * 8) + 2; // entre 2 et 9
    let valC = Math.floor(Math.random() * 5) + 2; // entre 1 et 5

    if (valA === valC) valA++;

    const valX = Math.floor(Math.random() * 9) + 1;

    const valB = Math.floor(Math.random() * 15) + 1;


    const valD = (valA * valX) + valB - (valC * valX);

    setEquation({
      a: valA,
      b: valB,
      c: valC,
      d: valD,
      x: valX, // La solution à trouver
      affichage: `${valA}x + ${valB} = ${valC}x + ${valD}`
    });
  }

  useEffect(() => {
    genererEquationAleatoire();
  }, []);

  // On récupère les valeurs
  const a = equation.a;
  const b = equation.b;
  const c = equation.c;
  const d = equation.d;
  const sol = equation.x;

  const etapes = [
    {
      id: 1,
      jsx: <p className="mb-2 fw-bold">Départ : <span className="text-info">{a}x + {b} = {c}x + {d}</span></p>
    },
    {
      id: 2,
      jsx: <p className="text-warning ms-3 small">Étape 1 : On veut regrouper les x. Enlevons {c}x à droite.</p>
    },
    {
      id: 3,
      jsx: (
        <p className="mb-3 ms-3 border-start ps-2">
          On fait <span className="text-danger">-{c}x</span> des deux côtés :<br/>
          <span >{a}x</span> <span className="text-danger">-{c}x</span> + {b} = <span>{c}x</span> <span className="text-danger">-{c}x</span> + {d}
        </p>
      )
    },
    {
      id: 5,
      jsx: <p className="mb-3">L'équation devient : <span className="text-info">{a - c}x + {b} = {d}</span></p>
    },
    {
      id: 6,
      jsx: <p className="text-warning ms-3 small">Étape 2 : Maintenant, occupons-nous du nombre +{b}.</p>
    },
    {
      id: 7,
      jsx: (
        <p className="mb-3 ms-3 border-start ps-2">
          On fait <span className="text-danger">-{b}</span> des deux côtés :<br/>
          {a - c}x + {b} <span className="text-danger">-{b}</span> = {d} <span className="text-danger">-{b}</span>
        </p>
      )
    },
    {
      id: 9,
      jsx: <p className="mb-3">L'équation devient : <span className="text-info">{a - c}x = {d - b}</span></p>
    },
    {
      id: 10,
      jsx: <p className="text-warning ms-3 small">Étape 3 : On cherche la valeur de x.</p>
    },
    {
      id: 11,
      jsx: (
        <p className="mb-3 ms-3 border-start ps-2">
          On divise par <span className="text-danger">{a - c}</span> pour laisser x tout seul :<br/>
          x = {d - b} <span className="text-danger"> / {a - c}</span>
        </p>
      )
    },
    {
      id: 12,
      jsx: <p className="fs-5 fw-bold text-success border border-success p-2 rounded text-center">✅ x = {sol}</p>
    }
  ];

  function etapeSuivante() {
    if (indexEtape < etapes.length) {
      setIndexEtape(indexEtape + 1);
    }
  }
  //valeur calculer dans l'exemple

  return (
    <>    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}

      className="card bg-dark text-light border-0 rounded-4 p-4 mb-5 shadow-sm"
    >
      <div className="card-body font-monospace"> {/* Police monospace pour le style code */}
        {etapes.slice(0, indexEtape).map((etape) => (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7,
              ease:"easeOut"}}
            key={etape.id} className="mb-3 ">
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
export default ExempleResolution2;