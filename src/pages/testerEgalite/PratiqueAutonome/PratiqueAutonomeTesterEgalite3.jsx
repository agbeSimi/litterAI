import { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import logoRobot from "../../../assets/logo_robot.png";

function PratiqueAutonomeTesterEgalite3() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [equation, setEquation] = useState(null);
  const [progression, setProgression] = useState(0);

  const [inputGauche, setInputGauche] = useState("");
  const [inputDroite, setInputDroite] = useState("");
  const [calculGauche, setCalculGauche] = useState("");
  const [calculDroite, setCalculDroite] = useState("");

  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const totalQuestions = location.state?.totalQuestions || 4;

  function genererEquationNiveau3() {
    const xValeur = Math.floor(Math.random() * 4) + 2;
    const yValeur = Math.floor(Math.random() * 4) + 2;

    const a = (Math.floor(Math.random() * 4) + 1) * 0.5;
    const b = (Math.floor(Math.random() * 4) + 1) * 0.5;
    const c = (Math.floor(Math.random() * 5) + 1) * 0.5;

    let d, e, f;
    do {
      d = (Math.floor(Math.random() * 4) + 1) * 0.5;
      e = (Math.floor(Math.random() * 4) + 1) * 0.5;
      f = (Math.floor(Math.random() * 5) + 1) * 0.5;
    } while (a === d && b === e && c === f);

    const calculG = a * xValeur + b * yValeur + c;
    const calculD = d * xValeur + e * yValeur + f;

    const formatVisuel = (num) => num.toString().replace('.', ',');

    setEquation({
      x: xValeur,
      y: yValeur,
      gaucheTexte: `${formatVisuel(a)}x + ${formatVisuel(b)}y + ${formatVisuel(c)}`,
      droiteTexte: `${formatVisuel(d)}x + ${formatVisuel(e)}y + ${formatVisuel(f)}`,
      gaucheAttendu: `${a}*${xValeur}+${b}*${yValeur}+${c}`,
      droiteAttendu: `${d}*${xValeur}+${e}*${yValeur}+${f}`,
      resGaucheAttendu: calculG,
      resDroiteAttendu: calculD
    });

    setInputGauche("");
    setInputDroite("");
    setCalculGauche("");
    setCalculDroite("");
    setProgression(0);
    setMessage("");
    setIsCorrect(null);
    setConversationIA([]);
  }

  useEffect(() => {
    genererEquationNiveau3();
  }, []);

  async function discuterErreur(messageUtilisateur = "") {
    if (!equation) return;
    setIsWorking(true);

    let erreurContext ;
    if (progression === 0 || progression === 1) {
      erreurContext = `L'élève a fait une erreur de remplacement. Rappelle-lui qu'il doit remplacer la lettre x par ${equation.x} et la lettre y par ${equation.y}, en remettant les signes * explicites.`;
    } else {
      erreurContext = `L'élève a fait une erreur de calcul. Rappelle-lui de respecter les priorités opératoires : la multiplication passe toujours avant l'addition.`;
    }

    const nouveauMessage = { role: "user", content: messageUtilisateur || "Pourquoi ma proposition est fausse ?" };
    const historique = [...conversationIA, nouveauMessage];

    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, un tuteur socratique rigoureux pour un élève de 4ème.
      ÉGALITÉ ACTUELLE : ${equation.gaucheTexte} = ${equation.droiteTexte} pour x = ${equation.x} et y = ${equation.y}.
      CONTEXTE D'ERREUR : ${erreurContext}
      CONSIGNES :
      1. Reste bloqué sur l'étape actuelle (Étape ${progression}/4).
      2. Ne donne jamais la réponse directement.
      3. Utilise un langage simple, court et direct (2 lignes max). Pas de gras (**).`
    };

    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

  const nettoyer = (s) => s.replace(/\s/g, "").replace(/×/g, "*");

  function verifierReponse() {
    if (!equation) return;

    if (progression === 0) {
      if (nettoyer(inputGauche) === equation.gaucheAttendu) {
        setIsCorrect(null);
        setProgression(1);
        setMessage("");
      } else {
        setIsCorrect(false);
        setMessage("Ce n'est pas le bon remplacement à gauche. Exercice manqué !");
        discuterErreur(`J'ai proposé ${inputGauche} pour remplacer à gauche.`);
      }
    }
    else if (progression === 1) {
      if (nettoyer(inputDroite) === equation.droiteAttendu) {
        setIsCorrect(null);
        setProgression(2);
        setMessage("");
      } else {
        setIsCorrect(false);
        setMessage("Ce n'est pas le bon remplacement à droite. Exercice manqué !");
        discuterErreur(`J'ai proposé ${inputDroite} pour remplacer à droite.`);
      }
    }
    else if (progression === 2) {
      if (parseFloat(calculGauche.replace(',', '.')) === equation.resGaucheAttendu) {
        setIsCorrect(null);
        setProgression(3);
        setMessage("");
      } else {
        setIsCorrect(false);
        setMessage("Le calcul du membre de gauche est faux. Exercice manqué !");
        discuterErreur(`Je trouve ${calculGauche} pour le calcul à gauche.`);
      }
    }
    else if (progression === 3) {
      if (parseFloat(calculDroite.replace(',', '.')) === equation.resDroiteAttendu) {
        setScore(prev => prev + 1);
        setIsCorrect(true);
        setProgression(4);

        const resG = equation.resGaucheAttendu.toString().replace('.', ',');
        const resD = equation.resDroiteAttendu.toString().replace('.', ',');

        if (equation.resGaucheAttendu === equation.resDroiteAttendu) {
          setMessage(`Bravo pour les calculs ! ${resG} = ${resD}. L'égalité est donc VRAIE.`);
        } else {
          setMessage(`Bravo pour les calculs ! ${resG} ≠ ${resD}. L'égalité est donc FAUSSE.`);
        }
      } else {
        setIsCorrect(false);
        setMessage("Le calcul du membre de droite est faux. Exercice manqué !");
        discuterErreur(`Je trouve ${calculDroite} pour le calcul à droite.`);
      }
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1);
      genererEquationNiveau3();
    } else {
      setIsFinished(true);
    }
  }

  if (!equation) return null;

  return (
    <div className="container-fluid d-flex flex-column flex-md-row vh-100 bg-light p-0 overflow-hidden">

      <div className="flex-grow-1 p-3 p-md-4 d-flex flex-column align-items-center overflow-auto h-100">
        <div className="card shadow-lg p-3 p-md-5 rounded-4 text-center border-0 w-100 my-auto" style={{ maxWidth: '700px' }}>

          {!isFinished ? (
            <>
              <div className="progress mb-3 mb-md-4" style={{ height: '6px' }}>
                <div className="progress-bar bg-primary" style={{ width: `${((exercice - 1) / totalQuestions) * 100}%` }}></div>
              </div>

              <h6 className="text-muted fw-bold text-uppercase small">Niveau 3 — Ex {exercice} / {totalQuestions}</h6>

              <div className="bg-light p-3 rounded-4 border my-3 text-center w-100">
                <p className="small text-muted mb-1">Tester pour <span className="fw-bold text-primary">x = {equation.x} et y = {equation.y}</span> :</p>
                <h3 className="fw-bold text-dark mb-0">{equation.gaucheTexte} = {equation.droiteTexte}</h3>
              </div>

              <div className="row g-3 text-center mb-4">
                <div className="col-6">
                  <div className="p-3 rounded-4 border-start border-4 border-info bg-white shadow-sm">
                    <span className="text-info small text-uppercase fw-bold">Membre de gauche</span>
                    <div className="fs-5 my-2 fw-bold text-dark">{equation.gaucheTexte}</div>

                    {progression >= 0 && (
                      <div className="mt-2 text-start">
                        <label className="small text-muted mb-1">Remplacement :</label>
                        {progression > 0 ? <div className="fw-bold text-success text-center">{inputGauche}</div> : (
                          <input type="text" className="form-control text-center form-control-sm border-primary fw-bold" placeholder={`Ex: 2*${equation.x}+1,5*${equation.y}+3`} value={inputGauche} onChange={e => setInputGauche(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} />
                        )}
                      </div>
                    )}

                    {progression >= 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top text-start">
                        <label className="small text-muted mb-1">Résultat :</label>
                        {progression > 2 ? <div className="fw-bold text-success text-center">{calculGauche}</div> : (
                          <input type="text" className="form-control text-center form-control-sm border-primary fw-bold" value={calculGauche} onChange={e => setCalculGauche(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className={`p-3 rounded-4 border-start border-4 border-warning bg-white shadow-sm ${progression < 1 && isCorrect !== false ? 'opacity-50' : ''}`}>
                    <span className="text-warning small text-uppercase fw-bold">Membre de droite</span>
                    <div className="fs-5 my-2 fw-bold text-dark">{equation.droiteTexte}</div>

                    {(progression >= 1 || isCorrect === false) && (
                      <div className="mt-2 text-start">
                        <label className="small text-muted mb-1">Remplacement :</label>
                        {progression > 1 ? <div className="fw-bold text-success text-center">{inputDroite}</div> : (
                          <input type="text" className="form-control text-center form-control-sm border-primary fw-bold" value={inputDroite} onChange={e => setInputDroite(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
                        )}
                      </div>
                    )}

                    {(progression >= 3 || (isCorrect === false && progression >= 2)) && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top text-start">
                        <label className="small text-muted mb-1">Résultat :</label>
                        {progression > 3 ? <div className="fw-bold text-success text-center">{calculDroite}</div> : (
                          <input type="text" className="form-control text-center form-control-sm border-primary fw-bold" value={calculDroite} onChange={e => setCalculDroite(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {progression < 4 && isCorrect !== false && (
                <button className="btn btn-primary px-5 fw-bold shadow-sm mb-3" style={{ height: '50px' }} onClick={verifierReponse}>
                  Valider l'étape
                </button>
              )}

              {message && (
                <div className={`alert ${isCorrect === false ? 'alert-danger' : 'alert-success'} rounded-4 py-3 shadow-sm animate__animated animate__fadeIn`}>
                  <div className="fw-bold mb-2 small">{message}</div>
                  {(progression === 4 || isCorrect === false) && (
                    <button className={`btn ${isCorrect === false ? 'btn-danger' : 'btn-success'} rounded-pill px-5 fw-bold w-100 w-sm-auto`} onClick={exerciceSuivant}>
                      {exercice < totalQuestions ? "Suivant →" : "Voir bilan"}
                    </button>
                  )}
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
                    Terminer
                  </button>
                </div>
              ) : (
                <div className="alert alert-danger rounded-4 p-3 p-md-4">
                  <p className="small mb-3">Besoin de réviser la méthode.</p>
                  <button className="btn btn-danger rounded-pill px-4 fw-bold w-100" onClick={() => navigate("/PratiqueGuideTesterEgalite3")}>
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

export default PratiqueAutonomeTesterEgalite3;