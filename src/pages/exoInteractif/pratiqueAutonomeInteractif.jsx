import { useState, useMemo } from "react"; // Ajout de useMemo
import {DndContext} from "@dnd-kit/core";
import ZoneADeposer from "./composant/ZoneADeposer.jsx";
import CarteADeposer from "./composant/CarteADeposer.jsx";
import GenererProgramme from "./composant/GenerProgramme.jsx";

function PratiqueAutonomeInteractif() {
  const [progression, setProgression] = useState(0); // On commence à l'index 0
  const [emplacements, setEmplacements] = useState({});
  const [currentEquation] = useState(GenererProgramme); // Retrait de setCurrentEquation si non utilisé
  const [inputEleve, setInputEleve] = useState("");

  const etapes = [
    { id: 0, consigne: currentEquation.premierePartie, solution: currentEquation.solutions[0] },
    { id: 1, consigne: currentEquation.deuxiemePartie, solution: currentEquation.solutions[1] },
    { id: 2, consigne: currentEquation.troisiemePartie, solution: currentEquation.solutions[2] }
  ];

  // --- LOGIQUE INTERACTION ---

  // Mélanger les cartes une seule fois au début
  const cartesMelangees = useMemo(() => {
    // 1. On prépare les vraies cartes avec leurs symboles
    // On utilise l'id pour la comparaison et le texte pour l'affichage
    const vraies = [
      { id: etapes[0].consigne, affichage: `× ${currentEquation.a}` },
      { id: etapes[1].consigne, affichage: `${currentEquation.operation} ${currentEquation.b}` },
      { id: etapes[2].consigne, affichage: `${currentEquation.operationFinale === '*' ? '×' : ':'} ${currentEquation.c}` }
    ];

    // 2. On ajoute des leurres (fausses cartes)
    const leurres = [
      { id: "fake1", affichage: `× ${currentEquation.a + 1}` },
      { id: "fake2", affichage: `${currentEquation.operation === "+" ? "-" : "+"} ${currentEquation.b}` },
      { id: "fake3", affichage: `+ ${currentEquation.b + 3}` },
      { id: "fake4", affichage: `: ${currentEquation.c + 1}` },
      { id: "fake5", affichage: `× ${currentEquation.c + 2}` },
      { id: "fake6", affichage: `- ${currentEquation.b - 1}` }
    ];

    return [...vraies, ...leurres].sort(() => Math.random() - 0.5);
  }, [currentEquation]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const indexEtape = parseInt(over.id);

    // On vérifie si c'est la bonne carte pour CETTE étape
    if (active.id === etapes[indexEtape].consigne) {
      setEmplacements(prev => ({ ...prev, [indexEtape]: active.id }));
    } else {
      alert("Cette opération ne va pas ici !");
    }
  }

  function verifierResultat() {
    if (parseInt(inputEleve) === etapes[progression].solution) {
      setProgression(progression + 1);
      setInputEleve("");
    } else {
      alert("Calcul incorrect, recompte bien !");
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mt-5 text-center" style={{maxWidth: '600px'}}>
        <h2 className="mb-4">Programme de Calcul Interactif</h2>
        <div className="p-3 bg-light border rounded mb-4">
          <h3>Nombre de départ : <strong>{currentEquation.x}</strong></h3>
        </div>

        {etapes.map((etape, index) => (
          <div key={index} className="mb-4">
            <div className="fs-2">⬇️</div>
            <div className="d-flex align-items-center justify-content-center gap-3">

              {/* Zone Bleue (Opération) */}
              <ZoneADeposer id={index} cardInside={emplacements[index]} />

              {/* Case Blanche (Résultat) */}
              <div className="border rounded p-3 shadow-sm" style={{width: '100px', height: '60px', backgroundColor: 'white'}}>
                {progression > index ? (
                  <span className="text-success fw-bold">{etape.solution}</span>
                ) : (progression === index && emplacements[index]) ? (
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={inputEleve}
                    onChange={(e) => setInputEleve(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && verifierResultat()}
                    autoFocus
                  />
                ) : (
                  <span className="text-muted">?</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* BLOC DES INSTRUCTIONS (GUIDE) */}
        <div className="bg-light p-3 rounded border shadow-sm mb-4 text-start mx-auto" style={{maxWidth: '400px'}}>
          <h6 className="text-primary border-bottom pb-2">Programme de calcul :</h6>
          <ul className="list-unstyled mb-0">
            {etapes.map((etape, idx) => (
              <li key={idx} className={progression === idx ? "fw-bold text-dark" : "text-muted"}>
                {progression > idx ? "✅ " : "• "}
                {etape.consigne}
              </li>
            ))}
          </ul>
        </div>

        {/* Inventaire des cartes */}
        <div className="mt-5 p-3 border-top">
          <h5>Opérations à placer :</h5>
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            {cartesMelangees.map((carte) => (
              !Object.values(emplacements).includes(carte.id) && (
                <CarteADeposer key={carte.id}
                               id={carte.id} // L'ID reste le texte long pour la validation
                               content={carte.affichage} />
              )
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default PratiqueAutonomeInteractif;