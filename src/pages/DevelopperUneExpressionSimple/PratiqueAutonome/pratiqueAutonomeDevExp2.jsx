import { useState } from "react";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutPratiqueIA from "../../../composants/LayoutPratiqueIA.jsx";

export default function PratiqueAutonomeDevExp2() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(2);
  const [currentEquation, setCurrentEquation] = useState(genererExpressionNiveau2());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const location = useLocation();
  const totalQuestions = location.state?.totalQuestions || 4;
  const navigate = useNavigate();

  function genererExpressionNiveau2() {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 9) + 1;
    const variables = ['a', 'b', 'x', 'y'];
    const variable = variables[Math.floor(Math.random() * variables.length)];
    return { affichage: `${a}(${variable} + ${b})`, solution: `${a}${variable} + ${a * b}` };
  }

  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${currentEquation.affichage}, pourquoi c'est faux ?`;
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAI. L'élève s'est trompé en développant. EXPRESSION : ${currentEquation.affichage}. SOLUTION ATTENDUE : ${currentEquation.solution}. 
      CONSIGNES : Ne donne jamais la réponse. Rappelle le mécanisme de distributivité ("fléchage" ou le nombre "attaquant"). Pose une seule question pour le débloquer. Fais très court.`
    };
    await envoyerMessage([promptSysteme, ...conversationIA, { role: "user", content: contenuUser }], setConversationIA, "", () => {}, setIsWorking);
  }

  function verifierReponse() {
    if (reponseEleve.replace(/\s+/g, "") === currentEquation.solution.replace(/\s+/g, "")) {
      setScore(prev => prev + 1); setIsCorrect(true); setMessage("Bravo ! C'est la bonne réponse.");
    } else {
      setIsCorrect(false); setMessage("Ce n'est pas ça. Regarde l'aide de LitterAI à droite !"); discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1); setCurrentEquation(genererExpressionNiveau2());
      setReponseEleve(""); setMessage(""); setIsCorrect(null); setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }

  const handleNextLevel = () => {
    if (niveau + 1 <= 3) { navigate("/ModelageDevExp3"); } else { navigate("/"); }
  };

  return (
    <LayoutPratiqueIA
      exercice={exercice} totalQuestions={totalQuestions} isFinished={isFinished}
      score={score} niveau={niveau} isCorrect={isCorrect} message={message}
      conversationIA={conversationIA} isWorking={isWorking}
      onValidate={verifierReponse} onNext={exerciceSuivant}
      onNextLevel={handleNextLevel} onRetry={() => navigate("/ModelageDevExp2")}
      onSendMessage={discuterErreur}
    >
      <h2 className="display-4 fw-bolder my-3 custom-logo pb-2">{currentEquation.affichage}</h2>
      <p className="mb-4 text-secondary fw-medium fs-5">Développe cette expression :</p>
      <input
        type="text"
        className="form-control text-center fw-bold border-0 shadow-sm custom-input-wrapper text-primary mx-auto"
        style={{ maxWidth: '220px', height: '60px', fontSize: '1.5rem' }}
        value={reponseEleve}
        onChange={(e) => setReponseEleve(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && isCorrect !== true && verifierReponse()}
        disabled={isCorrect === true}
        placeholder="Ex: 5x + 10"
      />
    </LayoutPratiqueIA>
  );
}