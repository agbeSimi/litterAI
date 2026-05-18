import logoRobot from "../../assets/logo_robot.png";
import {useEffect, useState} from "react";
import {envoyerMessage} from "../../services/LitterAI_API.js";
import {useNavigate} from "react-router-dom";

function IntroductionEgalite() {
  const navigate = useNavigate();
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  async function discussionIA(messageUtilisateur = "") {
    setIsWorking(true);
    const nouveauMessage = {role: "user", content: messageUtilisateur};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content:`RÔLE
          Tu es LitterAl, un tuteur socratique de maths pour un élève de 4ème. Ton but est de le faire réfléchir sur l'égalité des expressions, en deux phases.
          
          MISSION : RÉFLEXION ET PARADOXE
          1. PREMIER MESSAGE (Phase 1) : 
             - Écris : "Salut ! Prêt pour un défi ? Penses-tu que 2 * a * 5 = 10a - 10 + 2 * 5 ? Pourquoi ?"
             - ARRÊTE-TOI ICI.
          
          2. GESTION DE LA PHASE 1 (L'égalité vraie) :
             - L'objectif est qu'il simplifie chaque côté (les deux font 10a).
             - S'il hésite, demande-lui de simplifier d'abord la partie gauche, puis la droite.
             - SI L'ÉLÈVE EST COINCÉ : Explique-lui simplement. Dis-lui que pour prouver que c'est toujours vrai, il suffit de "ranger" le calcul en calculant les nombres entre eux (2 * 5 et -10 + 10) pour voir si les deux côtés sont des jumeaux parfaits.
          
          3. GESTION DE LA PHASE 2 (Le paradoxe) :
             - Une fois la Phase 1 validée, demande : "Super. Maintenant, penses-tu que 2x + 5 est égal à 3x + 2 ?"
             - Si l'élève teste x = 3, il trouve 11. Demande : "C'est vrai pour 3 ! Mais est-ce vrai pour TOUS les autres nombres ? Comment le prouver ?"
             - SI L'ÉLÈVE EST COINCÉ : Donne-lui la méthode. Explique-lui la technique du "contre-exemple" : dis-lui de remplacer x par un nombre très simple comme 0 ou 1 de chaque côté, et de regarder si l'égalité fonctionne toujours.
          
          RÈGLES DE FORMATAGE STRICTES
          - DÉBLOCAGE : Si l'élève dit qu'il ne sait pas ou se trompe 2 fois de suite, donne-lui l'explication et la méthode pas à pas.
          - LATEX : Entoure systématiquement les expressions mathématiques avec des  (ex: 2x + 5).
          - BRIÈVETÉ : 3 lignes maximum par message.
          - UNE SEULE QUESTION : Ne pose jamais deux questions à la fois.
          - ZÉRO GRAS : Pas de doubles étoiles (**).`
    };
    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {
    }, setIsWorking);
  }


  useEffect(() => {
    const initChat = async () => {
      await discussionIA();
    };
    initChat();
  }, []);

  return(
    <div className="bg-white border-start shadow-sm d-flex flex-column"
         style={{width: '100%', maxWidth: '100%', height: '100vh', flexBasis: '420px'}}>
      <div className="p-2 p-md-3 border-bottom text-center bg-white d-none d-md-block">
        <img src={logoRobot} alt="Robot" style={{width: '50px'}}/>
        <h6 className="fw-bold mb-0">LitterAl</h6>
      </div>

      <div className="flex-grow-1 overflow-auto p-3 bg-light">
        <>
          {conversationIA.filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
            <div key={i}
                 className={`mb-2 p-2 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white ms-4' : 'bg-white me-4 border'}`}>
              {m.content}
            </div>
          ))}
          {isWorking && <div className="text-muted small p-2 text-center">LitterAl réfléchit...</div>}
        </>
      </div>


      <div className="p-2 p-md-3 border-top bg-white">
        <div className="input-group shadow-sm rounded-pill overflow-hidden border">
          <input
            type="text"
            className="form-control border-0 px-3"
            style={{fontSize: '0.9rem'}}
            placeholder="Question au robot..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() !== "") {
                discussionIA(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>
      <button onClick={() => navigate("/TesterEgalite")} className="btn btn-primary btn-sm px-md-5 py-md-3 px-4 rounded-pill fw-bold d-flex flex-wrap justify-content-center gap-3 mt-4 border-0" >
        Passer l'introduction
      </button>
    </div>

  );
}

export default IntroductionEgalite;