import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import BoutonSuivant from "./BoutonSuivant.jsx";

function ExempleResolution() {
  const [equation, setEquation] = useState({ a: 0, b: 0, c: 0, x: 0 });
  const[indexEtape, setIndexEtape] = useState(1);
  let nvlVal;


  function genererEquationAleatoire(){
    const valA = Math.floor(Math.random() * 4) + 2;
    const valB = Math.floor(Math.random() * 10) + 1;
    const valX = Math.floor(Math.random() * 5) + 1;
    const valC = valA * valX + valB;


    setEquation({ a: valA, b: valB, c: valC, x: valX });

  }

  useEffect(() => {
    genererEquationAleatoire();
  }, []);

  const etapes = [
    { id: 1,
      jsx:
        <p className="mb-2">1. Équation : <span className="text-info">{equation.a}x + {equation.b} = {equation.c}</span></p>
    },
    { id: 2,
      jsx:
        <p className="mb-4 text-warning ms-3">→ L'opposé de <span className="fw-bold">+{equation.b}</span> est <span className="fw-bold">-{equation.b}</span></p>
    },
    { id: 3, jsx:
        <p className="mb-2">2. On obtient : <span className="text-info">{equation.a}x = { nvlVal = equation.c - equation.b}</span></p>
    },
    { id: 4,
      jsx:
        <p className="mb-4 text-warning ms-3">→ La réciproque de <span className="fw-bold">×{equation.a}</span> est <span className="fw-bold">÷{equation.a}</span></p>
    },
    { id: 5,
      jsx:
        <p className="mb-0 fs-5">3. Solution : <span className="text-success fw-bold">x = {nvlVal / equation.a}</span> ✅</p>
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
    <BoutonSuivant
      onClick={etapeSuivante}
      visible={indexEtape<etapes.length}/>
    </>

  );
}
export default ExempleResolution;