import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {envoyerMessage} from "../../../../services/LitterAI_API.js";
import LayoutPratiqueIA from "../LayoutPratiqueIA.jsx";

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
  const totalQuestions = location.state?.totalQuestions || 4;

  function genererProgramme() {
    const ops = ['additionner', 'soustraire'];
    const i = Math.floor(Math.random() * ops.length);
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 1;
    return {
      solution: `${a}*X${i === 0 ? '+' : '-'}${b}`, a, b,
      premierePartie: `Choisir X`, deuxiemePartie: `Multiplier par ${a}`, troisiemePartie: `${ops[i]} ${b}`
    };
  }

  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const contenuUser = messageUtilisateur || `Je n'arrive pas à traduire le programme. J'ai écrit "${reponseEleve}". Peux-tu m'aider ?`;
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl. OBJECTIF : Guider l'élève pour construire l'expression littérale. Ne donne jamais la réponse. 1. Demande d'abord par quelle lettre on remplace le nombre. 2. Ensuite, demande comment multiplier par ${currentEquation.a}. 3. Enfin, comment ajouter/soustraire la dernière partie. UTILISE * pour multiplier.`
    };
    await envoyerMessage([promptSysteme, ...conversationIA, { role: "user", content: contenuUser }], setConversationIA, "", () => {}, setIsWorking);
  }

  function verifierReponse() {
    if (reponseEleve.replace(/\s+/g, "").toUpperCase() === currentEquation.solution) {
      setScore(prev => prev + 1); setIsCorrect(true); setMessage("Bravo ! C'est la bonne réponse.");
    } else {
      setIsCorrect(false); setMessage("Ce n'est pas ça. Regarde l'aide de LitterAI à droite !"); discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1); setCurrentEquation(genererProgramme());
      setReponseEleve(""); setMessage(""); setIsCorrect(null); setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }

  const handleNextLevel = () => {
    if (niveau + 1 <= 3) { navigate("/modelageCalculLiteralPhase3"); } else { navigate("/"); }
  };

  return (
    <LayoutPratiqueIA
      exercice={exercice} totalQuestions={totalQuestions} isFinished={isFinished}
      score={score} niveau={niveau} isCorrect={isCorrect} message={message}
      conversationIA={conversationIA} isWorking={isWorking}
      onValidate={verifierReponse} onNext={exerciceSuivant}
      onNextLevel={handleNextLevel} onRetry={() => navigate("/ModelageCalculLiteralPhase1")}
      onSendMessage={discuterErreur}
    >
      <div className="bg-primary bg-opacity-10 border border-primary border-opacity-10 p-4 rounded-4 mb-4 text-start mx-auto w-100 shadow-sm text-secondary">
        <div className="mb-2"><strong>Étape 1 :</strong> {currentEquation.premierePartie}</div>
        <div className="mb-2"><strong>Étape 2 :</strong> {currentEquation.deuxiemePartie}</div>
        <div><strong>Étape 3 :</strong> {currentEquation.troisiemePartie}</div>
      </div>
      <p className="mb-4 text-secondary fw-medium fs-5">Transforme ces instructions en expression littérale :</p>
      <input
        type="text"
        className="form-control text-center fw-bold border-0 shadow-sm custom-input-wrapper text-primary mx-auto"
        style={{ maxWidth: '280px', height: '60px', fontSize: '1.2rem' }}
        value={reponseEleve}
        onChange={(e) => setReponseEleve(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && isCorrect !== true && verifierReponse()}
        placeholder="Ex: 4 * X + 1"
        disabled={isCorrect === true}
      />
    </LayoutPratiqueIA>
  );
}