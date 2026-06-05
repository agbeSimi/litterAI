import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import LayoutPratiqueIA from "../../../composants/LayoutPratiqueIA.jsx";

export default function PratiqueAutonomeTesterEgalite3() {
  const [exercice, setExercice] = useState(1);
  const [score, setScore] = useState(0);
  const [niveau] = useState(3);
  const [equation, setEquation] = useState(null);
  const [progression, setProgression] = useState(0);

  const [inputGauche, setInputGauche] = useState("");
  const [inputDroite, setInputDroite] = useState("");
  const [calculGauche, setCalculGauche] = useState("");
  const [calculDroite, setCalculDroite] = useState("");

  const [message, setMessage] = useState("");
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const totalQuestions = location.state?.totalQuestions || 4;

  function genererEquationNiveau3() {
    const xValeur = Math.floor(Math.random() * 4) + 2;
    const yValeur = Math.floor(Math.random() * 4) + 2;
    const a = (Math.floor(Math.random() * 4) + 1) * 0.5;
    const b = (Math.floor(Math.random() * 4) + 1) * 0.5;
    const c = (Math.floor(Math.random() * 5) + 1) * 0.5;

    let d, e, f;
    do {
      d = (Math.floor(Math.random() * 4) + 1) * 0.5;
      e = (Math.floor(Math.random() * 4) + 1) * 0.5;
      f = (Math.floor(Math.random() * 5) + 1) * 0.5;
    } while (a === d && b === e && c === f);

    const formatVisuel = (num) => num.toString().replace('.', ',');

    setEquation({
      x: xValeur, y: yValeur,
      gaucheTexte: `${formatVisuel(a)}x + ${formatVisuel(b)}y + ${formatVisuel(c)}`,
      droiteTexte: `${formatVisuel(d)}x + ${formatVisuel(e)}y + ${formatVisuel(f)}`,
      gaucheAttendu: `${a}*${xValeur}+${b}*${yValeur}+${c}`,
      droiteAttendu: `${d}*${xValeur}+${e}*${yValeur}+${f}`,
      resGaucheAttendu: a * xValeur + b * yValeur + c,
      resDroiteAttendu: d * xValeur + e * yValeur + f
    });

    setInputGauche(""); setInputDroite("");
    setCalculGauche(""); setCalculDroite("");
    setProgression(0); setMessage("");
    setIsCorrect(null); setConversationIA([]);
  }

  useEffect(() => { genererEquationNiveau3(); }, []);

  async function discuterErreur(messageUtilisateur = "") {
    if (!equation) return;
    setIsWorking(true);

    let erreurContext = (progression === 0 || progression === 1)
      ? `L'élève a fait une erreur de remplacement. Il doit remplacer x par ${equation.x} et y par ${equation.y}, avec * explicites.`
      : `L'élève a fait une erreur de calcul. Rappelle-lui les priorités.`;

    const promptSysteme = {
      role: "system",
      content: `Tu es LitterAl. ÉGALITÉ : ${equation.gaucheTexte} = ${equation.droiteTexte} pour x=${equation.x} et y=${equation.y}. CONTEXTE : ${erreurContext}
      CONSIGNES : Reste sur l'étape actuelle. Ne donne pas la réponse. Fais court.`
    };

    await envoyerMessage([promptSysteme, ...conversationIA, { role: "user", content: messageUtilisateur || "Pourquoi est-ce faux ?" }], setConversationIA, "", () => {}, setIsWorking);
  }

  const nettoyer = (s) => s.replace(/\s/g, "").replace(/×/g, "*");

  function verifierReponse() {
    if (!equation) return;

    if (progression === 0) {
      if (nettoyer(inputGauche) === equation.gaucheAttendu) { setIsCorrect(null); setProgression(1); setMessage(""); }
      else { setIsCorrect(false); setMessage("Mauvais remplacement à gauche."); discuterErreur(`J'ai proposé ${inputGauche}`); }
    } else if (progression === 1) {
      if (nettoyer(inputDroite) === equation.droiteAttendu) { setIsCorrect(null); setProgression(2); setMessage(""); }
      else { setIsCorrect(false); setMessage("Mauvais remplacement à droite."); discuterErreur(`J'ai proposé ${inputDroite}`); }
    } else if (progression === 2) {
      if (parseFloat(calculGauche.replace(',', '.')) === equation.resGaucheAttendu) { setIsCorrect(null); setProgression(3); setMessage(""); }
      else { setIsCorrect(false); setMessage("Le calcul de gauche est faux."); discuterErreur(`Je trouve ${calculGauche}`); }
    } else if (progression === 3) {
      if (parseFloat(calculDroite.replace(',', '.')) === equation.resDroiteAttendu) {
        setScore(prev => prev + 1); setIsCorrect(true); setProgression(4);
        const resG = equation.resGaucheAttendu.toString().replace('.', ',');
        const resD = equation.resDroiteAttendu.toString().replace('.', ',');
        setMessage(`Bravo ! ${resG} ${resG === resD ? '=' : '≠'} ${resD}.`);
      } else {
        setIsCorrect(false); setMessage("Le calcul de droite est faux."); discuterErreur(`Je trouve ${calculDroite}`);
      }
    }
  }

  function exerciceSuivant() {
    if (exercice < totalQuestions) { setExercice(prev => prev + 1); genererEquationNiveau3(); }
    else { setIsFinished(true); }
  }

  if (!equation) return null;

  return (
    <LayoutPratiqueIA
      exercice={exercice} totalQuestions={totalQuestions} isFinished={isFinished}
      score={score} niveau={niveau} isCorrect={isCorrect} message={message}
      conversationIA={conversationIA} isWorking={isWorking}
      onValidate={verifierReponse} btnValidateText="Valider l'étape"
      onNext={exerciceSuivant}
      onNextLevel={() => navigate("/")}
      onRetry={() => navigate("/PratiqueGuideTesterEgalite3")}
      onSendMessage={discuterErreur}
    >
      <div className="bg-light p-3 rounded-4 border border-light my-3 text-center w-100 shadow-sm">
        <p className="small text-secondary fw-medium mb-1">Tester pour <span className="fw-bolder text-primary">x = {equation.x} et y = {equation.y}</span> :</p>
        <h3 className="fw-bolder text-dark mb-0 custom-logo">{equation.gaucheTexte} = {equation.droiteTexte}</h3>
      </div>

      <div className="row g-3 text-center mb-4">
        <div className="col-12 col-md-6">
          <div className="p-3 p-md-4 rounded-4 border-start border-4 border-info bg-white shadow-sm h-100">
            <span className="text-info small text-uppercase fw-bold">Membre de gauche</span>
            <div className="fs-5 my-2 fw-bolder text-dark">{equation.gaucheTexte}</div>

            {progression >= 0 && (
              <div className="mt-3 text-start">
                <label className="small text-secondary fw-medium mb-1">Remplacement :</label>
                {progression > 0 ? <div className="fw-bolder fs-5 text-success text-center bg-light rounded-3 py-2">{inputGauche}</div> : (
                  <input type="text" className="form-control text-center custom-input-wrapper text-primary fw-bold" placeholder={`Ex: 2*${equation.x}+1,5*${equation.y}+3`} value={inputGauche} onChange={e => setInputGauche(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} />
                )}
              </div>
            )}

            {progression >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top border-light text-start">
                <label className="small text-secondary fw-medium mb-1">Résultat :</label>
                {progression > 2 ? <div className="fw-bolder fs-5 text-success text-center bg-light rounded-3 py-2">{calculGauche}</div> : (
                  <input type="text" className="form-control text-center custom-input-wrapper text-primary fw-bold" value={calculGauche} onChange={e => setCalculGauche(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className={`p-3 p-md-4 rounded-4 border-start border-4 border-warning bg-white shadow-sm h-100 ${progression < 1 && isCorrect !== false ? 'opacity-50' : ''}`}>
            <span className="text-warning small text-uppercase fw-bold">Membre de droite</span>
            <div className="fs-5 my-2 fw-bolder text-dark">{equation.droiteTexte}</div>

            {(progression >= 1 || isCorrect === false) && (
              <div className="mt-3 text-start">
                <label className="small text-secondary fw-medium mb-1">Remplacement :</label>
                {progression > 1 ? <div className="fw-bolder fs-5 text-success text-center bg-light rounded-3 py-2">{inputDroite}</div> : (
                  <input type="text" className="form-control text-center custom-input-wrapper text-primary fw-bold" value={inputDroite} onChange={e => setInputDroite(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
                )}
              </div>
            )}

            {(progression >= 3 || (isCorrect === false && progression >= 2)) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top border-light text-start">
                <label className="small text-secondary fw-medium mb-1">Résultat :</label>
                {progression > 3 ? <div className="fw-bolder fs-5 text-success text-center bg-light rounded-3 py-2">{calculDroite}</div> : (
                  <input type="text" className="form-control text-center custom-input-wrapper text-primary fw-bold" value={calculDroite} onChange={e => setCalculDroite(e.target.value)} onKeyDown={e => e.key === 'Enter' && verifierReponse()} disabled={isCorrect === false} autoFocus />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </LayoutPratiqueIA>
  );
}