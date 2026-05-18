import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import logoRobot from "../../../assets/logo_robot.png";

function PratiqueGuideTesterEgalite3() {
  const [progression, setProgression] = useState(0);
  // Étapes : 0 = Remplacer à gauche, 1 = Remplacer à droite, 2 = Calculer à gauche, 3 = Calculer à droite, 4 = Conclusion

  // Initialisation paresseuse de l'état pour éviter une exécution en boucle au rendu
  const [equation, setEquation] = useState(genererEquationNiveau3());

  const [inputGauche, setInputGauche] = useState("");
  const [inputDroite, setInputDroite] = useState("");
  const [calculGauche, setCalculGauche] = useState("");
  const [calculDroite, setCalculDroite] = useState("");

  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");

  const navigate = useNavigate();

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

    const calculG = a * xValeur + b * yValeur + c;
    const calculD = d * xValeur + e * yValeur + f;

    const formatVisuel = (num) => num.toString().replace('.', ',');
    return {
      x: xValeur,
      y: yValeur,
      gaucheTexte: `${formatVisuel(a)}x + ${formatVisuel(b)}y + ${formatVisuel(c)}`,
      droiteTexte: `${formatVisuel(d)}x + ${formatVisuel(e)}y + ${formatVisuel(f)}`,
      gaucheAttendu: `${a}*${xValeur}+${b}*${yValeur}+${c}`,
      droiteAttendu: `${d}*${xValeur}+${e}*${yValeur}+${f}`,
      resGaucheAttendu: calculG,
      resDroiteAttendu: calculD
    };
  }

  // --- ACTIONS IA (GUIDAGE ET CORRECTIONS) ---

  async function discuterErreur(msg = "") {
    if (!equation) return;
    setIsWorking(true);

    let erreurContext ;
    if (progression === 0 || progression === 1) {
      erreurContext = `L'élève a fait une erreur de remplacement. Rappelle-lui qu'il doit remplacer la lettre x par ${equation.x} et la lettre y par ${equation.y}, en remettant les signes * explicites entre les nombres et les lettres.`;
    } else {
      erreurContext = `L'élève a fait une erreur de calcul. Rappelle-lui de respecter les priorités opératoires : les multiplications passent toujours avant les additions.`;
    }

    const promptSysteme = {
      role: "system",
      content: `RÔLE: LitterAl, tuteur de maths socratique pour un élève de 4ème.
      CONTEXTE: L'élève teste l'égalité ${equation.gaucheTexte} = ${equation.droiteTexte} avec x = ${equation.x} et y = ${equation.y}.
      Étape actuelle de l'élève : Étape ${progression}/4.
      CONTEXTE D'ERREUR : ${erreurContext}
      CONSIGNES DE GUIDAGE:
      - Ne donne jamais le résultat numérique directement.
      - Reste bloqué sur l'étape actuelle tant que l'élève ne trouve pas.
      FORMAT: 2 lignes max. Une seule question. Pas de gras.`
    };

    const nouveauMessage = { role: "user", content: msg };
    const historique = [...conversationIA, nouveauMessage];
    setConversationIA(historique);

    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

  function ajouterMessageIA(texte) {
    setConversationIA(prev => {
      if (prev.length > 0 && prev[prev.length - 1].content === texte) return prev;
      return [...prev, { role: "assistant", content: texte }];
    });
  }

  // --- VALIDATIONS DES ÉTAPES ---

  const nettoyer = (s) => s.replace(/\s/g, "").replace(/×/g, "*");

  function validerRemplacementGauche() {
    if (nettoyer(inputGauche) === equation.gaucheAttendu) {
      setMessageErreur("");
      setProgression(1);
    } else {
      setMessageErreur("Ce n'est pas le bon remplacement à gauche. Réessaie !");
      discuterErreur(`J'ai écrit ${inputGauche} pour le membre de gauche.`);
    }
  }

  function validerRemplacementDroite() {
    if (nettoyer(inputDroite) === equation.droiteAttendu) {
      setMessageErreur("");
      setProgression(2);
    } else {
      setMessageErreur("Ce n'est pas le bon remplacement à droite. Réessaie !");
      discuterErreur(`J'ai écrit ${inputDroite} pour le membre de droite.`);
    }
  }

  function validerCalculGauche() {
    if (parseFloat(calculGauche.replace(',', '.')) === equation.resGaucheAttendu) {
      setMessageErreur("");
      setProgression(3);
    } else {
      setMessageErreur("Le résultat du membre de gauche est incorrect.");
      discuterErreur(`Je trouve ${calculGauche} pour le membre de gauche.`);
    }
  }

  function validerCalculDroite() {
    if (parseFloat(calculDroite.replace(',', '.')) === equation.resDroiteAttendu) {
      setMessageErreur("");
      setProgression(4);
      setIsFinished(true);
    } else {
      setMessageErreur("Le résultat du membre de droite est incorrect.");
      discuterErreur(`Je trouve ${calculDroite} pour le membre de droite.`);
    }
  }

  // --- ENCLENCHEMENT DE L'IA EN FONCTION DE LA PROGRESSION ---
  useEffect(() => {
    if (!equation) return;

    if (progression === 0) {
      ajouterMessageIA(`Commençons ! Remplace x par ${equation.x} et y par ${equation.y} dans le membre de gauche (${equation.gaucheTexte}). N'oublie pas les signes * !`);
    } else if (progression === 1) {
      ajouterMessageIA(`Parfait. Fais maintenant la même chose pour le membre de droite (${equation.droiteTexte}).`);
    } else if (progression === 2) {
      ajouterMessageIA(`Excellent ! Calcule maintenant le résultat final pour le membre de gauche.`);
    } else if (progression === 3) {
      ajouterMessageIA(`On y est presque. Calcule le résultat final pour le membre de droite.`);
    } else if (progression === 4) {
      const g = equation.resGaucheAttendu.toString().replace('.', ',');
      const d = equation.resDroiteAttendu.toString().replace('.', ',');
      if (equation.resGaucheAttendu === equation.resDroiteAttendu) {
        ajouterMessageIA(`Parfait ! On trouve ${g} des deux côtés. L'égalité est donc VRAIE pour x = ${equation.x} et y = ${equation.y}.`);
      } else {
        ajouterMessageIA(`Parfait ! On trouve ${g} à gauche et ${d} à droite. Les résultats sont différents, l'égalité est donc FAUSSE pour x = ${equation.x} et y = ${equation.y}.`);
      }
    }
  }, [progression, equation]);

  if (!equation) return <div className="text-center mt-5">Génération de l'exercice...</div>;

  return (
    <div className="container-fluid d-flex flex-column flex-md-row vh-100 bg-light p-0 overflow-hidden">

      {/* ZONE GAUCHE : EXERCICE */}
      <div className="flex-grow-1 p-2 p-md-4 d-flex flex-column align-items-center overflow-auto h-100">
        <div className="card shadow-lg p-3 p-md-4 rounded-4 border-0 w-100 mb-3" style={{ maxWidth: '700px' }}>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary fw-bold mb-0">Phase 2 : Pratique Guidée</h5>
          </div>

          <div className="bg-light p-3 rounded-4 border shadow-sm mb-4 text-center mx-auto w-100">
            <p className="mb-1 text-muted small">On souhaite tester l'égalité suivante pour <span className="fw-bold text-primary">x = {equation.x} et y = {equation.y}</span> :</p>
            <h4 className="fw-bold text-dark mb-0">{equation.gaucheTexte} = {equation.droiteTexte}</h4>
          </div>

          {/* LAYOUT DEUX COLONNES */}
          <div className="row text-center g-3 mb-4">

            {/* MEMBRE DE GAUCHE */}
            <div className="col-6">
              <div className="border rounded-4 p-3 bg-white h-100 shadow-sm border-start border-4 border-info">
                <span className="text-info small text-uppercase fw-bold">Membre de gauche</span>
                <div className="fs-5 my-2 fw-bold text-dark">{equation.gaucheTexte}</div>

                {/* Remplacement Gauche */}
                {progression >= 0 && (
                  <div className="mt-3 text-start">
                    <label className="small text-muted d-block mb-1">Remplacement :</label>
                    {progression > 0 ? (
                      <span className="fs-6 text-success fw-bold d-block text-center">{inputGauche}</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control text-center form-control-sm fw-bold border-primary"
                        placeholder={`Ex: 2*${equation.x}+1,5*${equation.y}+3`}
                        value={inputGauche}
                        onChange={(e) => setInputGauche(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && validerRemplacementGauche()}
                      />
                    )}
                  </div>
                )}

                {/* Calcul Gauche */}
                {progression >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top text-start">
                    <label className="small text-muted d-block mb-1">Résultat final :</label>
                    {progression > 2 ? (
                      <span className="fs-5 text-success fw-bold d-block text-center">{calculGauche}</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control text-center form-control-sm fw-bold border-primary"
                        placeholder="?"
                        value={calculGauche}
                        onChange={(e) => setCalculGauche(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && validerCalculGauche()}
                        autoFocus
                      />
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* MEMBRE DE DROITE */}
            <div className="col-6">
              <div className={`border rounded-4 p-3 bg-white h-100 shadow-sm border-start border-4 border-warning ${progression < 1 ? 'opacity-50' : ''}`}>
                <span className="text-warning small text-uppercase fw-bold">Membre de droite</span>
                <div className="fs-5 my-2 fw-bold text-dark">{equation.droiteTexte}</div>

                {/* Remplacement Droite */}
                {progression >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-start">
                    <label className="small text-muted d-block mb-1">Remplacement :</label>
                    {progression > 1 ? (
                      <span className="fs-6 text-success fw-bold d-block text-center">{inputDroite}</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control text-center form-control-sm fw-bold border-primary"
                        placeholder="?"
                        value={inputDroite}
                        onChange={(e) => setInputDroite(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && validerRemplacementDroite()}
                        autoFocus
                      />
                    )}
                  </motion.div>
                )}

                {/* Calcul Droite */}
                {progression >= 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top text-start">
                    <label className="small text-muted d-block mb-1">Résultat final :</label>
                    {progression > 3 ? (
                      <span className="fs-5 text-success fw-bold d-block text-center">{calculDroite}</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control text-center form-control-sm fw-bold border-primary"
                        placeholder="?"
                        value={calculDroite}
                        onChange={(e) => setCalculDroite(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && validerCalculDroite()}
                        autoFocus
                      />
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* BILAN DE FIN COMPLET ET ADAPTÉ */}
          {isFinished && (
            <div className="alert alert-success text-center rounded-4 shadow-sm p-4 animate__animated animate__fadeIn">
              <h5 className="fw-bold">🎉 Égalité testée avec succès !</h5>
              <p className="small mb-1">
                Tu as trouvé <strong>{equation.resGaucheAttendu.toString().replace('.', ',')}</strong> à gauche et <strong>{equation.resDroiteAttendu.toString().replace('.', ',')}</strong> à droite.
              </p>
              <p className="small mb-3 text-muted">
                {equation.resGaucheAttendu === equation.resDroiteAttendu
                  ? "Les deux résultats sont identiques : l'égalité est VRAIE pour ces valeurs."
                  : "Les deux résultats sont différents : l'égalité est FAUSSE pour ces valeurs."
                }
              </p>
              <button className="btn btn-success rounded-pill px-5 fw-bold" onClick={() => navigate("/PratiqueAutonomeTesterEgalite3")}>
                Passer à la Pratique Autonome ➡️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ZONE DROITE : CHATBOT */}
      <div className="bg-white border-start shadow-sm d-flex flex-column h-100" style={{ width: '100%', maxWidth: '100%', flexBasis: '400px' }}>
        <div className="p-2 border-bottom text-center bg-white">
          <img src={logoRobot} alt="Robot" style={{ width: '40px' }} />
          <h6 className="fw-bold mb-0">LitterAI</h6>
          <span className="text-muted small italic">Tuteur Actif</span>
        </div>

        <div className="flex-grow-1 overflow-auto p-3 bg-light d-flex flex-column">
          {conversationIA.filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
            <div key={i} className={`mb-2 p-2 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-secondary text-white ms-4' : 'bg-primary text-white me-4 border'}`}>
              {m.content}
            </div>
          ))}
          {isWorking && <div className="text-muted small p-2 text-center italic">LitterAI écrit...</div>}
        </div>

        {messageErreur && (
          <div className="p-2 bg-danger text-white text-center small fw-bold animate__animated animate__headShake">
            {messageErreur}
          </div>
        )}

        {!isFinished && (
          <div className="p-2 border-top bg-white">
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <input
                type="text"
                className="form-control border-0 px-3"
                style={{ fontSize: '0.85rem' }}
                placeholder="Poser une question à LitterAI..."
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

export default PratiqueGuideTesterEgalite3;