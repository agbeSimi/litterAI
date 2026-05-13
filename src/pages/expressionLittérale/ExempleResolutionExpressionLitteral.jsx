import { useState, useEffect } from 'react';
import { motion } from "framer-motion";


function ExempleResolutionExpressionLitteral() {
  const [indexEtape, setIndexEtape] = useState(1);


  useEffect(() => {

  }, []);

  const etapes = [
    {
      id: 1,
      jsx: (
        <div>
          <p className="text-info fw-bold mb-1">🧹 Le grand ménage :</p>
          <p>En maths, on retire tout ce qui est inutile pour aller plus vite. Le signe <strong>×</strong> peut devenir invisible !</p>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Étape 1</span>
          On supprime le <strong>×</strong> devant une lettre : <br/>
          <del>(3 * x)</del> devient <span className="text-success fw-bold">3x</span>.
        </p>
      )
    },
    {
      id: 3,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Étape 2</span>
          On enlève les parenthèses inutiles. Comme la multiplication est prioritaire, <span className="text-success fw-bold">(3x) + 5</span> s'écrit simplement <span className="text-success fw-bold">3x + 5</span>.
        </p>
      )
    },
    {
      id: 4,
      jsx: (
        <p className="mb-0">
          <span className="badge bg-primary me-2">Étape 3</span>
          On réordonne : on place toujours les <strong>lettres devant</strong> les nombres seuls. C'est plus propre !
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

export default ExempleResolutionExpressionLitteral;