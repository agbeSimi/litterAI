import { useState } from "react";
import logoRobot from "../../../assets/logo_robot.png";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function PratiqueAutonomeCL1() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(1);
  const [currentEquation, setCurrentEquation] = useState(genererCalculLiteral());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const totalQuestions = location.state?.totalQuestions || 4;

  function genererCalculLiteral() {
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 1;
    let x = Math.floor(Math.random() * 5) + 1;
    let resultatAttendu = a * x + b;
    return {
      affichage: `${a} * x + ${b}`,
      solution: resultatAttendu,
      x: x,
      a: a,
      b: b
    };
  }

  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);

    const a = currentEquation.a;
    const b = currentEquation.b;
    const x = currentEquation.x;

    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?`;
    const nouveauMessage = { role: "user", content: contenuUser };
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, un tuteur socratique. 
      OBJECTIF : Faire calculer la valeur de l'expression ${a}x + ${b} pour x = ${x}.
      
      CONSIGNES :
      1. MISSION : Demande à l'élève de remplacer x par ${x} dans l'expression ${a}x + ${b} et de donner le résultat final.
      2. CALCUL ATTENDU : ${a} * ${x} + ${b} = ${currentEquation.solution}.
      3. SI L'ÉLÈVE SE TROMPE : Ne donne pas la réponse. Demande-lui d'abord combien font ${a} * ${x}.
      4. SI L'ÉLÈVE ÉCRIT NIMPORTE QUOI : Réponds : "Concentrons-nous sur le calcul. Si on remplace le x par ${x} dans ${a}x + ${b}, quel calcul obtient-on ?"
      5. VALIDATION FINALE : Une fois que l'élève a trouvé ${currentEquation.solution}, félicite-le et invite-le à cliquer sur le bouton bleu "Pratique autonome →" en haut à droite pour continuer.
      6. FORMATAGE : Pas de gras (**), pas d'étoiles. Utilise le signe * pour la multiplication.`
    };
    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

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
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1);
      setCurrentEquation(genererCalculLiteral());
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

      <div className="flex-grow-1 p-3 p-md-4 d-flex flex-column align-items-center overflow-auto h-100">
        <div className="card shadow-lg p-3 p-md-5 rounded-4 text-center border-0 w-100 my-auto" style={{ maxWidth: '600px' }}>

          {!isFinished ? (
            <>
              <div className="progress mb-3 mb-md-4" style={{ height: '6px' }}>
                <div className="progress-bar bg-primary" style={{ width: `${((exercice - 1) / totalQuestions) * 100}%` }}></div>
              </div>

              <h6 className="text-muted fw-bold text-uppercase small">Ex {exercice} / {totalQuestions}</h6>
              <h2 className="display-4 display-md-2 fw-bold my-3 my-md-4 text-dark">{currentEquation.affichage}</h2>
              <p> Quel est le resultat si on remplace X par <span className="fw-bold">{currentEquation.x}</span></p>

              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mb-3">
                <input
                  type="number"
                  className="form-control form-control-lg text-center fw-bold mx-auto mx-sm-0"
                  style={{ maxWidth: '160px', height: '60px', fontSize: '1.5rem' }}
                  value={reponseEleve}
                  onChange={(e) => setReponseEleve(e.target.value)}
                  disabled={isCorrect === true}
                />
                {isCorrect !== true && (
                  <button className="btn btn-primary px-4 fw-bold shadow-sm" onClick={verifierReponse}>
                    Valider
                  </button>
                )}
              </div>

              {message && (
                <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'} rounded-4 py-3 shadow-sm animate__animated animate__fadeIn`}>
                  <div className="fw-bold mb-2 small mb-md-3">{message}</div>
                  <button
                    className={`btn ${isCorrect ? 'btn-success' : 'btn-outline-danger'} rounded-pill px-4 px-md-5 fw-bold w-100 w-sm-auto`}
                    onClick={exerciceSuivant}
                  >
                    {exercice < totalQuestions ? "Suivant →" : "Voir bilan"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="animate__animated animate__fadeIn">
              <h2 className="fw-bold mb-2">Bilan</h2>
              <div className="display-3 fw-bold mb-3 text-primary">{score} / {totalQuestions}</div>

              {(score / totalQuestions) >= 0.75 ? (
                <div className="alert alert-success rounded-4 p-3 p-md-4">
                  <p className="small mb-3">Bravo ! Prêt pour la suite ?</p>
                  <button
                    className="btn btn-success rounded-pill px-4 fw-bold w-100"
                    onClick={() => {
                      const prochain = niveau + 1;
                      if (prochain <= 2) {
                        setNiveau(prochain);
                        setExercice(1);
                        setScore(0);
                        setIsFinished(false);
                        setReponseEleve("");
                        setMessage("");
                        setIsCorrect(null);
                        setConversationIA([]);
                        navigate("/modelageCalculLiteralPhase2");
                      } else {
                        navigate("/");
                      }
                    }}
                  >
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

      <div className="bg-white border-start shadow-sm d-flex flex-column h-100" style={{ width: '100%', maxWidth: '100%', flexBasis: '420px' }}>
        <div className="p-2 p-md-3 border-bottom text-center bg-white d-none d-md-block">
          <img src={logoRobot} alt="Robot" style={{ width: '50px' }} />
          <h6 className="fw-bold mb-0">LitterAl</h6>
        </div>

        <div className="flex-grow-1 overflow-auto p-3 bg-light">
          {isCorrect === false && !isFinished ? (
            <>
              {conversationIA.filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
                <div key={i} className={`mb-2 p-2 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white ms-4' : 'bg-white me-4 border'}`}>
                  {m.content}
                </div>
              ))}
              {isWorking && <div className="text-muted small p-2 text-center">LitterAl réfléchit...</div>}
            </>
          ) : (
            <div className="text-center text-muted mt-5">
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
                style={{ fontSize: '0.9rem' }}
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