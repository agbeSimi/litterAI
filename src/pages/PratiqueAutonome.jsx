import React, { useState } from "react";
import logoRobot from "../assets/logo_robot.png";
import { envoyerMessage } from "../services/LitterAI_API.js";

function PratiqueAutonome() {
  // --- ÉTATS ---
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [currentEquation, setCurrentEquation] = useState(genererEquationNiveau0());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // --- LOGIQUE MATHÉMATIQUE (Nombres strictement positifs) ---
  function genererEquationNiveau0() {
    let a, b, xSolution, c;
    // On génère des nombres positifs pour le niveau 0 
    a = Math.floor(Math.random() * 8) + 2; // a entre 2 et 9
    b = Math.floor(Math.random() * 9) + 1; // b entre 1 et 9
    xSolution = Math.floor(Math.random() * 9) + 1; // x entre 1 et 9
    c = a * xSolution + b;

    return {
      affichage: `${a}x + ${b} = ${c}`,
      solution: xSolution
    };
  }

  // --- ACTIONS IA ---
  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);

    // Message de l'utilisateur (soit automatique à l'erreur, soit saisi dans le chat)
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?`;
    const nouveauMessage = { role: "user", content: contenuUser };
    const historique = [...conversationIA, nouveauMessage];

    // Prompt système strict pour éviter les hallucinations (le bug du "9") 
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, tuteur socratique. L'élève a fait une ERREUR.
                ÉQUATION : ${currentEquation.affichage}
                RÉPONSE ÉLÈVE : ${reponseEleve}
                VRAIE SOLUTION : ${currentEquation.solution}

                CONSIGNES :
                1. Ne mentionne que les nombres présents dans l'équation.
                2. Ne valide pas l'erreur (pas de "c'est bien").
                3. Pose une question courte sur l'opération inverse (+ devient -, * devient /).
                4. Ne donne JAMAIS la solution x = ${currentEquation.solution}.` 
  };

    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

  // --- LOGIQUE DE VALIDATION ---
  function verifierReponse() {
    const reponseNum = Number(reponseEleve);
    if (reponseNum === currentEquation.solution) {
      setScore(prev => prev + 1); 
      setIsCorrect(true);
      setMessage("Bravo ! C'est la bonne réponse."); 
      setConversationIA([]);
    } else {
      setIsCorrect(false);
      setMessage("Ce n'est pas ça. Regarde l'aide de LitterAl à droite !"); 
      discuterErreur(); // Lance la discussion automatiquement
    }
  }

  function exerciceSuivant() {
    if (exercice < 4) {
      setExercice(prev => prev + 1); 
      setCurrentEquation(genererEquationNiveau0());
      setReponseEleve("");
      setMessage("");
      setIsCorrect(null);
      setConversationIA([]);
    } else {
      const reussite = (score / 4) >= 0.75; 
      alert(reussite ? `Mission réussie ! Score : ${score}/4` : `Score : ${score}/4. Tu dois t'entraîner encore.`); 
      // Ici, ajouter la redirection vers l'accueil ou le modelage selon le score 
    }
  }

  return (
    <div className="container-fluid d-flex flex-row vh-100 bg-light p-0">

      {/* ZONE GAUCHE : EXERCICE ET PROGRESSION */}
      <div className="flex-grow-1 p-4 d-flex flex-column align-items-center justify-content-center">
        <div className="card shadow-lg p-5 rounded-4 text-center border-0" style={{ maxWidth: '600px', width: '100%' }}>

          <div className="progress mb-4" style={{ height: '8px' }}>
            <div className="progress-bar bg-primary" style={{ width: `${((exercice - 1) / 4) * 100}%` }}></div>
          </div>

          <h6 className="text-muted fw-bold text-uppercase small">Niveau 0 — Exercice {exercice} / 4</h6>
          <h2 className="display-2 fw-bold my-4 text-dark">{currentEquation.affichage}</h2>

          <div className="d-flex gap-3 justify-content-center mb-4">
            <input
              type="text"
              className="form-control form-control-lg border-2 text-center fw-bold"
              style={{ maxWidth: '160px', fontSize: '1.5rem' }}
              placeholder="x = ?"
              value={reponseEleve}
              onChange={(e) => setReponseEleve(e.target.value)}
              disabled={isCorrect === true}
            />
            {isCorrect !== true && (
              <button className="btn btn-primary px-4 fw-bold shadow-sm" onClick={verifierReponse}>Valider</button>
            )}
          </div>

          {/* MESSAGE ET BOUTON SUIVANT (Visible après validation, même si faux)  */}
          {message && (
            <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'} rounded-4 py-3 mt-2 shadow-sm animate__animated animate__fadeIn`}>
              <div className="fw-bold mb-3">{message}</div>
              <button className={`btn ${isCorrect ? 'btn-success' : 'btn-outline-danger'} rounded-pill px-5 fw-bold`} onClick={exerciceSuivant}>
                {exercice < 4 ? "Exercice suivant →" : "Terminer la mission"} 
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ZONE DROITE : CHAT AVEC LITTERAL */}
      <div className="bg-white border-start shadow-sm d-flex flex-column" style={{ width: '420px' }}>
        <div className="p-4 border-bottom text-center bg-white">
          <img src={logoRobot} alt="Robot" style={{ width: '70px' }} className={isWorking ? "opacity-50" : ""} />
          <h5 className="fw-bold mb-0 mt-2">LitterAl</h5>
          <small className="text-primary fw-bold">Tuteur Intelligent</small>
        </div>

        <div className="flex-grow-1 overflow-auto p-4 bg-light">
          {isCorrect === false ? (
            <>
              {conversationIA
                .filter(m => m.role !== 'system' && m.content.trim() !== "") // Filtre anti-bug 
                .map((m, i) => (
                  <div key={i} className={`mb-3 p-3 rounded-4 shadow-sm text-break ${
                    m.role === 'user' ? 'bg-primary text-white ms-4' : 'bg-white me-4 border'
                  }`}>
                    {m.content}
                  </div>
                ))
              }
              {isWorking && (
                <div className="text-muted small d-flex align-items-center p-2">
                  <div className="spinner-border spinner-border-sm me-2 text-primary"></div>
                  LitterAl réfléchit...
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-muted mt-5 px-4">
              <i className="bi bi-robot display-1 opacity-25"></i>
              <p className="mt-4 fs-5">Résous l'équation à gauche. Je t'aiderai ici si tu commets une erreur !</p> 
            </div>
          )}
        </div>

        {/* ENTRÉE DU CHAT (Actif seulement en cas d'erreur)  */}
        {isCorrect === false && (
          <div className="p-3 border-top bg-white">
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <input
                type="text"
                className="form-control border-0 px-4"
                placeholder="Pose une question au robot..."
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && e.target.value.trim() !== "") {
                    discuterErreur(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button className="btn btn-white border-0 text-primary">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PratiqueAutonome;