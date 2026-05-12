import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

function ExempleInteractif() {
  const [etape, setEtape] = useState(0);

  // Données de l'exemple
  const depart = 4;
  const multiplicateur = 2;
  const resultat = 8;

  useEffect(() => {
    // Chronologie de l'animation automatique
    const timer1 = setTimeout(() => setEtape(1), 1500); // Surlignage texte
    const timer2 = setTimeout(() => setEtape(2), 3000); // Déplacement carte
    const timer3 = setTimeout(() => setEtape(3), 5000); // Apparition curseur/calcul
    const timer4 = setTimeout(() => setEtape(4), 7000); // Résultat final

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="card bg-dark text-light border-0 rounded-4 p-4 shadow-lg position-relative overflow-hidden" style={{ minHeight: '450px' }}>

      {/* 1. Consigne avec Surlignage */}
      <div className="mb-4">
        <h6 className="text-primary small mb-2">Programme à résoudre :</h6>
        <p className={`fs-5 p-2 rounded transition-all ${etape === 1 ? 'bg-primary bg-opacity-25 border border-primary' : ''}`}>
          {etape >= 1 && <span className="me-2">✨</span>}
          Multiplier le nombre par {multiplicateur}
        </p>
      </div>

      <div className="text-center mb-5">
        <div className="d-inline-block p-2 bg-secondary bg-opacity-25 rounded border border-secondary mb-3">
          Nombre de départ : <span className="fw-bold text-info">{depart}</span>
        </div>

        {/* 2. Zone de dépôt et Résultat */}
        <div className="d-flex align-items-center justify-content-center gap-3 mt-4">

          {/* Emplacement Opération */}
          <div className="position-relative" style={{ width: '150px', height: '60px' }}>
            <div className="w-100 h-100 border border-dashed border-secondary rounded d-flex align-items-center justify-content-center  small">
              {etape < 2 ? "Vide" : ""}
            </div>

            {/* Animation de la carte qui vole toute seule */}
            <AnimatePresence>
              {etape >= 2 && (
                <motion.div
                  initial={{ x: 0, y: 200, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="position-absolute top-0 start-0 w-100 h-100 bg-info rounded d-flex align-items-center justify-content-center fw-bold shadow-lg"
                >
                  × {multiplicateur}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Emplacement Résultat */}
          <div className="position-relative" style={{ width: '80px', height: '60px' }}>
            <div className="w-100 h-100 bg-white rounded border d-flex align-items-center justify-content-center text-dark fw-bold fs-4">
              {etape >= 4 ? resultat : "..."}
            </div>

            {/* Simulation du Curseur de souris */}
            {etape === 3 && (
              <motion.div
                initial={{ x: 50, y: 50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                className="position-absolute text-primary fs-2"
                style={{ zIndex: 10, pointerEvents: 'none' }}
              >
                🖱️
                <motion.div
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="position-absolute bg-primary rounded-circle"
                  style={{ width: 20, height: 20, opacity: 0.3, top: 0, left: 0 }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Banque de cartes (en bas) */}
      <div className="mt-auto border-top border-secondary pt-3">
        <p className="small  mb-2 text-center">Banque d'opérations :</p>
        <div className="d-flex justify-content-center gap-2">
          {/* La carte qui va disparaître quand elle "monte" */}
          <div className={`p-2 bg-info rounded fw-bold opacity-${etape >= 2 ? '25' : '100'} transition-all`}>× {multiplicateur}</div>
          <div className="p-2 bg-info rounded fw-bold"> + 10 </div>
          <div className="p-2 bg-info rounded fw-bold"> : 5 </div>
        </div>
      </div>

      {/* Explication textuelle dynamique */}
      <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-primary bg-opacity-75 text-center small fw-bold">
        {etape === 0 && "L'automate va commencer..."}
        {etape === 1 && "1. Analyse de la consigne..."}
        {etape === 2 && "2. Déplacement de la carte correspondante..."}
        {etape === 3 && "3. Clic sur la case résultat..."}
        {etape === 4 && "4. Calcul effectué : 4 × 2 = 8 !"}
      </div>
    </div>
  );
}

export default ExempleInteractif;