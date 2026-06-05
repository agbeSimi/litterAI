import { useState } from "react";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutPratiqueIA from "../../../composants/LayoutPratiqueIA.jsx";

export default function PratiqueAutonomeDevExp3() {
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

  function genererExpressionNiveau3() {
    const type = Math.random() < 0.5 ? 1 : 2;
    const variables = ['a', 'b', 'x', 'y'];

    if (type === 1) {
      const a = Math.floor(Math.random() * 8) + 2;
      const shuffledVars = [...variables].sort(() => 0.5 - Math.random());
      return {
        affichage: `${a}(${shuffledVars[0]} + ${shuffledVars[1]})`,
        solution: `${a}${shuffledVars[0]} + ${a}${shuffledVars[1]}`
      };
    } else {
      const aDecimal = Math.floor(Math.random() * 9) + 2 + 0.5;
      const b = Math.floor(Math.random() * 9) + 2;
      const varUnique = variables[Math.floor(Math.random() * variables.length)];
      const aStr = aDecimal.toString().replace('.', ',');
      const produitBStr = (aDecimal * b).toString().replace('.', ',');

      return {
        affichage: `${aStr}(${b} + ${varUnique})`,
        solution: `${produitBStr} + ${aStr}${varUnique}`
      };
    }
  }

  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?`;
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAI. L'élève s'est trompé en développant. EXPRESSION : ${currentEquation.affichage}. SOLUTION ATTENDUE : ${currentEquation.solution}. 
      CONSIGNES : Ne donne jamais la réponse. Rappelle le mécanisme de distributivité. Pose une seule question pour le débloquer. Fais très court.`
    };
    await envoyerMessage([promptSysteme, ...conversationIA, { role: "user", content: contenuUser }], setConversationIA, "", () => {}, setIsWorking);
  }

  function verifierReponse() {
    const reponsePropre = reponseEleve.replace(/\s+/g, "").replace(/\./g, ",");
    const solutionPropre = currentEquation.solution.replace(/\s+/g, "");

    if (reponsePropre === solutionPropre) {
      setScore(prev => prev + 1); setIsCorrect(true); setMessage("Bravo ! C'est la bonne réponse.");
    } else {
      setIsCorrect(false); setMessage("Ce n'est pas ça. Regarde l'aide de LitterAI à droite !"); discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1); setCurrentEquation(genererExpressionNiveau3());
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
      onNextLevel={() => navigate("/")} onRetry={() => navigate("/ModelageDevExp3")}
      onSendMessage={discuterErreur}
    >
      <h2 className="display-4 fw-bolder my-3 custom-logo pb-2">{currentEquation.affichage}</h2>
      <p className="mb-4 text-secondary fw-medium fs-5">Développe cette expression complexe :</p>
      <input
        type="text"
        className="form-control text-center fw-bold border-0 shadow-sm custom-input-wrapper text-primary mx-auto"
        style={{ maxWidth: '250px', height: '60px', fontSize: '1.5rem' }}
        value={reponseEleve}
        onChange={(e) => setReponseEleve(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && isCorrect !== true && verifierReponse()}
        disabled={isCorrect === true}
        placeholder="Ex: 10,5 + 2,5x"
      />
    </LayoutPratiqueIA>
  );
}