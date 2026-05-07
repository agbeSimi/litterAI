import { useState } from "react";
import logoRobot from "../../../assets/logo_robot.png";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useNavigate } from "react-router-dom";

export default function PratiqueAutonomeCL3() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(0);
  const [currentEquation, setCurrentEquation] = useState(genererProgramme());
  const [reponseEtape1, setReponseEtape1] = useState("");
  const [reponseEtape2, setReponseEtape2] = useState("");
  const [reponseEtape3, setReponseEtape3] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();

  // --- LOGIQUE MATHÉMATIQUE ---
  function genererProgramme() {
    const operations = ['additionner', 'soustraire']
    const indexAleatoire = Math.floor(Math.random() * operations.length);
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 1;
    let x = Math.floor(Math.random() * 5) + 1;
    const operation = () => {
      if (indexAleatoire === 0)
        return `+`
      else return `-`
    }
    let resultatAttendu = `${a}*X${operation()}${b}`;
    const premierePartie = `Choisir X`
    const deuxiemePartie = `Multiplier par ${a}`
    const troisiemePartie = `${operations[indexAleatoire]} ${b}`
    return {
      affichage: `${a} * x + ${b}`,
      solution: resultatAttendu,
      x: x,
      a: a,
      b: b,
      premierePartie: premierePartie,
      deuxiemePartie: deuxiemePartie,
      troisiemePartie: troisiemePartie
    };
  }

  // --- ACTIONS IA ---
  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);

    const contenuUser = messageUtilisateur || `Je n'arrive pas à trouver les instructions pour ${currentEquation.solution}. J'ai écrit : 1) ${reponseEtape1}, 2) ${reponseEtape2}, 3) ${reponseEtape3}. Peux-tu m'aider ?`;    const nouveauMessage = {role: "user", content: contenuUser};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `RÔLE
      Tu es LitterAl, un sympathique tuteur de maths pour un élève de 4ème.
      Ton but est de l'aider à traduire une expression littérale (${currentEquation.solution}) en un programme de calcul en 3 étapes en français.
      
      MISSION : DÉCODER L'EXPRESSION
      1. PREMIER MESSAGE : 
         - Rassure l'élève.
         - Demande-lui : "Dans l'expression ${currentEquation.solution}, quelle est la toute première chose qu'on a choisie au départ ? (Indice : c'est la lettre !)"
         - ARRÊTE-TOI ICI.
      
      2. LE GUIDAGE PAS À PAS (Attends sa réponse) :
         - Étape 1 : S'il répond "x" ou "Choisir X", valide. Demande ensuite : "Parfait. Ensuite, regarde le calcul : on a ${currentEquation.a} * X. Quelle instruction en français correspond à ce bout de calcul ?"
         - Étape 2 : S'il répond "Multiplier par ${currentEquation.a}", félicite-le. Demande : "Génial ! Enfin, que signifie le ${currentEquation.troisiemePartie.replace(/[a-zA-Z\s]/g, '')} ${currentEquation.b} à la fin de l'expression ?"
         - Étape 3 : S'il trouve "additionner ${currentEquation.b}" (ou soustraire), c'est gagné.
      
      3. LA RÉSOLUTION :
         - Félicite-le et invite-le à corriger ses 3 cases sur la gauche pour valider.
      
      RÈGLES DE FORMATAGE STRICTES
      - INTERDICTION de copier les titres de tes instructions.
      - BRIÈVETÉ : 3 lignes maximum par message.
      - UNE SEULE QUESTION à la fois.
      - ZÉRO GRAS : N'utilise jamais de doubles étoiles (**).`
    };
    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {
    }, setIsWorking);
  }

  // Fonction pour nettoyer le texte (enlève les espaces multiples et met en minuscules)
  const nettoyerTexte = (texte) => texte.trim().toLowerCase().replace(/\s+/g, " ");
  // --- LOGIQUE DE VALIDATION ---
  function verifierReponse() {
    const etape1Attendue = nettoyerTexte("Choisir X");
    const etape2Attendue = nettoyerTexte(`Multiplier par ${currentEquation.a}`);
    const etape3Attendue = nettoyerTexte(`${currentEquation.troisiemePartie}`);

    const estEtape1Correcte = nettoyerTexte(reponseEtape1) === etape1Attendue;
    const estEtape2Correcte = nettoyerTexte(reponseEtape2) === etape2Attendue;
    const estEtape3Correcte = nettoyerTexte(reponseEtape3) === etape3Attendue;

    if (estEtape1Correcte && estEtape2Correcte && estEtape3Correcte) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setMessage("Bravo ! Tu as parfaitement décodé l'expression.");
    } else {
      setIsCorrect(false);
      setMessage("Il y a une erreur dans au moins l'une des étapes. Regarde l'aide de LitterAl !");
      discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < 4) {
      setExercice(prev => prev + 1);
      setCurrentEquation(genererProgramme());
      setReponseEtape1("");
      setReponseEtape2("");
      setReponseEtape3("");
      setMessage("");
      setIsCorrect(null);
      setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }

  return (
    <div className="container-fluid d-flex flex-column flex-md-row vh-100 bg-light p-0 overflow-hidden">

      {/* ZONE GAUCHE (HAUT SUR MOBILE) : EXERCICE */}
      <div
        className="flex-grow-1 p-3 p-md-4 d-flex flex-column align-items-center justify-content-center border-bottom border-md-0">
        <div className="card shadow-lg p-3 p-md-5 rounded-4 text-center border-0 w-100" style={{maxWidth: '600px'}}>

          {!isFinished ? (
            <>
              <div className="progress mb-3 mb-md-4" style={{height: '6px'}}>
                <div className="progress-bar bg-primary" style={{width: `${((exercice - 1) / 4) * 100}%`}}></div>
              </div>

              <h6 className="text-muted fw-bold text-uppercase small">Ex {exercice} / 4</h6>
              <p className="display-4 fw-bold text-primary my-4">
                {currentEquation.solution}
              </p>
              <p className="mb-4">Retrouve le programme de calcul correspondant :</p>

              <div className="d-flex flex-column gap-3 mb-4 mx-auto" style={{maxWidth: '350px'}}>
                <div className="input-group">
                  <span className="input-group-text fw-bold">Étape 1</span>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={reponseEtape1}
                    onChange={(e) => setReponseEtape1(e.target.value)}
                    placeholder="Ex: Choisir X"
                    disabled={isCorrect === true}
                  />
                </div>

                <div className="input-group">
                  <span className="input-group-text fw-bold">Étape 2</span>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={reponseEtape2}
                    onChange={(e) => setReponseEtape2(e.target.value)}
                    placeholder="Ex: Multiplier par 1"
                    disabled={isCorrect === true}
                  />
                </div>

                <div className="input-group">
                  <span className="input-group-text fw-bold">Étape 3</span>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={reponseEtape3}
                    onChange={(e) => setReponseEtape3(e.target.value)}
                    placeholder="Ex: additionner 5"
                    disabled={isCorrect === true}
                  />
                </div>
              </div>

              {isCorrect !== true && (
                <button className="btn btn-primary px-5 fw-bold shadow-sm mb-3" onClick={verifierReponse}>
                  Valider mon programme
                </button>
              )}

              {message && (
                <div
                  className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'} rounded-4 py-3 shadow-sm animate__animated animate__fadeIn`}>
                  <div className="fw-bold mb-2 small mb-md-3">{message}</div>
                  <button
                    className={`btn ${isCorrect ? 'btn-success' : 'btn-outline-danger'} rounded-pill px-4 px-md-5 fw-bold w-100 w-sm-auto`}
                    onClick={exerciceSuivant}>
                    {exercice < 4 ? "Suivant →" : "Voir bilan"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ÉCRAN BILAN ADAPTÉ */
            <div className="animate__animated animate__fadeIn">
              <h2 className="fw-bold mb-2">Bilan</h2>
              <div className="display-3 fw-bold mb-3 text-primary">{score} / 4</div>

              {(score / 4) >= 0.75 ? (
                <div className="alert alert-success rounded-4 p-3 p-md-4">
                  <p className="small mb-3">Bravo ! Prêt pour la suite ?</p>
                  <button className="btn btn-success rounded-pill px-4 fw-bold w-100" onClick={() => {
                    const prochain = niveau + 1;
                    if (prochain <= 2) {
                      setNiveau(prochain);
                      setExercice(1);
                      setScore(0);
                      setIsFinished(false);
                      setReponseEtape1("");
                      setReponseEtape2("");
                      setReponseEtape3("");
                      setMessage("");
                      setIsCorrect(null);
                      setConversationIA([]);
                    } else {
                      navigate("/");
                    }
                  }}>
                    {niveau < 2 ? "Niveau Suivant" : "Terminer"}
                  </button>
                </div>
              ) : (
                <div className="alert alert-danger rounded-4 p-3 p-md-4">
                  <p className="small mb-3">Besoin de réviser la méthode.</p>
                  <button className="btn btn-danger rounded-pill px-4 fw-bold w-100" onClick={() => navigate("/ModelageCalculLiteralPhase1")}>
                    Retour Modelage
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ZONE DROITE (BAS SUR MOBILE) : CHAT */}
      <div className="bg-white border-start shadow-sm d-flex flex-column"
           style={{width: '100%', maxWidth: '100%', height: '40vh', flexBasis: '420px'}}>
        <div className="p-2 p-md-3 border-bottom text-center bg-white d-none d-md-block">
          <img src={logoRobot} alt="Robot" style={{width: '50px'}}/>
          <h6 className="fw-bold mb-0">LitterAl</h6>
        </div>

        <div className="flex-grow-1 overflow-auto p-3 bg-light">
          {isCorrect === false && !isFinished ? (
            <>
              {conversationIA.filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
                <div key={i}
                     className={`mb-2 p-2 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white ms-4' : 'bg-white me-4 border'}`}>
                  {m.content}
                </div>
              ))}
              {isWorking && <div className="text-muted small p-2 text-center">LitterAl réfléchit...</div>}
            </>
          ) : (
            <div className="text-center text-muted mt-2">
              <p className="small">Je t'aide ici en cas d'erreur !</p>
            </div>
          )}
        </div>

        {isCorrect === false && !isFinished && (
          <div className="p-2 p-md-3 border-top bg-white">
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <input
                type="text"
                className="form-control border-0 px-3"
                style={{fontSize: '0.9rem'}}
                placeholder="Question au robot..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim() !== "") {
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
  );
}
