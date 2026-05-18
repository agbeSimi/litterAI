import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { envoyerMessage } from "../../../services/LitterAI_API.js";
import logoRobot from "../../../assets/logo_robot.png";

function PratiqueGuideTesterEgalite1() {
  const [progression, setProgression] = useState(0);
  // Étapes : 0 = Remplacer à gauche, 1 = Remplacer à droite, 2 = Calculer à gauche, 3 = Calculer à droite, 4 = Conclusion

  const [equation] = useState(genererEquationIdentique());

  const [inputGauche, setInputGauche] = useState("");
  const [inputDroite, setInputDroite] = useState("");
  const [calculGauche, setCalculGauche] = useState("");
  const [calculDroite, setCalculDroite] = useState("");

  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");

  const navigate = useNavigate();

  function genererEquationIdentique() {
    const m = Math.floor(Math.random() * 3) + 2;     // Multiplicateur 1 (entre 2 et 4)
    const k = Math.floor(Math.random() * 4) + 2;     // Multiplicateur 2 (entre 2 && 5)
    const coeff = m * k;                             // Coefficient global de x
    const xAleatoire = Math.floor(Math.random() * 5) + 2; // Valeur de x à tester (entre 2 et 6)

    return {
      x: xAleatoire,
      texteGauche: `${m} * x * ${k}`,
      texteDroite: `${coeff} * x - ${coeff} + ${m} * ${k}`,
      // Formes attendues pour la validation (sans espaces, accepte * ou × via nettoyage)
      attenduGauche: `${m}*${xAleatoire}*${k}`,
      attenduDroite: `${coeff}*${xAleatoire}-${coeff}+${m}*${k}`,
      // Calculs numériques réels
      solutionNumerique: coeff * xAleatoire // Les deux côtés donneront exactement ça !
    };
  }
  // --- ACTIONS IA (GUIDAGE ET CORRECTIONS) ---

  async function discuterErreur(msg = "") {
    if (!equation) return;
    setIsWorking(true);

    const promptSysteme = {
      role: "system",
      content: `RÔLE: LitterAl, tuteur de maths socratique pour un élève de 4ème.
      CONTEXTE: L'élève teste l'égalité ${equation.texteGauche} = ${equation.texteDroite} avec x = ${equation.x}.
      Cette égalité est particulière : elle est TOUJOURS vraie pour n'importe quelle valeur de x car les deux membres se simplifient en ${equation.coeff}x.
      Étape actuelle de l'élève : ${progression}.
      CONSIGNES DE GUIDAGE:
      - Si progression = 0 ou 1 (Remplacement) : Rappelle qu'on remplace la lettre x par le nombre ${equation.x}, en faisant réapparaître le signe *.
      - Si progression = 2 ou 3 (Calcul) : Rappelle de respecter les priorités opératoires (les multiplications d'abord !).
      - Ne donne jamais le résultat numérique (${equation.solutionNumerique}) directement.
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


  function validerRemplacementGauche() {
    const texteNettoye = inputGauche.replace(/\s/g, "");
    if (texteNettoye === equation.attenduGauche) {
      setMessageErreur("");
      setProgression(1);
    } else {
      setMessageErreur("Ce n'est pas le bon remplacement à gauche. Réessaie !");
      discuterErreur(`J'ai écrit ${inputGauche} pour le membre de gauche.`);
    }
  }

  function validerRemplacementDroite() {
    const texteNettoye = inputDroite.replace(/\s/g, "");
    if (texteNettoye === equation.attenduDroite) {
      setMessageErreur("");
      setProgression(2);
    } else {
      setMessageErreur("Ce n'est pas le bon remplacement à droite. Réessaie !");
      discuterErreur(`J'ai écrit ${inputDroite} pour le membre de droite.`);
    }
  }

  function validerCalculGauche() {


    if (parseInt(calculGauche) === equation.solutionNumerique) {
      setMessageErreur("");
      setProgression(3);
    } else {
      setMessageErreur("Le résultat du membre de gauche est incorrect.");
      discuterErreur(`Je trouve ${calculGauche} pour le membre de gauche.`);
    }
  }

  function validerCalculDroite() {
    // 3 * 4 + 2 fait bien 14
    // const solutionAttendue = 3 * valeurs.x + 2;

    if (parseInt(calculDroite) === equation.solutionNumerique) {
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      ajouterMessageIA(`Commençons ! Remplace la lettre x par ${equation.x} dans le membre de gauche (${equation.texteGauche}). N'oublie pas le signe * !`);
    } else if (progression === 1) {
      ajouterMessageIA(`Parfait. Fais maintenant la même chose pour le membre de droite (${equation.texteDroite}).`);
    } else if (progression === 2) {
      ajouterMessageIA(`Excellent ! Calcule maintenant le résultat final pour le membre de gauche.`);
    } else if (progression === 3) {
      ajouterMessageIA(`On y est presque. Calcule le résultat final pour le membre de droite.`);
    } else if (progression === 4) {
      ajouterMessageIA(`Incroyable ! On trouve ${equation.solutionNumerique} des deux côtés. Les deux membres redonnent exactement la même valeur !`);
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
            <span className="badge bg-info text-dark p-2">Identité universelle</span>
          </div>

          <div className="bg-light p-3 rounded-4 border shadow-sm mb-4 text-center mx-auto w-100">
            <p className="mb-1 text-muted small">On souhaite tester l'égalité suivante pour <span className="fw-bold text-primary">x = {equation.x}</span> :</p>
            <h4 className="fw-bold text-dark mb-0">{equation.texteGauche} = {equation.texteDroite}</h4>
          </div>

          {/* LAYOUT DEUX COLONNES */}
          <div className="row text-center g-3 mb-4">

            {/* MEMBRE DE GAUCHE */}
            <div className="col-6">
              <div className="border rounded-4 p-3 bg-white h-100 shadow-sm border-start border-4 border-info">
                <span className="text-info small text-uppercase fw-bold">Membre de gauche</span>
                <div className="fs-5 my-2 fw-bold text-dark">{equation.texteGauche}</div>

                {/* Remplacement Gauche */}
                {progression >= 0 && (
                  <div className="mt-3">
                    <label className="small text-muted d-block mb-1">Remplacement :</label>
                    {progression > 0 ? (
                      <span className="fs-6 text-success fw-bold">{inputGauche}</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control text-center form-control-sm fw-bold border-primary"
                        placeholder={`Ex: 2 * ${equation.x} * 5`}
                        value={inputGauche}
                        onChange={(e) => setInputGauche(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && validerRemplacementGauche()}
                      />
                    )}
                  </div>
                )}

                {/* Calcul Gauche */}
                {progression >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top">
                    <label className="small text-muted d-block mb-1">Résultat final :</label>
                    {progression > 2 ? (
                      <span className="fs-5 text-success fw-bold">{calculGauche}</span>
                    ) : (
                      <input
                        type="number"
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
              <div className="border rounded-4 p-3 bg-white h-100 shadow-sm border-start border-4 border-warning">
                <span className="text-warning small text-uppercase fw-bold">Membre de droite</span>
                <div className="fs-5 my-2 fw-bold text-dark">{equation.texteDroite}</div>

                {/* Remplacement Droite */}
                {progression >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                    <label className="small text-muted d-block mb-1">Remplacement :</label>
                    {progression > 1 ? (
                      <span className="fs-6 text-success fw-bold">{inputDroite}</span>
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
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-top">
                    <label className="small text-muted d-block mb-1">Résultat final :</label>
                    {progression > 3 ? (
                      <span className="fs-5 text-success fw-bold">{calculDroite}</span>
                    ) : (
                      <input
                        type="number"
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

          {/* BILAN DE FIN */}
          {isFinished && (
            <div className="alert alert-success text-center rounded-4 shadow-sm p-4 animate__animated animate__fadeIn">
              <h5 className="fw-bold">🎉 Égalité testée avec succès !</h5>
              <p className="small mb-1">Tu as trouvé <strong>{equation.solutionNumerique}</strong> des deux côtés.</p>
              <p className="small mb-3 text-muted">Cette égalité est toujours vraie car les deux membres cachent la même expression littérale.</p>
              <button className="btn btn-success rounded-pill px-5 fw-bold" onClick={() => navigate("/PratiqueAutonomeTesterEgalite1")}>
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


export default PratiqueGuideTesterEgalite1;