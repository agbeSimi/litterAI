import { useState } from "react";
import logoRobot from "../../../assets/logo_robot.png";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import {useLocation, useNavigate} from "react-router-dom";

export default function PratiqueAutonomeCL2() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(2);
  const [currentEquation, setCurrentEquation] = useState(genererProgramme());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Si l'élève vient de la machine, on prend son choix (5 à 10). Sinon (parcours normal), c'est 4.
  const totalQuestions = location.state?.totalQuestions || 4;


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

    const a = currentEquation.a;
    // const b = currentEquation.b;
    // const x = currentEquation.x;

    const contenuUser = messageUtilisateur || `Je n'arrive pas à traduire le programme en formule. J'ai écrit "${reponseEleve}". Peux-tu m'aider étape par étape ?`;
    const nouveauMessage = {role: "user", content: contenuUser};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `RÔLE
      Tu es LitterAl, un sympathique tuteur de maths pour un élève de 4ème. Tu es bienveillant, encourageant et tu utilises un langage très simple.
      Ton but est de l'aider à corriger son erreur en le guidant pas à pas pour construire son expression littérale. Ne donne jamais la réponse finale d'un coup.
      
      MISSION : DÉCOMPOSER LE RAISONNEMENT
      1. PREMIER MESSAGE : 
         - Rassure l'élève (ex: "Pas de souci, on va construire la formule ensemble !").
         - Pose la première question : "En maths, quand on choisit un nombre de départ qu'on ne connaît pas, quelle lettre utilise-t-on pour le remplacer ?"
         - ARRÊTE-TOI ICI. Attends sa réponse.
      
      2. LE GUIDAGE PAS À PAS (Attends toujours sa réponse) :
         - Quand il répond "x" (ou X), valide. Demande ensuite : "Super. La consigne demande ensuite de multiplier ce nombre par ${a}. Comment tu écris ça ?"
         - Quand il répond "${a} * x", félicite-le. Demande : "Génial ! Dernière étape, le programme dit de ${currentEquation.troisiemePartie}. Comment tu rajoutes ça à ton calcul ?"
         - S'il se trompe en chemin, donne un petit indice au lieu de donner la réponse.
      
      3. LA RÉSOLUTION :
         - Une fois que l'élève a trouvé l'expression complète, félicite-le chaleureusement !
         - Invite-le à écrire cette bonne réponse dans la grande case et à cliquer sur le bouton de validation pour passer à la suite.
      
      RÈGLES DE FORMATAGE STRICTES
      - INTERDICTION de copier les titres de tes instructions (ne dis jamais "Mission", "Étape" ou "Premier message").
      - BRIÈVETÉ : 3 lignes maximum par message.
      - UNE SEULE QUESTION à la fois pour ne pas le perdre.
      - CALCUL LITTÉRAL : Utilise toujours le signe * pour la multiplication. Jamais de forme collée comme "${a}x".
      - ZÉRO GRAS : N'utilise jamais de doubles étoiles (**).
      - INTERDICTION ABSOLUE : Ne parle JAMAIS de "résoudre une équation" ou d'"isoler X". Le but est uniquement de traduire du texte en expression, pas de calculer la valeur de x.`
        };
    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {
    }, setIsWorking);
  }

  // --- LOGIQUE DE VALIDATION ---
  function verifierReponse() {
    if (reponseEleve.replace(/\s+/g, "").toUpperCase() === currentEquation.solution) {
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
      setCurrentEquation(genererProgramme());
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
                <div className="progress-bar bg-primary" style={{width: `${((exercice - 1) / totalQuestions) * 100}%`}}></div>
              </div>

              <h6 className="text-muted fw-bold text-uppercase small">Ex {exercice} / {totalQuestions}</h6>
              <p className="display-6 display-md-2  my-3 my-md-4 text-dark">
                Etape 1 :{currentEquation.premierePartie}<br/>
                Etape 2 : {currentEquation.deuxiemePartie}<br/>
                Etape 3: {currentEquation.troisiemePartie}<br/>
              </p>
              <p> Transforme ces instructions en expression littéral </p>

              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg text-center fw-bold mx-auto mx-sm-0"
                  style={{maxWidth: '250px', height: '60px', fontSize: '1.5rem'}}
                  value={reponseEleve}
                  onChange={(e) => setReponseEleve(e.target.value)}
                  placeholder="Ex: 4 * x + 1"
                  disabled={isCorrect === true}

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
                    {exercice < totalQuestions ? "Suivant →" : "Voir bilan"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ÉCRAN BILAN ADAPTÉ */
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
                      setExercice(1);
                      setScore(0);
                      setIsFinished(false);
                      setReponseEleve("");
                      setMessage("");
                      setIsCorrect(null);
                      setConversationIA([]);
                      navigate("/modelageCalculLiteralPhase3")
                    } else {
                      navigate("/");
                    }
                  }}>
                    {niveau < 3 ? "Niveau Suivant" : "Terminer"}
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
