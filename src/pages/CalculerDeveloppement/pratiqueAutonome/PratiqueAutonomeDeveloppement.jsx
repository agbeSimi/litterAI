import { useState } from "react";
import logoRobot from "../../../assets/logo_robot.png";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function PratiqueAutonomeDeveloppement() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(0);
  const [currentCalcul, setCurrentCalcul] = useState(genererCalculDeveloppement());

  const [etape1, setEtape1] = useState("");
  const [etape2, setEtape2] = useState("");
  const [etape3, setEtape3] = useState("");

  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const totalQuestions = location.state?.totalQuestions || 4;

  function genererCalculDeveloppement() {
    let base = 100;
    let offset = Math.floor(Math.random() * 8) + 2;
    let n1 = base + offset;
    let n2 = Math.floor(Math.random() * 15) + 11;
    let resultatAttendu = n1 * n2;

    return {
      affichage: `${n1} * ${n2}`,
      solution: resultatAttendu,
      n1: n1,
      n2: n2,
      base: base,
      offset: offset
    };
  }

  async function discuterErreur(feedbackErreur) {
    setIsWorking(true);

    const n1 = currentCalcul.n1;
    const n2 = currentCalcul.n2;
    const base = currentCalcul.base;
    const offset = currentCalcul.offset;

    const nouveauMessage = { role: "user", content: `Je suis bloqué. ${feedbackErreur}` };
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, un tuteur socratique. 
      OBJECTIF : Faire calculer astucieusement ${n1} * ${n2} en 3 étapes.
      
      STATUT DE L'ÉLÈVE : ${feedbackErreur}
      - Étape 1 saisie : "${etape1}" (Attendu: ${base} + ${offset})
      - Étape 2 saisie : "${etape2}" (Attendu: ${base * n2} + ${offset * n2})
      - Étape 3 saisie : "${etape3}" (Attendu: ${currentCalcul.solution})
      
      CONSIGNES :
      1. Concentre-toi UNIQUEMENT sur l'étape qui est incorrecte (indiquée dans le statut).
      2. Ne donne jamais la bonne réponse.
      3. Si c'est l'étape 1 : Demande comment décomposer ${n1} avec une centaine.
      4. Si c'est l'étape 2 : Demande de multiplier ${base} par ${n2}, puis ${offset} par ${n2}.
      5. Si c'est l'étape 3 : Demande d'additionner les deux résultats de l'étape 2.
      6. FORMATAGE : Pas de gras, pas d'étoiles multiples. Utilise * pour multiplier.`
    };

    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

  function verifierReponse() {
    const e1 = etape1.replace(/\s+/g, '').replace(/[()]/g, '');
    const e2 = etape2.replace(/\s+/g, '');
    const e3 = Number(etape3);

    const expE1_A = `${currentCalcul.base}+${currentCalcul.offset}`;
    const expE1_B = `${currentCalcul.offset}+${currentCalcul.base}`;
    const isE1Correct = (e1 === expE1_A || e1 === expE1_B);

    const part1 = currentCalcul.base * currentCalcul.n2;
    const part2 = currentCalcul.offset * currentCalcul.n2;
    const expE2_A = `${part1}+${part2}`;
    const expE2_B = `${part2}+${part1}`;
    const isE2Correct = (e2 === expE2_A || e2 === expE2_B);

    const isE3Correct = (e3 === currentCalcul.solution);

    if (isE1Correct && isE2Correct && isE3Correct) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setMessage("Bravo ! Les 3 étapes sont parfaitement exécutées.");
    } else {
      setIsCorrect(false);
      let feedback = "";
      if (!isE1Correct) feedback = "L'étape 1 (décomposer le premier nombre) est incorrecte ou vide.";
      else if (!isE2Correct) feedback = "L'étape 2 (calculer la multiplication de chaque partie) est incorrecte.";
      else if (!isE3Correct) feedback = "L'étape 3 (le résultat final) est incorrect.</br>Vérifie ton addition.";

      setMessage(feedback.replace("</br>", " "));
      discuterErreur(feedback);
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1);
      setCurrentCalcul(genererCalculDeveloppement());
      setEtape1("");
      setEtape2("");
      setEtape3("");
      setMessage("");
      setIsCorrect(null);
      setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }

  return (
    // Suppression de vh-100 et overflow-hidden, remplacés par notre classe app-layout
    <div className="container-fluid d-flex flex-column flex-lg-row bg-light p-0 pt-5 pt-lg-0 mt-5 mt-lg-0 app-layout">

      {/* ZONE GAUCHE : EXERCICE */}
      <div className="p-3 p-md-5 d-flex flex-column align-items-center justify-content-center exercise-section">
        <div className="card shadow-lg p-4 p-md-5 rounded-4 text-center custom-exercise-card w-100" style={{ maxWidth: '650px' }}>

          {/* ... TOUT LE CONTENU DE L'EXERCICE RESTE EXACTEMENT LE MÊME ... */}
          {!isFinished ? (
            <>
              <div className="progress mb-4 rounded-pill bg-primary bg-opacity-10" style={{ height: '8px' }}>
                <div className="progress-bar" style={{ width: `${((exercice - 1) / totalQuestions) * 100}%`, background: 'linear-gradient(45deg, #0d6efd, #6610f2)' }}></div>
              </div>

              <h6 className="text-secondary fw-bold text-uppercase small tracking-wider mb-2 opacity-75">Ex {exercice} / {totalQuestions}</h6>
              <h1 className="display-3 fw-bolder my-3 custom-logo pb-2">{currentCalcul.affichage}</h1>
              <p className="mb-5 text-secondary fw-medium">Retrouve le calcul astucieux étape par étape :</p>

              <div className="d-flex flex-column gap-3 mx-auto mb-5" style={{ maxWidth: '400px' }}>
                <div className="input-group shadow-sm rounded-3 overflow-hidden border border-light">
                  <span className="input-group-text bg-light border-0 fw-bold text-secondary" style={{ width: '90px' }}>Étape 1</span>
                  <input type="text" className="form-control text-center border-0 py-2 custom-input-wrapper" placeholder="Ex: 100 + 6" value={etape1} onChange={(e) => setEtape1(e.target.value)} disabled={isCorrect === true} />
                </div>
                <div className="input-group shadow-sm rounded-3 overflow-hidden border border-light">
                  <span className="input-group-text bg-light border-0 fw-bold text-secondary" style={{ width: '90px' }}>Étape 2</span>
                  <input type="text" className="form-control text-center border-0 py-2 custom-input-wrapper" placeholder="Ex: 150 + 90" value={etape2} onChange={(e) => setEtape2(e.target.value)} disabled={isCorrect === true} />
                </div>
                <div className="input-group shadow-sm rounded-3 overflow-hidden border border-light">
                  <span className="input-group-text bg-light border-0 fw-bold text-secondary" style={{ width: '90px' }}>Étape 3</span>
                  <input type="number" className="form-control text-center fw-bold border-0 py-2 text-primary custom-input-wrapper" placeholder="Résultat" value={etape3} onChange={(e) => setEtape3(e.target.value)} disabled={isCorrect === true} />
                </div>
              </div>

              <div className="d-flex justify-content-center mb-3">
                {isCorrect !== true && (
                  <button className="btn btn-primary btn-gradient-primary px-5 py-3 fw-bold shadow-sm rounded-pill btn-hover-scale" onClick={verifierReponse}>Valider mes étapes</button>
                )}
              </div>

              {message && (
                <div className={`alert ${isCorrect ? 'alert-success border-success' : 'alert-danger border-danger'} border-opacity-25 rounded-4 py-3 px-4 shadow-sm animate__animated animate__fadeIn mt-4`}>
                  <div className="fw-medium mb-3 small">{message}</div>
                  <button className={`btn ${isCorrect ? 'btn-success' : 'btn-outline-danger btn-hover-scale'} rounded-pill px-5 fw-bold`} onClick={exerciceSuivant}>
                    {exercice < totalQuestions ? "Question suivante →" : "Voir le bilan complet"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="animate__animated animate__fadeIn py-4">
              <h2 className="fw-bolder mb-2 custom-logo">Bilan de l'entraînement</h2>
              <div className="display-1 fw-bold mb-4 text-dark opacity-75">{score} <span className="fs-3 text-secondary">/ {totalQuestions}</span></div>

              {(score / totalQuestions) >= 0.75 ? (
                <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-4 mt-4">
                  <p className="fw-semibold text-success mb-4">Excellent travail ! Tu as maîtrisé cette méthode.</p>
                  <button className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale w-100" onClick={() => { /* ... Logique de succès ... */ }}>
                    {niveau < 2 ? "🚀 Passer au Niveau Suivant" : "🏆 Terminer le module"}
                  </button>
                </div>
              ) : (
                <div className="bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-4 p-4 mt-4">
                  <p className="fw-semibold text-danger mb-4">Encore quelques erreurs. Il faut réviser la méthode.</p>
                  <button className="btn btn-danger rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale w-100" onClick={() => navigate("/ModelageDeveloppement")}>
                    Retour à la leçon 📖
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ZONE DROITE : CHAT IA */}
      {/* On utilise notre classe chat-sidebar pour gérer la taille selon l'écran */}
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
              <p className="small text-center px-4 fw-medium">Remplis les 3 étapes.<br />Je t'aiderai si tu te trompes !</p>
            </div>
          )}
        </div>

        {isCorrect === false && !isFinished && (
          <div className="p-3 p-md-4 border-top bg-white d-flex flex-column shadow-lg">
            <div className="d-flex align-items-center border border-light rounded-pill bg-light p-1 ps-3 shadow-sm custom-input-wrapper">
              <input type="text" className="form-control border-0 bg-transparent shadow-none py-2" style={{ fontSize: '0.95rem' }} placeholder="Demander de l'aide à LitterAI..." disabled={isWorking} onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value.trim() !== "" && !isWorking) { discuterErreur(e.target.value); e.target.value = ""; } }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );

}