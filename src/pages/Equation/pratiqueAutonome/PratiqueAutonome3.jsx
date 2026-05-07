import { useState } from "react";
import logoRobot from "../../../assets/logo_robot.png";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useNavigate } from "react-router-dom";

function PratiqueAutonome3() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(0); // 0: ax+b=c | 1: ax+b=cx+d | 2: décimaux
  const [currentEquation, setCurrentEquation] = useState(genererEquationNiveau2());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const goToModelage = () => {
    navigate("/modelage3");
  };


  function genererEquationNiveau2() {
    const xSolution = Math.floor(Math.random() * 10) + 1;
    const a = (Math.floor(Math.random() * 20) + 11) / 10;
    const b = (Math.floor(Math.random() * 10) + 10) / 10;
    const c = parseFloat((a * xSolution + b).toFixed(1));

    return {
      affichage: `${a}x + ${b} = ${c}`,
      solution: xSolution
    };
  }

  // --- ACTIONS IA ---
  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?`;
    const nouveauMessage = {role: "user", content: contenuUser};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, un tuteur socratique rigoureux pour un élève de 4ème. 
  ÉQUATION : ${currentEquation.affichage}.
  SOLUTION : ${currentEquation.solution}.

  CONSIGNES DE VALIDATION :
  1. SI L'ÉLÈVE ÉCRIT NIMPORTE QUOI (ex: "qdq", des lettres au hasard, ou des insultes) : Ne valide pas. Réponds simplement : "Je n'ai pas bien compris ta réponse. Concentrons-nous sur l'étape actuelle : que doit-on faire avec le ${currentEquation.affichage.includes('+') ? '+' : '-'}${currentEquation.affichage.split(/[+-]/)[1].split('=')[0].trim()} ?"
  2. NE JAMAIS INVENTER DE RÉPONSE : Si l'élève n'a pas donné le bon nombre ou la bonne opération, ne dis pas "C'est la bonne réponse".
  3. RESTE BLOQUÉ : Tant que l'élève ne propose pas une étape mathématique cohérente, repose la même question différemment.
  4. PAS DE RÉPONSE : Ne donne jamais x = ${currentEquation.solution}.
  5. LANGAGE : Simple et direct. Pas de phrases complexes sur le calcul symbolique.`

    };
    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {
    }, setIsWorking);
  }

  // --- LOGIQUE DE VALIDATION ---
  function verifierReponse() {
    if (Number(reponseEleve) === currentEquation.solution) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setMessage("Bravo ! C'est la bonne réponse.");
    } else {
      setIsCorrect(false);
      setMessage("Ce n'est pas ça. Regarde l'aide de LitterAl à droite !");
      discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < 4) {
      setExercice(prev => prev + 1);
      setCurrentEquation(genererEquationNiveau2());
      setReponseEleve("");
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

            <h6 className="text-muted fw-bold text-uppercase small">Niveau 3 — Ex {exercice} / 4</h6>
            <h2 className="display-4 display-md-2 fw-bold my-3 my-md-4 text-dark">{currentEquation.affichage}</h2>

            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mb-3">
              <input
                type="number"
                className="form-control form-control-lg text-center fw-bold mx-auto mx-sm-0"
                style={{maxWidth: '160px', height: '60px', fontSize: '1.5rem'}}
                value={reponseEleve}
                onChange={(e) => setReponseEleve(e.target.value)}
                disabled={isCorrect === true}
                placeholder="x = ?"
              />
              {isCorrect !== true && (
                <button className="btn btn-primary px-4 fw-bold shadow-sm" onClick={verifierReponse}>
                  Valider
                </button>
              )}
            </div>

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
                    setCurrentEquation(genererEquationNiveau2());
                    setReponseEleve("");
                    setMessage("");
                    setIsCorrect(null);
                    setConversationIA([]);
                    navigate("/modelage3")
                  } else {
                    navigate("/");
                  }
                }}>
                  {niveau < 2 ? "Bravo tu as terminer toute les phases" : "Terminer"}
                </button>
              </div>
            ) : (
              <div className="alert alert-danger rounded-4 p-3 p-md-4">
                <p className="small mb-3">Besoin de réviser la méthode.</p>
                <button className="btn btn-danger rounded-pill px-4 fw-bold w-100" onClick={goToModelage}>
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


export default PratiqueAutonome3;