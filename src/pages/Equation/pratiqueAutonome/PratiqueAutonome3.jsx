import { useState } from "react";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutPratiqueIA from "../../../composants/LayoutPratiqueIA.jsx";

export default function PratiqueAutonome3() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(3); // Phase 3
  const [currentEquation, setCurrentEquation] = useState(genererEquationNiveau2());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const totalQuestions = location.state?.totalQuestions || 4;

  function genererEquationNiveau2() {
    const xSolution = Math.floor(Math.random() * 10) + 1;
    const a = (Math.floor(Math.random() * 20) + 11) / 10;
    const b = (Math.floor(Math.random() * 10) + 10) / 10;
    const c = parseFloat((a * xSolution + b).toFixed(1));

    return {
      affichage: `${a.toString().replace('.', ',')}x + ${b.toString().replace('.', ',')} = ${c.toString().replace('.', ',')}`,
      solution: xSolution
    };
  }

  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?`;

    const signe = currentEquation.affichage.includes('+') ? '+' : '-';
    const terme = currentEquation.affichage.split(/[+-]/)[1].split('=')[0].trim();

    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl. ÉQUATION : ${currentEquation.affichage}. SOLUTION : ${currentEquation.solution}.
      CONSIGNES :
      1. SI HORS SUJET : Ne valide pas. Dis : "Concentrons-nous sur l'étape actuelle : que doit-on faire avec le ${signe}${terme} ?"
      2. NE DONNE JAMAIS LA RÉPONSE : Ne donne jamais x = ${currentEquation.solution}.
      3. RESTE BLOQUÉ : Tant que l'élève ne propose pas une étape mathématique cohérente, repose la même question.
      4. LANGAGE : Simple et direct.`
    };
    await envoyerMessage([promptSysteme, ...conversationIA, { role: "user", content: contenuUser }], setConversationIA, "", () => {}, setIsWorking);
  }

  function verifierReponse() {
    if (Number(reponseEleve) === currentEquation.solution) {
      setScore(prev => prev + 1); setIsCorrect(true); setMessage("Bravo ! C'est la bonne réponse.");
    } else {
      setIsCorrect(false); setMessage("Ce n'est pas ça. Regarde l'aide de LitterAI à droite !"); discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1); setCurrentEquation(genererEquationNiveau2());
      setReponseEleve(""); setMessage(""); setIsCorrect(null); setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }

  return (
    <LayoutPratiqueIA
      exercice={exercice} totalQuestions={totalQuestions} isFinished={isFinished}
      score={score} niveau={niveau} isCorrect={isCorrect} message={message}
      conversationIA={conversationIA} isWorking={isWorking}
      onValidate={verifierReponse} onNext={exerciceSuivant}
      onNextLevel={() => navigate("/")} onRetry={() => navigate("/modelage3")}
      onSendMessage={discuterErreur}
    >
      <h2 className="display-4 fw-bolder my-3 custom-logo pb-2">{currentEquation.affichage}</h2>
      <p className="mb-4 text-secondary fw-medium fs-5">Résous l'équation décimale pour trouver <span className="fw-bolder text-primary">x</span> :</p>

      <input
        type="number"
        className="form-control text-center fw-bold border-0 shadow-sm custom-input-wrapper text-primary mx-auto"
        style={{ maxWidth: '160px', height: '60px', fontSize: '1.5rem' }}
        value={reponseEleve}
        onChange={(e) => setReponseEleve(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && isCorrect !== true && verifierReponse()}
        disabled={isCorrect === true}
        placeholder="x = ?"
      />
    </LayoutPratiqueIA>
  );
}