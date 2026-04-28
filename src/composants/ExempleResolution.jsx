import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

function ExempleResolution() {
  const [equation, setEquation] = useState({ a: 0, b: 0, c: 0, x: 0 });

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

  //valeur calculer dans l'exemple
  let nvlVal;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}

      className="card bg-dark text-light border-0 rounded-4 p-4 mb-5 shadow-sm"
    >
      <div className="card-body font-monospace"> {/* Police monospace pour le style code */}

        {/* Étape 1 */}
        <p className="mb-2">1. Équation : <span className="text-info">{equation.a} * x + {equation.b} = {equation.c}</span></p>
        <p className="mb-4 text-warning ms-3">→ L'opposé de <span className="fw-bold">+{equation.b}</span> est <span className="fw-bold">-{equation.b}</span></p>

        {/* Étape 2 */}
        <p className="mb-2">2. On obtient : <span className="text-info">{equation.a} * x = { nvlVal = equation.c - equation.b}</span></p>
        <p className="mb-4 text-warning ms-3">→ La réciproque de <span className="fw-bold">×{equation.a}</span> est <span className="fw-bold">÷{equation.a}</span></p>

        {/* Solution */}
        <p className="mb-0 fs-5">3. Solution : <span className="text-success fw-bold">x = {nvlVal / equation.a}</span> ✅</p>
      </div>
    </motion.div>

  );
}
export default ExempleResolution;