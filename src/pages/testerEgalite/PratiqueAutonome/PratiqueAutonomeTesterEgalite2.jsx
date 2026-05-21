import { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import logoRobot from "../../../assets/logo_robot.png";

function PratiqueAutonomeTesterEgalite2() {

    const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(2);
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

  // Si l'élève vient de la machine, on prend son choix (5 à 10). Sinon (parcours normal), c'est 4.
  const totalQuestions = location.state?.totalQuestions || 4;

  function genererEquationIdentique() {
    const xValeur = Math.floor(Math.random() * 5) + 2; // Valeur de x entière entre 2 et 6

    // Génération de coefficients décimaux "sympas" (se terminant par ,0 ou ,5)
    const a = (Math.floor(Math.random() * 5) + 1) * 0.5;
    const b = (Math.floor(Math.random() * 5) + 1) * 0.5;

    let c = (Math.floor(Math.random() * 5) + 1) * 0.5;
    // On évite d'avoir exactement le même coefficient pour x des deux côtés
    while (c === a) {
      c = (Math.floor(Math.random() * 5) + 1) * 0.5;
    }

    const d = (Math.floor(Math.random() * 5) + 1) * 0.5;

    // Calcul indépendant des deux membres (les résultats peuvent être différents)
    const calculG = Number((a * xValeur + b).toFixed(1));
    const calculD = Number((c * xValeur + d).toFixed(1));

    const formatVisuel = (num) => num.toString().replace('.', ',');

    setEquation({
      x: xValeur,
      gaucheTexte: `${formatVisuel(a)}x + ${formatVisuel(b)}`,
      droiteTexte: `${formatVisuel(c)}x + ${formatVisuel(d)}`,
      gaucheAttendu: `${a}*${xValeur}+${b}`,
      droiteAttendu: `${c}*${xValeur}+${d}`,
      resGaucheAttendu: calculG, // Résultat propre à gauche
      resDroiteAttendu: calculD  // Résultat propre à droite
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
    genererEquationIdentique();
  }, []);

  async function discuterErreur(messageUtilisateur = "") {
    if (!equation) return;
    setIsWorking(true);

    let erreurContext ;
    if (progression === 0 || progression === 1) {
      erreurContext = `L'élève a fait une erreur de remplacement. Rappelle-lui qu'il doit remplacer la lettre x par ${equation.x} et remettre le signe * explicite entre le nombre et la lettre.`;
    } else {
      // CORRECTION ICI : On ne parle plus des parenthèses
      erreurContext = `L'élève a fait une erreur de calcul. Rappelle-lui de respecter les priorités opératoires : la multiplication passe toujours avant l'addition.`;
    }

    const nouveauMessage = { role: "user", content: messageUtilisateur || "Pourquoi ma proposition est fausse ?" };
    const historique = [...conversationIA, nouveauMessage];

    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, un tuteur socratique rigoureux pour un élève de 4ème.
      ÉGALITÉ ACTUELLE : ${equation.gaucheTexte} = ${equation.droiteTexte} pour x = ${equation.x}.
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
      // Remplacement de parseInt par parseFloat pour gérer les décimaux (, ou .)
      const valeurSaisie = parseFloat(calculGauche.toString().replace(',', '.'));

      if (valeurSaisie === equation.resGaucheAttendu) {
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
      // Même chose pour le côté droit
      const valeurSaisie = parseFloat(calculDroite.toString().replace(',', '.'));

      if (valeurSaisie === equation.resDroiteAttendu) {
        setScore(prev => prev + 1);
        setIsCorrect(true);
        setProgression(4);

        const resG = equation.resGaucheAttendu.toString().replace('.', ',');
        const resD = equation.resDroiteAttendu.toString().replace('.', ',');

        if (equation.resGaucheAttendu === equation.resDroiteAttendu) {
          setMessage(`Bravo ! ${resG} = ${resD}. L'égalité est VRAIE.`);
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
      genererEquationIdentique();
    } else {
      setIsFinished(true);
    }
  }

  if (!equation) return null;

  return (
    <div className="container-fluid d-flex flex-column flex-md-row vh-100 bg-light p-0 overflow-hidden">

      <div className="flex-grow-1 p-3 p-md-4 d-flex flex-column align-items-center justify-content-center border-bottom border-md-0">
        <div className="card shadow-lg p-3 p-md-5 rounded-4 text-center border-0 w-100" style={{ maxWidth: '700px' }}>

          {!isFinished ? (
            <>
              <div className="progress mb-3 mb-md-4" style={{ height: '6px' }}>
                <div className="progress-bar bg-primary" style={{ width: `${((exercice - 1) / totalQuestions) * 100}%` }}></div>
              </div>

              <h6 className="text-muted fw-bold text-uppercase small">Niveau 2 — Ex {exercice} / {totalQuestions}</h6>

              <div className="bg-light p-3 rounded-4 border my-3 text-center w-100">
                <p className="small text-muted mb-1">Tester pour <span className="fw-bold text-primary">x = {equation.x}</span> :</p>
                <h3 className="fw-bold text-dark mb-0">{equation.gaucheTexte} = {equation.droiteTexte}</h3>
              </div>

              <div className="row g-3 text-center mb-4">

                <div className="col-6">
                  <div className={`p-3 rounded-4 border-start border-4 border-info bg-white shadow-sm`}>
                    <span className="text-info small text-uppercase fw-bold">Membre de gauche</span>
                    <div className="fs-5 my-2 fw-bold text-dark">{equation.gaucheTexte}</div>

                    {progression >= 0 && (
                      <div className="mt-2 text-start">
                        <label className="small text-muted mb-1">Remplacement :</label>
                        {progression > 0 ? <div className="fw-bold text-success text-center">{inputGauche}</div> : (
                          <input type="text" className="form-control text-center form-control-sm border-primary fw-bold" placeholder="Ex: 2*4+1" value={inputGauche} onChange={e => setInputGauche(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} />
                        )}
                      </div>
                    )}

                    {progression >= 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top text-start">
                        <label className="small text-muted mb-1">Résultat :</label>
                        {progression > 2 ? <div className="fw-bold text-success text-center">{calculGauche}</div> : (
                          <input type="number" className="form-control text-center form-control-sm border-primary fw-bold" value={calculGauche} onChange={e => setCalculGauche(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
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
                          <input type="number" className="form-control text-center form-control-sm border-primary fw-bold" value={calculDroite} onChange={e => setCalculDroite(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
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
                  <button className="btn btn-success rounded-pill px-4 fw-bold w-100" onClick={() => {
                    const prochain = niveau + 1;
                    if (prochain <= 3) {
                      setNiveau(prochain);
                      setScore(0);
                      setIsFinished(false);
                      navigate("/PratiqueGuideTesterEgalite3");
                    } else {
                      navigate("/");
                    }
                  }}>
                    {niveau < 3 ? "Niveau Suivant -> Phase 3" : "Terminer"}
                  </button>
                </div>
              ) : (
                <div className="alert alert-danger rounded-4 p-3 p-md-4">
                  <p className="small mb-3">Besoin de réviser la méthode.</p>
                  <button className="btn btn-danger rounded-pill px-4 fw-bold w-100" onClick={() => navigate("/ModelageTesterEgalite2")}>
                    Retour Modelage
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-start shadow-sm d-flex flex-column" style={{ width: '100%', maxWidth: '100%', height: '40vh', flexBasis: '420px' }}>
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


export default PratiqueAutonomeTesterEgalite2