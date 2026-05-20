import { useState } from 'react';
import { motion } from "framer-motion";

function ExempleCalculFactorisation() {
  const [indexEtape, setIndexEtape] = useState(1);

  const etapes = [
    {
      id: 1,
      jsx: (
        <div>
          <p className="text-info fw-bold mb-1">💡 La méthode astucieuse (Factorisation) :</p>
          <p>Lorsqu'un même nombre se répète dans deux multiplications, on peut le "mettre en facteur" pour simplifier le calcul : a × k - b × k = (a - b) × k.</p>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 1</span> Identifier le facteur commun</p>
          <div className="text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <span className="text-warning small text-uppercase fw-bold">Calcul de départ</span><br />
            <span className="fs-5">13 × <span className="text-info fw-bold">5</span> - 3 × <span className="text-info fw-bold">5</span></span>
            <br /><br />
            <p className="text-light small mb-0">Le nombre <span className="text-info fw-bold">5</span> est présent dans les deux parties du calcul.</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 2</span> Mettre en facteur</p>
          <div className="text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <p className="text-light small mb-1">On place le facteur commun devant une parenthèse contenant le reste du calcul.</p>
            <span className="fs-5"><span className="text-info fw-bold">5</span> × (13 - 3)</span>
          </div>
        </div>
      )
    },
    {
      id: 4,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 3</span> Calculer la parenthèse</p>
          <div className="text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <p className="text-light small mb-1">On effectue l'opération entre parenthèses pour obtenir un nombre "rond".</p>
            <span className="fs-5">5 × <span className="text-success fw-bold">10</span></span>
          </div>
        </div>
      )
    },
    {
      id: 5,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 4</span> Résultat final</p>
          <div className="text-center p-3 border border-success rounded-3 bg-success bg-opacity-10">
            <p className="mb-1 text-success fw-bold fs-4">50</p>
            <p className="mb-0">C'est magique ! On a transformé deux multiplications en une seule opération très simple.</p>
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

export default ExempleCalculFactorisation;