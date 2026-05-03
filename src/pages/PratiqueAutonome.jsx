import React, { useState } from "react";
import logoRobot from "../assets/logo_robot.png";
import { envoyerMessage } from "../services/LitterAI_API.js";
import { useNavigate } from "react-router-dom";

function PratiqueAutonome() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(0); // 0: ax+b=c | 1: ax+b=cx+d
  const [currentEquation, setCurrentEquation] = useState(genererEquationNiveau0());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const goToModelage = () => {
    navigate("/modelage");
  };

  // --- LOGIQUE MATHÉMATIQUE ---
  function genererEquationNiveau0() {
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 1;
    let xSolution = Math.floor(Math.random() * 9) + 1;
    let c = a * xSolution + b;
    return { affichage: `${a}x + ${b} = ${c}`, solution: xSolution };
  }

  function genererEquationNiveau1() {
    let a, c, xSolution = Math.floor(Math.random() * 9) + 1;
    do {
      a = Math.floor(Math.random() * 8) + 2;
      c = Math.floor(Math.random() * 8) + 2;
    } while (a === c); // Évite l'annulation des x
    let b = Math.floor(Math.random() * 9) + 1;
    let d = (a * xSolution) + b - (c * xSolution);
    return {
      affichage: `${a}x ${b >= 0 ? '+ ' : '- '}${Math.abs(b)} = ${c}x ${d >= 0 ? '+ ' : '- '}${Math.abs(d)}`,
      solution: xSolution
    };
  }

  function genererEquationNiveau2() {
    // On choisit une solution entière entre 1 et 10
    const xSolution = Math.floor(Math.random() * 10) + 1;

    // On génère des coefficients avec une décimale (ex: 1.5, 2.2)
    // On multiplie par 10, on prend un entier, puis on divise par 10
    const a = (Math.floor(Math.random() * 40) + 11) / 10; // Entre 1.1 et 5.0
    const b = (Math.floor(Math.random() * 50) + 10) / 10; // Entre 1.0 et 5.9

    // On calcule c pour que ax + b = c
    // On utilise .toFixed(1) pour éviter les erreurs de précision binaire de JS
    const c = parseFloat((a * xSolution + b).toFixed(1));

    return {
      affichage: `${a.toString().replace('.', ',')}x + ${b.toString().replace('.', ',')} = ${c.toString().replace('.', ',')}`,
      solution: xSolution
    };
  }

  // --- ACTIONS IA ---
  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const nouveauMessage = { role: "user", content: messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?` };
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl. ÉQUATION : ${currentEquation.affichage}. RÉPONSE ÉLÈVE : ${reponseEleve}. SOLUTION : ${currentEquation.solution}. 
                Aide-le via le questionnement socratique sans donner la réponse.`
    };
    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
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
      // On utilise le générateur correspondant au niveau actuel
      if (niveau === 0) setCurrentEquation(genererEquationNiveau0());
      else if (niveau === 1) setCurrentEquation(genererEquationNiveau1());
      else setCurrentEquation(genererEquationNiveau2());
      setReponseEleve("");
      setMessage("");
      setIsCorrect(null);
      setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }



  return (
      <div className="container-fluid d-flex flex-row vh-100 bg-light p-0">
        <div className="flex-grow-1 p-4 d-flex flex-column align-items-center justify-content-center">
          <div className="card shadow-lg p-5 rounded-4 text-center border-0" style={{ maxWidth: '600px', width: '100%' }}>

            {!isFinished ? (
                <>
                  <div className="progress mb-4" style={{ height: '8px' }}>
                    <div className="progress-bar bg-primary" style={{ width: `${((exercice - 1) / 4) * 100}%` }}></div>
                  </div>
                  <h6 className="text-muted fw-bold text-uppercase small">Niveau {niveau} — Exercice {exercice} / 4</h6>
                  <h2 className="display-2 fw-bold my-4">{currentEquation.affichage}</h2>
                  <div className="d-flex gap-3 justify-content-center mb-4">
                    <input
                        type="number"
                        className="form-control form-control-lg text-center fw-bold"
                        style={{ maxWidth: '160px' }}
                        value={reponseEleve}
                        onChange={(e) => setReponseEleve(e.target.value)}
                        disabled={isCorrect === true}
                    />
                    {isCorrect !== true && <button className="btn btn-primary px-4 fw-bold shadow-sm" onClick={verifierReponse}>Valider</button>}
                  </div>
                  {message && (
                      <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'} rounded-4 py-3 shadow-sm`}>
                        <div className="fw-bold mb-3">{message}</div>
                        <button className={`btn ${isCorrect ? 'btn-success' : 'btn-outline-danger'} rounded-pill px-5 fw-bold`} onClick={exerciceSuivant}>
                          {exercice < 4 ? "Exercice suivant →" : "Voir mon bilan"}
                        </button>
                      </div>
                  )}
                </>
            ) : (
                <div className="animate__animated animate__fadeIn">
                  <h2 className="fw-bold mb-3">Bilan de la série</h2>
                  <div className="display-4 fw-bold mb-4">{score} / 4</div>

                  {(score / 4) >= 0.75 ? (
                      <div className="alert alert-success rounded-4 p-4">
                        <h5>Félicitations ! 🌟</h5>
                        <p>Tu maîtrises le niveau {niveau}. Prêt pour la suite ?</p>

                        <button className="btn btn-success rounded-pill px-5 fw-bold" onClick={() => {
                          const prochainNiveau = niveau + 1;
                          if (prochainNiveau <= 2) {
                            setNiveau(prochainNiveau);
                            setExercice(1);
                            setScore(0);
                            setIsFinished(false);

                            // Correctif : Forcer la génération immédiate selon le nouveau niveau
                            if (prochainNiveau === 1) {
                              setCurrentEquation(genererEquationNiveau1());
                            } else if (prochainNiveau === 2) {
                              setCurrentEquation(genererEquationNiveau2());
                            }

                            setReponseEleve("");
                            setMessage("");
                            setIsCorrect(null);
                            setConversationIA([]);
                          } else {
                            navigate("/");
                          }
                        }}>
                          {niveau < 2 ? `Passer au Niveau ${niveau + 1}` : "Terminer la mission"}
                        </button>
                      </div>
                  ) : (
                      <div className="alert alert-danger rounded-4 p-4">
                        <h5>Besoin d'un renforcement 💡</h5>
                        <p>Ton score est insuffisant. Une petite révision t'aidera !</p>
                        <button className="btn btn-danger rounded-pill px-5 fw-bold" onClick={goToModelage}>
                          Retourner au Modelage
                        </button>
                      </div>
                  )}
                </div>
            )}
          </div>
        </div>

        <div className="bg-white border-start shadow-sm d-flex flex-column" style={{ width: '420px' }}>
          <div className="p-4 border-bottom text-center bg-white">
            <img src={logoRobot} alt="Robot" style={{ width: '70px' }} />
            <h5 className="fw-bold mb-0 mt-2">LitterAl</h5>
          </div>
          <div className="flex-grow-1 overflow-auto p-4 bg-light">
            {isCorrect === false && !isFinished ? (
                <>
                  {conversationIA.filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
                      <div key={i} className={`mb-3 p-3 rounded-4 shadow-sm ${m.role === 'user' ? 'bg-primary text-white ms-4' : 'bg-white me-4 border'}`}>{m.content}</div>
                  ))}
                  {isWorking && <div className="text-muted small p-2"><div className="spinner-border spinner-border-sm me-2 text-primary"></div>LitterAl écrit...</div>}
                </>
            ) : (
                <div className="text-center text-muted mt-5 px-4">
                  <p className="fs-5">Je t'aiderai ici en cas d'erreur !</p>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default PratiqueAutonome;