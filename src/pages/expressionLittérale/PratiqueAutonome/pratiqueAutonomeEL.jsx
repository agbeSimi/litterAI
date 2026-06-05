import { useState } from "react";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutPratiqueIA from "../../../composants/LayoutPratiqueIA.jsx";

export default function PratiqueAutonomeEL() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(0);
  const [currentEquation, setCurrentEquation] = useState(genererCalculLiteral());
  const [reponseEleve, setReponseEleve] = useState("");
  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Utilisation dynamique du nombre de questions
  const totalQuestions = location.state?.totalQuestions || 4;

  // --- LOGIQUE MATHÉMATIQUE ---
  function genererCalculLiteral() {
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 1;
    let x = Math.floor(Math.random() * 5) + 1;
    let resultatAttendu = `${a}x+${b}`;
    return {
      affichage: `${a} * x + ${b}`,
      solution: resultatAttendu,
      x: x,
      a: a,
      b: b
    };
  }

  // --- ACTIONS IA ---
  async function discuterErreur(messageUtilisateur = "") {
    setIsWorking(true);

    const { a, b, x, affichage } = currentEquation;
    const contenuUser = messageUtilisateur || `J'ai proposé ${reponseEleve} pour ${affichage}, pourquoi c'est faux ?`;
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl, un tuteur socratique. 
        OBJECTIF : Faire simplifier l'expression ${a} * x + ${b} en supprimant le signe *.
        
        CONSIGNES :
        1. MISSION : Affiche l'expression ${a} * x + ${b}. Demande à l'élève de la réécrire sans le signe *.
        2. SOLUTION ATTENDUE : ${a}x + ${b}.
        3. SI L'ÉLÈVE SE TROMPE : Ne donne jamais la réponse. Rappelle la règle : on peut supprimer le signe * uniquement lorsqu'il est placé devant une lettre.
        4. SI L'ÉLÈVE EST HORS-SUJET : Réponds : "Concentrons-nous sur le calcul. Si on remplace x par ${x} dans ${a} * x + ${b}, quel calcul obtient-on ?"
        5. VALIDATION : Une fois que l'élève a écrit ${a}x + ${b}, félicite-le chaleureusement.
        
        FORMATAGE STRICT :
        - Pas de gras (**).
        - Pas d'étoiles de décoration.
        - Utilise le signe * pour parler de la multiplication.
        - BRIÈVETÉ : 100 caractères maximum par message.`
    };

    await envoyerMessage(
      [promptSysteme, ...conversationIA, { role: "user", content: contenuUser }],
      setConversationIA,
      "",
      () => {},
      setIsWorking
    );
  }

  // --- LOGIQUE DE VALIDATION ---
  function verifierReponse() {
    // On enlève les espaces potentiels saisis par l'élève pour être plus souple
    if (reponseEleve.replace(/\s+/g, '') === currentEquation.solution) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setMessage("Bravo ! C'est la bonne réponse.");
    } else {
      setIsCorrect(false);
      setMessage(`Ce n'est pas ça. Regarde l'aide de LitterAI à droite !`);
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
    const prochain = niveau + 1;
    if (prochain <= 2) {
      setNiveau(prochain);
      setExercice(1);
      setScore(0);
      setIsFinished(false);
      setReponseEleve("");
      setMessage("");
      setIsCorrect(null);
      setConversationIA([]);
    } else {
      navigate("/");
    }
  };

  return (
    <LayoutPratiqueIA
      exercice={exercice}
      totalQuestions={totalQuestions}
      isFinished={isFinished}
      score={score}
      niveau={niveau}
      isCorrect={isCorrect}
      message={message}
      conversationIA={conversationIA}
      isWorking={isWorking}
      onValidate={verifierReponse}
      onNext={exerciceSuivant}
      onNextLevel={handleNextLevel}
      onRetry={() => navigate("/ModelageCalculLiteralPhase1")} // Redirection en cas d'échec
      onSendMessage={discuterErreur}
    >
      <h2 className="display-4 fw-bolder my-3 custom-logo pb-2">
        {currentEquation.affichage}
      </h2>
      <p className="mb-4 text-secondary fw-medium fs-5">
        Simplifie l'expression ci-dessus :
      </p>

      <input
        type="text"
        className="form-control text-center fw-bold border-0 shadow-sm custom-input-wrapper text-primary mx-auto"
        style={{ maxWidth: '200px', height: '60px', fontSize: '1.5rem' }}
        value={reponseEleve}
        onChange={(e) => setReponseEleve(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && isCorrect !== true && verifierReponse()}
        disabled={isCorrect === true}
        placeholder="ex: 5x+2"
      />
    </LayoutPratiqueIA>
  );
}