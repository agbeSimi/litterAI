import  { useState } from 'react';
import { motion } from "framer-motion";

function ExempleTesterEgalite() {
  const [valeurs] = useState({ x: 3 });
  const [indexEtape, setIndexEtape] = useState(1);

  const etapes = [
    {
      id: 1,
      jsx: (
        <div>
          <p className="text-info fw-bold mb-1">⚖️ La méthode stricte :</p>
          <p>Pour vérifier une égalité, on ne calcule jamais tout en même temps. On coupe l'expression en deux parties distinctes.</p>
        </div>
      )
    },
    {
      id: 2,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 1</span> Séparer l'égalité</p>
          <div className="row text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <div className="col-6 border-end border-secondary">
              <span className="text-warning small text-uppercase fw-bold">Membre de gauche</span><br />
              <span className="fs-5">2x + 5</span>
            </div>
            <div className="col-6">
              <span className="text-warning small text-uppercase fw-bold">Membre de droite</span><br />
              <span className="fs-5">3x + 2</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 2</span> Remplacer la lettre par {valeurs.x}</p>
          <div className="row text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <div className="col-6 border-end border-secondary">
              <span className="fs-5">2 × <span className="text-info fw-bold">{valeurs.x}</span> + 5</span>
            </div>
            <div className="col-6">
              <span className="fs-5">3 × <span className="text-info fw-bold">{valeurs.x}</span> + 2</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 3</span> Calculer séparément</p>
          <div className="row text-center border rounded-3 p-3 bg-secondary bg-opacity-25">
            <div className="col-6 border-end border-secondary">
              <span className="fs-5">6 + 5 = <span className="text-success fw-bold">11</span></span>
            </div>
            <div className="col-6">
              <span className="fs-5">9 + 2 = <span className="text-success fw-bold">11</span></span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      jsx: (
        <div>
          <p className="mb-2"><span className="badge bg-primary me-2">Étape 4</span> Comparer</p>
          <div className="text-center p-3 border border-success rounded-3 bg-success bg-opacity-10">
            <p className="mb-1 text-success fw-bold fs-4">11 = 11</p>
            <p className="mb-0">Les deux résultats sont identiques. L'égalité est <span className="fw-bold">VRAIE</span> pour x = {valeurs.x}.</p>
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
export default ExempleTesterEgalite;