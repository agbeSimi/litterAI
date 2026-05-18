import { useState, useMemo } from "react"; // Ajout de useMemo
import {DndContext} from "@dnd-kit/core";
import ZoneADeposer from "../composant/ZoneADeposer.jsx";
import CarteADeposer from "../composant/CarteADeposer.jsx";
import GenererProgramme from "../composant/GenerProgramme.jsx";
import {useNavigate} from "react-router-dom";
import {envoyerMessage} from "../../../services/LitterAI_API.js";
import logoRobot from "../../../assets/logo_robot.png";


function PratiqueAutonomeInteractif() {
  const [progression, setProgression] = useState(0); // On commence à l'index 0
  const [emplacements, setEmplacements] = useState({});
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [currentEquation, setCurrentEquation] = useState(GenererProgramme); // Retrait de setCurrentEquation si non utilisé
  const [inputEleve, setInputEleve] = useState("");

  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);


  const navigate = useNavigate();

  async function discuterErreur(msg = "") {
    setIsWorking(true);
    const promptSysteme = {
      role: "system",
      content: `RÔLE
    Tu es LitterAl, un sympathique tuteur de maths pour un élève de 4ème. Tu es bienveillant, encourageant et très simple dans tes explications.
    Ton but est de l'aider à compléter le programme de calcul sans jamais donner la réponse (symbole ou nombre) directement.
    
    CONTEXTE DE L'EXERCICE
    L'élève doit : 
    1. Glisser la bonne carte symbole (ex: + 5, * 2) correspondant à la consigne : "${etapes[progression].consigne}".
    2. Calculer le résultat en partant du nombre précédent : ${progression === 0 ? currentEquation.x : currentEquation.solutions[progression-1]}.
    
    MISSION : GUIDAGE PAS À PAS
    1. SI L'ERREUR VIENT DE LA CARTE (Drag & Drop) :
       - Rappelle la consigne actuelle : "${etapes[progression].consigne}".
       - Demande-lui quel symbole mathématique correspond au verbe utilisé (ex: "multiplier" -> "*", "soustraire" -> "-").
       - Invite-le à bien regarder toutes les cartes en bas, car il y a des pièges !
    
    2. SI L'ERREUR VIENT DU CALCUL (Input blanc) :
       - Repars du nombre précédent : ${progression === 0 ? currentEquation.x : currentEquation.solutions[progression-1]}.
       - Demande-lui d'effectuer l'opération de la carte qu'il vient de poser.
       - Exemple : "Tu es parti de 10 et tu as posé la carte + 5. Combien font 10 + 5 ?"
       - Si le calcul est complexe, suggère-lui de le poser au brouillon.
    
    3. LA RÉSOLUTION :
       - Une fois l'étape validée, félicite-le et encourage-le pour l'étape suivante.
    
    RÈGLES DE FORMATAGE STRICTES
    - INTERDICTION de copier les titres de tes instructions (ne dis jamais "Mission" ou "Rôle").
    - UNE SEULE QUESTION à la fois.
    - BRIÈVETÉ : 3 lignes maximum par message.
    - ZÉRO GRAS : N'utilise jamais de doubles étoiles (**).
    - SYMBOLES : Utilise * pour multiplier et / ou : pour diviser.
    - BIENVEILLANCE : Si l'élève se trompe plusieurs fois, donne un indice plus précis sur le calcul.`};
    const nouveauMessage = { role: "user", content: msg || "Je suis bloqué sur cette étape." };
    await envoyerMessage([promptSysteme, ...conversationIA, nouveauMessage], setConversationIA, "", () => {}, setIsWorking);
  }


  const etapes = [
    { id: 0, consigne: currentEquation.premierePartie, solution: currentEquation.solutions[0] },
    { id: 1, consigne: currentEquation.deuxiemePartie, solution: currentEquation.solutions[1] },
    { id: 2, consigne: currentEquation.troisiemePartie, solution: currentEquation.solutions[2] }
  ];

  // --- LOGIQUE INTERACTION ---

  // Mélanger les cartes une seule fois au début
  const cartesMelangees = useMemo(() => {
    // Les vraies cartes portent l'ID de leur index d'étape (0, 1 ou 2)
    const vraies = etapes.map((etape, index) => ({
      id: `vrai-${index}`, // ID unique par étape
      etapeRef: index,     // On garde une référence à l'étape
      affichage: index === 0 ? `× ${currentEquation.a}` :
        index === 1 ? `${currentEquation.operation} ${currentEquation.b}` :
          `${currentEquation.operationFinale === '*' ? '×' : ':'} ${currentEquation.c}`,
      consigneSource: etape.consigne // Pour la validation
    }));

    const leurres = [
      { id: "f1", affichage: `× ${currentEquation.a + 1}`, consigneSource: "fake" },
      { id: "f2", affichage: `${currentEquation.operation === "+" ? "-" : "+"} ${currentEquation.b}`, consigneSource: "fake" },
      { id: "f3", affichage: `: ${currentEquation.c + 1}`, consigneSource: "fake" }
    ];

    return [...vraies, ...leurres].sort(() => Math.random() - 0.5);
  }, [currentEquation]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const indexEtape = parseInt(over.id);

    const carteDansLaListe = cartesMelangees.find(c => c.id === active.id);

    if (carteDansLaListe && carteDansLaListe.consigneSource === etapes[indexEtape].consigne) {

      setEmplacements(prev => ({
        ...prev,
        [indexEtape]: carteDansLaListe.affichage
      }));
      setIsCorrect(true);
      setMessageErreur("");

    } else {
      setIsCorrect(false);
      setMessageErreur("Cette opération ne va pas ici !");
      discuterErreur("J'ai essayé de placer une carte mais ce n'est pas la bonne.");
    }
  }

  function verifierResultat() {
    if (parseInt(inputEleve) === etapes[progression].solution) {
      setProgression(prev => prev + 1);
      setInputEleve("");
      setMessageErreur("");
      setIsCorrect(true); // C'est juste
    } else {
      // CORRECTION ICI :
      setIsCorrect(false); // On ouvre le chat
      setMessageErreur("Le calcul est faux, réessaie !");
      discuterErreur(`Je pense que le résultat est ${inputEleve} mais ce n'est pas ça.`);
    }
  }

  function exerciceSuivant() {
    if (exercice < 4) {
      if (progression === 3) setScore(s => s + 1);
      setExercice(e => e + 1);
      setCurrentEquation(GenererProgramme());
      setProgression(0);
      setEmplacements({});
      setInputEleve("");
      setConversationIA([]);
    } else {
      setScore(s => s + (progression === 3 ? 1 : 0));
      setIsFinished(true);
    }

  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container-fluid d-flex flex-column flex-md-row vh-100 bg-light p-0 overflow-hidden">

        {/* ZONE GAUCHE : EXERCICE (Scrollable sur mobile) */}
        <div className="flex-grow-1 p-2 p-md-4 d-flex flex-column align-items-center overflow-auto h-100">
          <div className="card shadow-lg p-3 p-md-4 rounded-4 border-0 w-100 mb-3" style={{ maxWidth: '700px' }}>
            {!isFinished ? (
              <>
                <div className="progress mb-2" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" style={{ width: `${((exercice - 1) / 4) * 100}%` }}></div>
                </div>
                <h6 className="text-muted fw-bold small mb-3">Ex {exercice} / 4</h6>

                {/* Consignes dynamiques */}
                <div className="bg-light p-3 rounded-4 border shadow-sm mb-3 text-start mx-auto w-100">
                  <h6 className="text-primary border-bottom pb-2 fw-bold small">📜 Programme de calcul :</h6>
                  <ul className="list-unstyled mb-0 small">
                    {etapes.map((etape, idx) => (
                      <li key={idx} className={`${progression === idx ? "fw-bold text-dark" : "text-muted opacity-50"}`}>
                        {progression > idx ? "✅ " : (progression === idx ? "➡️ " : "• ")} {etape.consigne}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-2 rounded-3 mb-3 border text-center shadow-sm">
                  Nombre de départ : <span className="fs-3 fw-bold text-primary">{currentEquation.x}</span>
                </div>

                {/* Flow de calcul */}
                <div className="d-flex flex-column align-items-center gap-1 mb-4">
                  {etapes.map((etape, index) => (
                    <div key={index} className="w-100">
                      {index > 0 && <div className="text-muted text-center">⬇️</div>}
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <ZoneADeposer id={index} cardInside={emplacements[index]} />
                        <div className="border rounded-3 bg-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: '100px', height: '60px' }}>
                          {progression > index ? (
                            <span className="text-success fw-bold">{etape.solution}</span>
                          ) : (progression === index && emplacements[index]) ? (
                            <input
                              type="number"
                              className="form-control text-center fw-bold border-0 p-0"
                              value={inputEleve}
                              onChange={(e) => setInputEleve(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && verifierResultat()}
                              placeholder="?"
                            />
                          ) : <span className="text-muted opacity-25">...</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {progression === 3 ? (
                  <button className="btn btn-success rounded-pill px-5 fw-bold shadow-sm animate__animated animate__bounceIn w-100" onClick={exerciceSuivant}>
                    {exercice < 4 ? "Suivant →" : "Voir bilan"}
                  </button>
                ) : (
                  <div className="p-3 bg-white border rounded-4 w-100 shadow-sm">
                    <p className="small fw-bold text-muted mb-2 text-center">Choisis l'opération :</p>
                    <div className="d-flex flex-wrap justify-content-center gap-1">
                      {cartesMelangees.map((c) => {
                        // Si c'est une vraie carte, on vérifie si SON étape est déjà remplie
                        const estDejaPlacer = c.id.startsWith('vrai')
                          ? emplacements[c.etapeRef] !== undefined
                          : false; // Les leurres ne disparaissent jamais (ou comme tu veux)

                        return !estDejaPlacer && (
                          <CarteADeposer key={c.id} id={c.id} content={c.affichage} />
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* BILAN */
              <div className="text-center py-4">
                <h2 className="fw-bold mb-4">Bilan Final</h2>
                <div className="display-1 fw-bold text-primary mb-4">{score} / 4</div>
                {(score / 4) >= 0.75 ? (
                  <div className="alert alert-success rounded-4 border-0 shadow-sm p-4">
                    <p className="fw-bold">Excellent ! Module validé.</p>
                    <button className="btn btn-success rounded-pill px-5 fw-bold w-100" onClick={() => navigate("/calculLiteral")}>
                      Passer au Module 1
                    </button>
                  </div>
                ) : (
                  <div className="alert alert-danger rounded-4 border-0 shadow-sm p-4">
                    <p className="fw-bold">Besoin de revoir la méthode.</p>
                    <button className="btn btn-danger rounded-pill px-5 fw-bold w-100" onClick={() => navigate("/ModelageCalculLiteralPhase1")}>
                      Retour Modelage
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ZONE DROITE : CHAT (S'adapte en bas sur mobile) */}
        <div className="bg-white border-start shadow-sm d-flex flex-column h-100"
             style={{ width: '100%', maxWidth: '100%', flexBasis: '400px' }}>

          <div className="p-2 border-bottom text-center bg-white">
            <img src={logoRobot} alt="Robot" style={{ width: '40px' }} />
            <h6 className="fw-bold mb-0">LitterAl</h6>
          </div>

          <div className="flex-grow-1 overflow-auto p-3 bg-light d-flex flex-column">
            {isCorrect === false && !isFinished ? (
              <>
                {conversationIA.filter(m => m.role !== 'system').map((m, i) => (
                  <div key={i} className={`mb-2 p-2 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white ms-4' : 'bg-white me-4 border'}`}>
                    {m.content}
                  </div>
                ))}
                {isWorking && <div className="text-muted small p-2 text-center italic">LitterAl réfléchit...</div>}
              </>
            ) : (
              <div className="text-center text-muted mt-5 px-3">
                <p className="small">Je t'aide ici si tu bloques !</p>
              </div>
            )}
          </div>

          {messageErreur && (
            <div className="p-2 bg-danger text-white text-center small fw-bold">{messageErreur}</div>
          )}

          {isCorrect === false && !isFinished && (
            <div className="p-2 border-top bg-white">
              <div className="input-group shadow-sm rounded-pill overflow-hidden border">
                <input
                  type="text"
                  className="form-control border-0 px-3"
                  style={{ fontSize: '0.85rem' }}
                  placeholder="Réponds à LitterAl..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim() !== "") {
                      setIsCorrect(false); // On s'assure que le mode "Erreur/Chat" est actif
                      discuterErreur(e.target.value);
                      e.target.value = ""; // On vide l'input
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}

export default PratiqueAutonomeInteractif;