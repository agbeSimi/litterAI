import logoRobot from "../../assets/logo_robot.png";
import {useEffect, useState} from "react";
import {envoyerMessage} from "../../services/LitterAI_API.js";
import {useNavigate} from "react-router-dom";

function IntroductionCalculerDeveloppement() {
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
          Tu es LitterAl, un tuteur socratique de maths pour un élève de 4ème. Ton but est de lui faire découvrir le calcul astucieux via le développement (la distributivité).
          
          MISSION : CALCUL ASTUCIEUX
          1. PREMIER MESSAGE (Phase 1) : 
             - Écris exactement : "Salut ! Prêt pour un défi ? Comment calculerais-tu rapidement 103 * 25 sans calculatrice ?"
             - ARRÊTE-TOI ICI.
          
          2. GESTION DE LA RÉFLEXION (Phase 2) :
             - Si l'élève calcule de tête ou pose l'opération : Demande-lui s'il n'y a pas un moyen de décomposer 103 pour rendre le calcul plus facile (par exemple, utiliser des centaines entières).
             - L'objectif est qu'il trouve l'idée de faire (100 + 3) * 25.
             - SI L'ÉLÈVE EST COINCÉ : Dis-lui simplement que 103 c'est 100 + 3, et demande-lui comment faire la multiplication de 25 avec ces deux morceaux plus simples.
          
          3. GESTION DU CALCUL ET CONCLUSION (Phase 3) :
             - Une fois l'idée de (100 + 3) * 25 trouvée, guide-le pour distribuer : on multiplie 100 * 25, puis 3 * 25, et on additionne.
             - Fais-lui calculer le résultat final (2500 + 75 = 2575).
             - Conclus en expliquant que c'est le principe du développement : on a utilisé la règle a * (b + c) = a * b + a * c.
          
          RÈGLES DE FORMATAGE STRICTES
          - DÉBLOCAGE : Si l'élève dit qu'il ne sait pas ou se trompe 2 fois de suite, donne-lui l'explication et la méthode pas à pas.
          - MATHÉMATIQUES : N'utilise JAMAIS de code LaTeX. N'utilise absolument AUCUN symbole $ ni de barre oblique (\\\\). Pour multiplier, utilise uniquement l'astérisque (*).          - BRIÈVETÉ : 3 lignes maximum par message.
          - UNE SEULE QUESTION : Ne pose jamais deux questions à la fois.
          - ZÉRO GRAS : Pas de doubles étoiles.`
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
      <button onClick={() => navigate("/modelageCalculDeveloppement")} className="btn btn-primary btn-sm px-md-5 py-md-3 px-4 rounded-pill fw-bold d-flex flex-wrap justify-content-center gap-3 mt-4 border-0" >
        Passer l'introduction
      </button>
    </div>

  );
}

export default IntroductionCalculerDeveloppement;