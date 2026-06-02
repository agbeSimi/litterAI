import { useState } from "react";
import logoRobot from "../../../assets/logo_robot.png";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";

function PratiqueAutonomeDevExp3() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau] = useState(3);
  const [currentEquation, setCurrentEquation] = useState(genererExpressionNiveau3());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const location = useLocation();
  const totalQuestions = location.state?.totalQuestions || 4;
  const navigate = useNavigate();

  const goToModelage = () => {
    navigate("/modelage");
  };

  function genererExpressionNiveau3() {
    const type = Math.random() < 0.5 ? 1 : 2;
    const variables = ['a', 'b', 'x', 'y'];

    if (type === 1) {
      const a = Math.floor(Math.random() * 8) + 2;
      const shuffledVars = [...variables].sort(() => 0.5 - Math.random());
      const v1 = shuffledVars[0];
      const v2 = shuffledVars[1];

      const affichage = `${a}(${v1} + ${v2})`;
      const solution = `${a}${v1} + ${a}${v2}`;

      return { affichage, solution };
    } else {
      const baseDecimal = Math.floor(Math.random() * 9) + 2;
      const aDecimal = baseDecimal + 0.5;
      const aStr = aDecimal.toString().replace('.', ',');

      const b = Math.floor(Math.random() * 9) + 2;
      const varUnique = variables[Math.floor(Math.random() * variables.length)];

      const affichage = `${aStr}(${b} + ${varUnique})`;

      const produitB = aDecimal * b;
      const produitBStr = produitB.toString().replace('.', ',');
      const solution = `${produitBStr} + ${aStr}${varUnique}`;

      return { affichage, solution };
    }
  }

  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?`;
    const nouveauMessage = {role: "user", content: contenuUser};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAI, un tuteur socratique en mathématiques. L'élève s'est trompé en essayant de développer une expression avec la distributivité (niveau 1).
      EXPRESSION À DÉVELOPPER : ${currentEquation.affichage}.
      SOLUTION ATTENDUE : ${currentEquation.solution}.
      
      CONSIGNES DE VALIDATION ET DE GUIDAGE :
      1. SI L'ÉLÈVE ÉCRIT N'IMPORTE QUOI (ex: lettres au hasard, insultes, hors-sujet) : Ne valide pas. Réponds simplement : "Je n'ai pas bien compris ta réponse. Concentrons-nous sur l'expression : quel est le nombre placé devant la parenthèse qui va être distribué ?"
      2. NE DONNE JAMAIS LA RÉPONSE DIRECTEMENT : Ne donne pas la solution complète (${currentEquation.solution}). Ton rôle est uniquement de l'aiguiller pour qu'il la trouve par lui-même.
      3. RAPPEL DU MÉCANISME : Utilise l'analogie du "fléchage" ou du nombre "attaquant" vue dans la leçon (ex: "Rappelle-toi, le nombre collé devant la parenthèse doit attaquer le premier nombre à l'intérieur, puis le deuxième").
      4. RESTE BLOQUÉ SUR L'ÉTAPE : Pose une seule question à la fois pour le débloquer (ex: "Quelle est la première multiplication que tu dois faire pour commencer ?") et attends sa réponse pour avancer pas à pas.
      5. LANGAGE : Simple, direct et très concis (2 à 3 phrases maximum).`
    };
    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

  function verifierReponse() {
    const reponsePropre = reponseEleve.replace(/\s+/g, "").replace(/\./g, ",");
    const solutionPropre = currentEquation.solution.replace(/\s+/g, "");

    if (reponsePropre === solutionPropre) {
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
      setCurrentEquation(genererExpressionNiveau3());
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

      {/* ZONE GAUCHE : EXERCICE */}
      <div className="flex-grow-1 p-3 p-md-4 d-flex flex-column align-items-center overflow-auto h-100">
        <div className="card shadow-lg p-3 p-md-5 rounded-4 text-center border-0 w-100 my-auto" style={{ maxWidth: '600px' }}>

          {!isFinished ? (
            <>
              <div className="progress mb-3 mb-md-4" style={{ height: '6px' }}>
                <div className="progress-bar bg-primary" style={{ width: `${((exercice - 1) / totalQuestions) * 100}%` }}></div>
              </div>

              <h6 className="text-muted fw-bold text-uppercase small">Niveau {niveau} — Ex {exercice} / {totalQuestions}</h6>
              <h2 className="display-4 display-md-2 fw-bold my-3 my-md-4 text-dark">{currentEquation.affichage}</h2>

              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg text-center fw-bold mx-auto mx-sm-0"
                  style={{ maxWidth: '200px', height: '60px', fontSize: '1.5rem' }}
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
                    onClick={exerciceSuivant}>
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
                  <button className="btn btn-success rounded-pill px-4 fw-bold w-100" onClick={() => navigate("/")}>
                    Terminer le module
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

      {/* ZONE DROITE : CHAT */}
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
export default PratiqueAutonomeDevExp3;