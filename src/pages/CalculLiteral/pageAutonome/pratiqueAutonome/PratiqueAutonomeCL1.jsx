import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {envoyerMessage} from "../../../../services/LitterAI_API.js";
import LayoutPratiqueIA from "../LayoutPratiqueIA.jsx";

export default function PratiqueAutonomeCL1() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(1);
  const [currentEquation, setCurrentEquation] = useState(genererCalculLiteral());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const totalQuestions = location.state?.totalQuestions || 4;

  function genererCalculLiteral() {
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 1;
    let x = Math.floor(Math.random() * 5) + 1;
    return { affichage: `${a} * x + ${b}`, solution: a * x + b, x, a, b };
  }

  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);
    const { a, b, x, solution, affichage } = currentEquation;
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${affichage}, pourquoi c'est faux ?`;

    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, un tuteur socratique. OBJECTIF : Faire calculer la valeur de l'expression ${a}x + ${b} pour x = ${x}. CONSIGNES : 1. MISSION : Demande à l'élève de remplacer x par ${x}. 2. CALCUL ATTENDU : ${a} * ${x} + ${b} = ${solution}. 3. Ne donne pas la réponse. FORMATAGE : Pas de gras (**), utilise le signe *.`
    };
    await envoyerMessage([promptSysteme, ...conversationIA, { role: "user", content: contenuUser }], setConversationIA, "", () => {}, setIsWorking);
  }

  function verifierReponse() {
    if (Number(reponseEleve) === currentEquation.solution) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setMessage("Bravo ! C'est la bonne réponse.");
    } else {
      setIsCorrect(false);
      setMessage("Ce n'est pas ça. Regarde l'aide de LitterAI à droite !");
      discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1);
      setCurrentEquation(genererCalculLiteral());
      setReponseEleve("");
      setMessage("");
      setIsCorrect(null);
      setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }

  const handleNextLevel = () => {
    if (niveau + 1 <= 2) {
      navigate("/modelageCalculLiteralPhase2");
    } else {
      navigate("/");
    }
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
      <h2 className="display-4 fw-bolder my-3 custom-logo pb-2">{currentEquation.affichage}</h2>
      <p className="mb-4 text-secondary fw-medium fs-5"> Quel est le résultat si on remplace X par <span className="fw-bolder text-primary">{currentEquation.x}</span> ?</p>
      <input
        type="number"
        className="form-control text-center fw-bold border-0 shadow-sm custom-input-wrapper text-primary mx-auto"
        style={{ maxWidth: '160px', height: '60px', fontSize: '1.5rem' }}
        value={reponseEleve}
        onChange={(e) => setReponseEleve(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && isCorrect !== true && verifierReponse()}
        disabled={isCorrect === true}
        placeholder="?"
      />
    </LayoutPratiqueIA>
  );
}