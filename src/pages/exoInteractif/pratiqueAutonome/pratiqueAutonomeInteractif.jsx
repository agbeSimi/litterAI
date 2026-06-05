import { useState, useMemo } from "react";
import { DndContext } from "@dnd-kit/core";
import ZoneADeposer from "../composant/ZoneADeposer.jsx";
import CarteADeposer from "../composant/CarteADeposer.jsx";
import GenererProgramme from "../composant/GenerProgramme.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import logoRobot from "../../../assets/logo_robot.png";

function PratiqueAutonomeInteractif() {
  const [progression, setProgression] = useState(0);
  const [emplacements, setEmplacements] = useState({});
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [currentEquation, setCurrentEquation] = useState(GenererProgramme);
  const [inputEleve, setInputEleve] = useState("");

  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const totalQuestions = location.state?.totalQuestions || 4;

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

  const cartesMelangees = useMemo(() => {
    const vraies = etapes.map((etape, index) => ({
      id: `vrai-${index}`,
      etapeRef: index,
      affichage: index === 0 ? `× ${currentEquation.a}` :
        index === 1 ? `${currentEquation.operation} ${currentEquation.b}` :
          `${currentEquation.operationFinale === '*' ? '×' : ':'} ${currentEquation.c}`,
      consigneSource: etape.consigne
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
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setMessageErreur("Le calcul est faux, réessaie !");
      discuterErreur(`Je pense que le résultat est ${inputEleve} mais ce n'est pas ça.`);
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
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
      <div className="container-fluid d-flex flex-column flex-lg-row bg-light p-0 pt-5 mt-4 app-layout">

        <div className="p-3 p-md-5 d-flex flex-column align-items-center justify-content-center exercise-section">
          <div className="card shadow-lg p-4 p-md-5 rounded-4 text-center custom-exercise-card w-100" style={{ maxWidth: '700px' }}>
            {!isFinished ? (
              <>
                <div className="progress mb-4 rounded-pill bg-primary bg-opacity-10" style={{ height: '8px' }}>
                  <div className="progress-bar" style={{ width: `${((exercice - 1) / totalQuestions) * 100}%`, background: 'linear-gradient(45deg, #0d6efd, #6610f2)' }}></div>
                </div>

                <h6 className="text-secondary fw-bold text-uppercase small tracking-wider mb-4 opacity-75">
                  Ex {exercice} / {totalQuestions}
                </h6>

                <div className="bg-primary bg-opacity-10 border border-primary border-opacity-10 p-4 rounded-4 mb-4 text-start mx-auto w-100 shadow-sm">
                  <h6 className="text-primary fw-bolder mb-3 d-flex align-items-center gap-2">
                    <span className="fs-5">📜</span> Programme de calcul
                  </h6>
                  <ul className="list-unstyled mb-0 small">
                    {etapes.map((etape, idx) => (
                      <li key={idx} className={`mb-2 ${progression === idx ? "fw-bold text-dark fs-6" : "text-secondary opacity-75"}`}>
                        {progression > idx ? "✅ " : (progression === idx ? "➡️ " : "• ")} {etape.consigne}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-3 rounded-4 mb-4 border border-light text-center shadow-sm d-inline-block px-5 mx-auto">
                  <span className="text-secondary fw-medium me-2">Nombre de départ :</span>
                  <span className="fs-3 fw-bolder text-primary-gradient">{currentEquation.x}</span>
                </div>

                <div className="d-flex flex-column align-items-center gap-2 mb-4 w-100">
                  {etapes.map((etape, index) => (
                    <div key={index} className="w-100 d-flex flex-column align-items-center">
                      {index > 0 && <div className="text-primary opacity-25 my-1 fs-5 fw-bold">↓</div>}
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <ZoneADeposer id={index} cardInside={emplacements[index]} />
                        <div className="border border-light rounded-4 bg-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: '100px', height: '60px' }}>
                          {progression > index ? (
                            <span className="text-success fw-bolder fs-5">{etape.solution}</span>
                          ) : (progression === index && emplacements[index]) ? (
                            <input
                              type="number"
                              className="form-control text-center fw-bolder border-0 p-0 fs-5 text-primary custom-input-wrapper"
                              value={inputEleve}
                              onChange={(e) => setInputEleve(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && verifierResultat()}
                              placeholder="?"
                            />
                          ) : <span className="text-muted opacity-25 fs-5">...</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {progression === 3 ? (
                  <button className="btn btn-success btn-gradient-primary rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale w-100 mt-2" onClick={exerciceSuivant}>
                    {exercice < totalQuestions ? "Question Suivante →" : "Voir le Bilan"}
                  </button>
                ) : (
                  <div className="p-4 bg-white border border-light rounded-4 w-100 shadow-sm mt-2">
                    <p className="small fw-semibold text-secondary mb-3 text-center">Fais glisser l'opération correspondante :</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      {cartesMelangees.map((c) => {
                        const estDejaPlacer = c.id.startsWith('vrai') ? emplacements[c.etapeRef] !== undefined : false;
                        return !estDejaPlacer && (
                          <CarteADeposer key={c.id} id={c.id} content={c.affichage} />
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="animate__animated animate__fadeIn py-4">
                <h2 className="fw-bolder mb-2 custom-logo">Bilan de l'entraînement</h2>
                <div className="display-1 fw-bold mb-4 text-dark opacity-75">{score} <span className="fs-3 text-secondary">/ {totalQuestions}</span></div>
                {(score / totalQuestions) >= 0.75 ? (
                  <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-4 mt-4">
                    <p className="fw-semibold text-success mb-4">Excellent ! Tu as maîtrisé les programmes de calcul.</p>
                    <button className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale w-100" onClick={() => navigate("/calculLiteral")}>
                      Passer au Module Suivant 🚀
                    </button>
                  </div>
                ) : (
                  <div className="bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-4 p-4 mt-4">
                    <p className="fw-semibold text-danger mb-4">Encore quelques erreurs. Il faut réviser la méthode.</p>
                    <button className="btn btn-danger rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale w-100" onClick={() => navigate("/ModelageCalculLiteralPhase1")}>
                      Retour à la leçon 📖
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border-top border-lg-start border-lg-top-0 shadow-sm d-flex flex-column z-1 chat-sidebar">

          <div className="p-3 border-bottom text-center bg-white d-none d-lg-block shadow-sm z-1">
            <img src={logoRobot} alt="Robot" style={{ width: '45px' }} className="mb-1 logo-bounce cursor-pointer" onClick={() => navigate("/")} />
            <h6 className="fw-bolder mb-0 custom-logo fs-5">LitterAI</h6>
          </div>

          <div className="flex-grow-1 overflow-auto p-3 p-md-4 bg-light d-flex flex-column gap-3" style={{ scrollBehavior: 'smooth' }}>
            {isCorrect === false && !isFinished ? (
              <>
                {(conversationIA || []).filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
                  <div key={i} className={`d-flex ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`px-3 py-2 shadow-sm small chat-bubble ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white text-dark border-light custom-bot-bubble'}`} style={{ maxWidth: '85%', whiteSpace: 'pre-wrap' }}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {isWorking && (
                  <div className="d-flex justify-content-start">
                    <div className="px-3 py-2 shadow-sm small chat-bubble bg-white text-dark border-light custom-bot-bubble d-flex align-items-center gap-2 opacity-75">
                      <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                      <span className="fw-medium">LitterAI analyse...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted opacity-50 py-5 py-lg-0">
                <i className="bi bi-robot display-1 mb-3"></i>
                <p className="small text-center px-4 fw-medium">Fais glisser les cartes et calcule.<br />Je t'aiderai si tu te trompes !</p>
              </div>
            )}
          </div>

          {messageErreur && (
            <div className="p-2 bg-danger bg-opacity-10 border-top border-danger border-opacity-25 text-danger text-center small fw-semibold">
              {messageErreur}
            </div>
          )}

          {isCorrect === false && !isFinished && (
            <div className="p-3 p-md-4 border-top bg-white d-flex flex-column shadow-lg">
              <div className="d-flex align-items-center border border-light rounded-pill bg-light p-1 ps-3 shadow-sm custom-input-wrapper">
                <input
                  type="text"
                  className="form-control border-0 bg-transparent shadow-none py-2"
                  style={{ fontSize: '0.95rem' }}
                  placeholder="Réponds à LitterAI..."
                  disabled={isWorking}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim() !== "" && !isWorking) {
                      setIsCorrect(false);
                      discuterErreur(e.target.value);
                      e.target.value = "";
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