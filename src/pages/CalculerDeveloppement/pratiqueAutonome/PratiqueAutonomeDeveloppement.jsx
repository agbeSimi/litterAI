import { useState } from "react";
import logoRobot from "../../../assets/logo_robot.png";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function PratiqueAutonomeDeveloppement() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(0);
  const [currentCalcul, setCurrentCalcul] = useState(genererCalculDeveloppement());

  // Nouveaux états pour les 3 étapes
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

  // --- LOGIQUE MATHÉMATIQUE ---
  function genererCalculDeveloppement() {
    let base = 100;
    let offset = Math.floor(Math.random() * 8) + 2; // de 2 à 9 (ex: 104)
    let n1 = base + offset;
    let n2 = Math.floor(Math.random() * 15) + 11; // de 11 à 25
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

  // --- ACTIONS IA ---
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

  // --- LOGIQUE DE VALIDATION DES 3 ÉTAPES ---
  function verifierReponse() {
    // 1. Nettoyage des saisies (on retire les espaces et parenthèses pour la comparaison)
    const e1 = etape1.replace(/\s+/g, '').replace(/[()]/g, '');
    const e2 = etape2.replace(/\s+/g, '');
    const e3 = Number(etape3);

    // 2. Vérification Étape 1 (Ex: "100+4" ou "4+100")
    const expE1_A = `${currentCalcul.base}+${currentCalcul.offset}`;
    const expE1_B = `${currentCalcul.offset}+${currentCalcul.base}`;
    const isE1Correct = (e1 === expE1_A || e1 === expE1_B);

    // 3. Vérification Étape 2 (Ex: "1500+60" ou "60+1500")
    const part1 = currentCalcul.base * currentCalcul.n2;
    const part2 = currentCalcul.offset * currentCalcul.n2;
    const expE2_A = `${part1}+${part2}`;
    const expE2_B = `${part2}+${part1}`;
    const isE2Correct = (e2 === expE2_A || e2 === expE2_B);

    // 4. Vérification Étape 3 (Ex: "1560")
    const isE3Correct = (e3 === currentCalcul.solution);

    // 5. Bilan
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
    <div className="container-fluid d-flex flex-column flex-md-row vh-100 bg-light p-0 overflow-hidden">

      {/* ZONE GAUCHE : EXERCICE */}
      <div className="flex-grow-1 p-3 p-md-4 d-flex flex-column align-items-center overflow-auto h-100">
        <div className="card shadow-lg p-3 p-md-5 rounded-4 text-center border-0 w-100" style={{maxWidth: '600px'}}>

          {!isFinished ? (
            <>
              <div className="progress mb-3 mb-md-4" style={{height: '6px'}}>
                <div className="progress-bar bg-primary" style={{width: `${((exercice - 1) / totalQuestions) * 100}%`}}></div>
              </div>

              <h6 className="text-muted fw-bold text-uppercase small">Ex {exercice} / {totalQuestions}</h6>
              <h1 className="display-4 fw-bold my-3 text-info">{currentCalcul.affichage}</h1>
              <p className="mb-4 text-muted">Retrouve le calcul astucieux étape par étape :</p>

              {/* LES 3 ÉTAPES */}
              <div className="d-flex flex-column gap-3 mx-auto mb-4" style={{ maxWidth: '350px' }}>

                {/* ETAPE 1 */}
                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-light fw-bold" style={{width: '100px'}}>Étape 1</span>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder={`Ex: 100 + 6`}
                    value={etape1}
                    onChange={(e) => setEtape1(e.target.value)}
                    disabled={isCorrect === true}
                  />
                </div>

                {/* ETAPE 2 */}
                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-light fw-bold" style={{width: '100px'}}>Étape 2</span>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder={`Ex: 150 + 90`}
                    value={etape2}
                    onChange={(e) => setEtape2(e.target.value)}
                    disabled={isCorrect === true}
                  />
                </div>

                {/* ETAPE 3 */}
                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-light fw-bold" style={{width: '100px'}}>Étape 3</span>
                  <input
                    type="number"
                    className="form-control text-center fw-bold"
                    placeholder="Résultat"
                    value={etape3}
                    onChange={(e) => setEtape3(e.target.value)}
                    disabled={isCorrect === true}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center mb-3">
                {isCorrect !== true && (
                  <button className="btn btn-primary px-5 py-2 fw-bold shadow-sm rounded-pill" onClick={verifierReponse}>
                    Valider mes étapes
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
            /* ÉCRAN BILAN */
            <div className="animate__animated animate__fadeIn">
              <h2 className="fw-bold mb-2">Bilan</h2>
              <div className="display-3 fw-bold mb-3 text-primary">{score} / {totalQuestions}</div>

              {(score / totalQuestions) >= 0.75 ? (
                <div className="alert alert-success rounded-4 p-3 p-md-4">
                  <p className="small mb-3">Bravo ! Prêt pour la suite ?</p>
                  <button className="btn btn-success rounded-pill px-4 fw-bold w-100" onClick={() => {
                    const prochain = niveau + 1;
                    if (prochain <= 2) {
                      setNiveau(prochain);
                      setExercice(1);
                      setScore(0);
                      setIsFinished(false);
                      setEtape1("");
                      setEtape2("");
                      setEtape3("");
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
                  <button className="btn btn-danger rounded-pill px-4 fw-bold w-100" onClick={() => navigate("/ModelageDeveloppement")}>
                    Retour Modelage
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ZONE DROITE : CHAT */}
      <div className="bg-white border-start shadow-sm d-flex flex-column h-100" style={{width: '100%', maxWidth: '100%', flexBasis: '420px'}}>
        <div className="p-2 p-md-3 border-bottom text-center bg-white d-none d-md-block">
          <img src={logoRobot} alt="Robot" style={{width: '50px'}}/>
          <h6 className="fw-bold mb-0">LitterAl</h6>
        </div>

        <div className="flex-grow-1 overflow-auto p-3 bg-light">
          {isCorrect === false && !isFinished ? (
            <>
              {(conversationIA || []).filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
                <div key={i} className={`mb-2 p-2 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white ms-4' : 'bg-white me-4 border'}`}>
                  {m.content}
                </div>
              ))}
              {isWorking && <div className="text-muted small p-2 text-center">LitterAl réfléchit...</div>}
            </>
          ) : (
            <div className="text-center text-muted mt-2">
              <p className="small">Remplis les 3 étapes, je t'aide en cas d'erreur !</p>
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