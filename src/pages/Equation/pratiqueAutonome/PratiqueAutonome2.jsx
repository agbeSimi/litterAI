import { useState } from "react";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutPratiqueIA from "../../../composants/LayoutPratiqueIA.jsx";

export default function PratiqueAutonome2() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(2); // Phase 2
  const [currentEquation, setCurrentEquation] = useState(genererEquationNiveau1());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const totalQuestions = location.state?.totalQuestions || 4;

  function genererEquationNiveau1() {
    let a, c, xSolution = Math.floor(Math.random() * 9) + 1;
    do {
      a = Math.floor(Math.random() * 8) + 2;
      c = Math.floor(Math.random() * 8) + 2;
    } while (a === c);
    let b = Math.floor(Math.random() * 9) + 1;
    let d = (a * xSolution) + b - (c * xSolution);
    return {
      affichage: `${a}x ${b >= 0 ? '+ ' : '- '}${Math.abs(b)} = ${c}x ${d >= 0 ? '+ ' : '- '}${Math.abs(d)}`,
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
      1. SI HORS SUJET : Ne valide pas. Dis : "Concentrons-nous sur l'étape actuelle : que doit-on faire avec le ${signe}${terme} ou les termes en x ?"
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
      setExercice(prev => prev + 1); setCurrentEquation(genererEquationNiveau1());
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
      onNextLevel={() => navigate("/modelage3")} onRetry={() => navigate("/modelage")}
      onSendMessage={discuterErreur}
    >
      <h2 className="display-4 fw-bolder my-3 custom-logo pb-2">{currentEquation.affichage}</h2>
      <p className="mb-4 text-secondary fw-medium fs-5">Résous l'équation pour trouver <span className="fw-bolder text-primary">x</span> :</p>

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