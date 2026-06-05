import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {envoyerMessage} from "../../../../services/LitterAI_API.js";
import LayoutPratiqueIA from "../LayoutPratiqueIA.jsx";

export default function PratiqueAutonomeCL3() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState(3);
  const [currentEquation, setCurrentEquation] = useState(genererProgramme());
  const [reponseEtape1, setReponseEtape1] = useState("");
  const [reponseEtape2, setReponseEtape2] = useState("");
  const [reponseEtape3, setReponseEtape3] = useState("");
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
    const contenuUser = messageUtilisateur || `Je n'arrive pas à trouver les instructions pour ${currentEquation.solution}. Peux-tu m'aider ?`;
    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl. OBJECTIF : Aider à traduire l'expression ${currentEquation.solution} en 3 étapes. 1. Demande d'abord ce qu'on choisit au départ. 2. Demande quelle opération correspond à ${currentEquation.a} * X. 3. Demande la signification de la fin de l'expression.`
    };
    await envoyerMessage([promptSysteme, ...conversationIA, { role: "user", content: contenuUser }], setConversationIA, "", () => {}, setIsWorking);
  }

  const nettoyerTexte = (texte) => texte.trim().toLowerCase().replace(/\s+/g, " ");

  function verifierReponse() {
    const estEtape1 = nettoyerTexte(reponseEtape1) === nettoyerTexte("Choisir X");
    const estEtape2 = nettoyerTexte(reponseEtape2) === nettoyerTexte(`Multiplier par ${currentEquation.a}`);
    const estEtape3 = nettoyerTexte(reponseEtape3) === nettoyerTexte(`${currentEquation.troisiemePartie}`);

    if (estEtape1 && estEtape2 && estEtape3) {
      setScore(prev => prev + 1); setIsCorrect(true); setMessage("Bravo ! Tu as parfaitement décodé l'expression.");
    } else {
      setIsCorrect(false); setMessage("Il y a une erreur dans tes étapes. Regarde l'aide de LitterAI !"); discuterErreur();
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) {
      setExercice(prev => prev + 1); setCurrentEquation(genererProgramme());
      setReponseEtape1(""); setReponseEtape2(""); setReponseEtape3("");
      setMessage(""); setIsCorrect(null); setConversationIA([]);
    } else {
      setIsFinished(true);
    }
  }

  return (
    <LayoutPratiqueIA
      exercice={exercice} totalQuestions={totalQuestions} isFinished={isFinished}
      score={score} niveau={niveau} isCorrect={isCorrect} message={message}
      conversationIA={conversationIA} isWorking={isWorking}
      onValidate={verifierReponse} btnValidateText="Valider mon programme"
      onNext={exerciceSuivant} onNextLevel={() => navigate("/")}
      onRetry={() => navigate("/ModelageCalculLiteralPhase1")}
      onSendMessage={discuterErreur}
    >
      <p className="display-4 fw-bolder text-primary-gradient my-4">{currentEquation.solution}</p>
      <p className="mb-4 text-secondary fw-medium">Retrouve le programme de calcul correspondant :</p>

      <div className="d-flex flex-column gap-3 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
        {[
          { label: "Étape 1", val: reponseEtape1, set: setReponseEtape1, ph: "Ex: Choisir X" },
          { label: "Étape 2", val: reponseEtape2, set: setReponseEtape2, ph: "Ex: Multiplier par 1" },
          { label: "Étape 3", val: reponseEtape3, set: setReponseEtape3, ph: "Ex: additionner 5" }
        ].map((etape, idx) => (
          <div key={idx} className="input-group shadow-sm rounded-3 overflow-hidden border border-light">
            <span className="input-group-text bg-light border-0 fw-bold text-secondary" style={{ width: '90px' }}>{etape.label}</span>
            <input
              type="text" className="form-control text-center border-0 py-2 custom-input-wrapper text-primary fw-bold"
              value={etape.val} onChange={(e) => etape.set(e.target.value)}
              placeholder={etape.ph} disabled={isCorrect === true}
            />
          </div>
        ))}
      </div>
    </LayoutPratiqueIA>
  );
}