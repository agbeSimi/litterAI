import { useState, useMemo, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import {envoyerMessage} from "../../../services/LitterAI_API.js";
import logoRobot from "../../../assets/logo_robot.png";

import CarteADeposer from "../composant/CarteADeposer.jsx";
import GenererProgramme from "../composant/GenerProgramme.jsx";
import ZoneADeposer from "../composant/ZoneADeposer.jsx";


function PratiqueGuideInteractif() {
  const [progression, setProgression] = useState(0);
  // 'CARTE' = attend le glisser-déposer | 'CALCUL' = attend la saisie du résultat
  const [sousEtape, setSousEtape] = useState("CARTE");
  const [emplacements, setEmplacements] = useState({});
  const [currentEquation] = useState(GenererProgramme());
  const [inputEleve, setInputEleve] = useState("");

  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");

  const navigate = useNavigate();

  const etapes = useMemo(() => [
    { id: 0, consigne: currentEquation.premierePartie, solution: currentEquation.solutions[0] },
    { id: 1, consigne: currentEquation.deuxiemePartie, solution: currentEquation.solutions[1] },
    { id: 2, consigne: currentEquation.troisiemePartie, solution: currentEquation.solutions[2] }
  ], [currentEquation]);

  const cartesMelangees = useMemo(() => {
    const vraies = etapes.map((etape, index) => ({
      id: `vrai-${index}`,
      etapeRef: index,
      affichage: index === 0 ? `× ${currentEquation.a}` :
        index === 1 ? `${currentEquation.operation} ${currentEquation.b}` :
          `${currentEquation.operationFinale === '*' ? '×' : ':'} ${currentEquation.c}`,
      consigneSource: etape.consigne
    }));

    const leurres = [
      { id: "f1", affichage: `× ${currentEquation.a + 1}`, consigneSource: "fake" },
      { id: "f2", affichage: `${currentEquation.operation === "+" ? "-" : "+"} ${currentEquation.b}`, consigneSource: "fake" },
      { id: "f3", affichage: `: ${currentEquation.c + 1}`, consigneSource: "fake" }
    ];

    return [...vraies, ...leurres].sort(() => Math.random() - 0.5);
  }, [currentEquation, etapes]);

  // --- GESTION DU SCÉNARIO LITTERAI (GUIDAGE PROACTIF) ---
  function ajouterMessageIA(texte) {
    setConversationIA(prev => {
      // Bloque le doublon si le texte est déjà le dernier message de la liste
      if (prev.length > 0 && prev[prev.length - 1].content === texte) {
        return prev;
      }
      return [...prev, { role: "assistant", content: texte }];
    });
  }

  // --- ACTIONS IA (CORRECTIONS) ---
  async function discuterErreur(msg = "", typeErreur = "CARTE") {
    setIsWorking(true);

    const consigneActuelle = etapes[progression].consigne;
    const nombrePrecedent = progression === 0 ? currentEquation.x : currentEquation.solutions[progression - 1];

    const promptSysteme = {
      role: "system",
      content: `RÔLE: LitterAl, tuteur de maths bienveillant.
      CONTEXTE: Pratique guidée. Étape ${progression + 1}/3. Consigne: "${consigneActuelle}".
      RÈGLES DE GUIDAGE:
      - Si erreur de CARTE (${typeErreur === 'CARTE'}): Explique quel symbole correspond au mot de l'instruction (ex: ajouter = +, soustraire = -) sans donner la carte exacte.
      - Si erreur de CALCUL (${typeErreur === 'CALCUL'}): Demande de faire le calcul en partant de ${nombrePrecedent} avec l'opération de la carte posée.
      FORMAT: 3 lignes max. Une seule question. Pas de gras.`
    };

    const nouveauMessage = { role: "user", content: msg };
    const historique = [...conversationIA, nouveauMessage];
    setConversationIA(historique);

    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

  // --- LOGIQUE DE JEU (VERROUILLÉE PAR L'IA) ---
  function handleDragEnd(event) {
    // Si l'IA n'a pas demandé une carte, on bloque
    if (sousEtape !== "CARTE") {
      setMessageErreur("Attends ! Remplis d'abord la case résultat.");
      return;
    }

    const { active, over } = event;
    if (!over) return;
    const indexTarget = parseInt(over.id);

    // Vérification stricte : bonne carte et bon emplacement
    if (indexTarget === progression) {
      const carteTrouvee = cartesMelangees.find(c => c.id === active.id || c.consigneSource === active.id);

      if (carteTrouvee && carteTrouvee.consigneSource === etapes[progression].consigne) {
        setEmplacements(prev => ({ ...prev, [progression]: carteTrouvee.affichage }));
        setMessageErreur("");
        setSousEtape("CALCUL"); // On passe la main au calcul
      } else {
        setMessageErreur("Ce n'est pas la bonne carte !");
        discuterErreur("J'ai glissé une carte mais elle a été refusée.", "CARTE");
      }
    } else {
      setMessageErreur("Glisse la carte dans le premier emplacement vide.");
    }
  }

  function verifierResultat() {
    if (sousEtape !== "CALCUL") return;

    if (parseInt(inputEleve) === etapes[progression].solution) {
      setInputEleve("");
      setMessageErreur("");

      if (progression < 2) {
        setProgression(prev => prev + 1);
        setSousEtape("CARTE"); // Reboucle sur la demande de carte suivante
      } else {
        setProgression(3);
        setIsFinished(true); // Fin de l'exercice guidé
      }
    } else {
      setMessageErreur("Le calcul est incorrect.");
      discuterErreur(`J'ai calculé ${inputEleve} mais ce n'est pas le bon résultat.`, "CALCUL");
    }
  }

  useEffect(() => {
    if (progression >= 3) return;

    // Déclenchement automatique des questions de guidage
    if (sousEtape === "CARTE") {
      const consigneActuelle = etapes[progression].consigne;
      const positionTexte = progression === 0 ? "première" : progression === 1 ? "deuxième" : "troisième";
      ajouterMessageIA(`Lis la ${positionTexte} ligne du programme : "${consigneActuelle}". Quelle carte dois-tu glisser dans le prochain emplacement ?`);
    } else if (sousEtape === "CALCUL") {
      ajouterMessageIA(`Parfait ! Maintenant, saisis le résultat de cette opération dans la case en dessous.`);
    }
  }, [progression, sousEtape, etapes]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container-fluid d-flex flex-column flex-md-row vh-100 bg-light p-0 overflow-hidden">

        {/* ZONE GAUCHE : EXERCICE */}
        <div className="flex-grow-1 p-2 p-md-4 d-flex flex-column align-items-center overflow-auto h-100">
          <div className="card shadow-lg p-3 p-md-4 rounded-4 border-0 w-100 mb-3" style={{ maxWidth: '700px' }}>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-primary fw-bold mb-0">Phase 2 : Pratique Guidée</h5>
              <span className="badge bg-info text-dark p-2">Session assistée</span>
            </div>

            {/* Enoncé du programme */}
            <div className="bg-light p-3 rounded-4 border shadow-sm mb-3 text-start mx-auto w-100">
              <h6 className="text-primary border-bottom pb-2 fw-bold small">📜 Programme de calcul :</h6>
              <ul className="list-unstyled mb-0 small">
                {etapes.map((etape, idx) => (
                  <li key={idx} className={`${progression === idx ? "fw-bold text-dark fs-6 border-start border-primary border-3 ps-2" : "text-muted opacity-50"}`}>
                    {progression > idx ? "✅ " : (progression === idx ? "👉 " : "• ")} {etape.consigne}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-2 rounded-3 mb-3 border text-center shadow-sm">
              Nombre de départ : <span className="fs-3 fw-bold text-primary">{currentEquation.x}</span>
            </div>

            {/* Construction de la chaîne */}
            <div className="d-flex flex-column align-items-center gap-1 mb-4">
              {etapes.map((etape, index) => (
                <div key={index} className="w-100">
                  {index > 0 && <div className="text-muted text-center opacity-50">⬇️</div>}
                  <div className="d-flex align-items-center justify-content-center gap-2">

                    {/* Emplacement carte */}
                    <ZoneADeposer id={index} cardInside={emplacements[index]} />

                    {/* Emplacement calcul */}
                    <div className={`border rounded-3 bg-white shadow-sm d-flex align-items-center justify-content-center ${progression === index && sousEtape === 'CALCUL' ? 'border-primary border-2' : ''}`} style={{ width: '100px', height: '60px' }}>
                      {progression > index ? (
                        <span className="text-success fw-bold">{etape.solution}</span>
                      ) : (progression === index && sousEtape === "CALCUL") ? (
                        <input
                          type="number"
                          className="form-control text-center fw-bold border-0 p-0"
                          value={inputEleve}
                          onChange={(e) => setInputEleve(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && verifierResultat()}
                          placeholder="?"
                          autoFocus
                        />
                      ) : <span className="text-muted opacity-25">...</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gestion du Bilan ou Banque de cartes */}
            {isFinished ? (
              <div className="alert alert-success text-center rounded-4 shadow-sm p-4 animate__animated animate__fadeIn">
                <h4 className="fw-bold">🎉 Programme terminé avec succès !</h4>
                <p className="small mb-3">Tu as parfaitement suivi le guidage de l'IA.</p>
                <button className="btn btn-success rounded-pill px-5 fw-bold" onClick={() => navigate("/pratiqueAutonomeInteractif")}>
                  Passer à la Pratique Autonome ➡️
                </button>
              </div>
            ) : (
              <div className={`p-3 bg-white border rounded-4 w-100 shadow-sm ${sousEtape !== 'CARTE' ? 'opacity-50' : ''}`}>
                <p className="small fw-bold text-muted mb-2 text-center">Banque d'opérations :</p>
                <div className="d-flex flex-wrap justify-content-center gap-1">
                  {cartesMelangees.map((c) => {
                    const estPlacee = c.id.startsWith('vrai') ? emplacements[c.etapeRef] !== undefined : false;
                    return !estPlacee && (
                      <CarteADeposer key={c.id} id={c.id} content={c.affichage} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ZONE DROITE : CHATBOT (Surveillance et Guidage) */}
        <div className="bg-white border-start shadow-sm d-flex flex-column h-100"
             style={{ width: '100%', maxWidth: '100%', flexBasis: '400px' }}>

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

          {/* Saisie textuelle libre */}
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
                      discuterErreur(e.target.value, sousEtape);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}

export default PratiqueGuideInteractif;