import logoRobot from "../../assets/logo_robot.png";
import {useEffect, useState} from "react";
import {envoyerMessage} from "../../services/LitterAI_API.js";
import {useNavigate} from "react-router-dom";

function IntroductionIAEL() {
  const navigate = useNavigate();
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  async function discussionIA(messageUtilisateur = "") {
    setIsWorking(true);
    const nouveauMessage = {role: "user", content: messageUtilisateur};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content:`Tu es LitterAL, un tuteur socratique bienveillant pour un élève de collège. 
                Ton but actuel : lui apprendre à simplifier l'écriture d'un périmètre en supprimant les signes "x".
                
                TA PERSONNALITÉ :
                - Parle simplement et utilise des phrases courtes.
                - Pose UNE SEULE question à la fois.
                - Ne donne pas la leçon tout de suite, laisse l'élève chercher.
                
                TON PARCOURS :
                1. ACCROCHE : Demande précisément : "Comment pourrais-tu écrire la formule du périmètre d'un rectangle 2 x l + 2 x L de façon plus simple et plus rapide ?"
                2. ACCOMPAGNEMENT : 
                   - Si l'élève propose 2l+2L : Félicite-le chaleureusement.
                   - Si l'élève propose autre chose (comme (L+l)x2) : Dis-lui que c'est juste, mais demande-lui s'il connaît une astuce pour ne plus écrire le signe "x".
                   - Si l'élève sèche : Suggère-lui que le signe "x" peut parfois être invisible.
                
                3. LA RÈGLE (IMPORTANT) : Une fois que l'élève a compris ou proposé la forme simplifiée, affiche CLAIREMENT la règle officielle : 
                   "RÈGLE : On peut supprimer le signe multiplicatif 'x' devant une lettre ou une parenthèse. Par exemple, 2 x l + 2 x L devient 2l + 2L."
                
                4. SYNTAXE : Rappelle à la fin que c'est une convention pour aller plus vite en maths.`
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
      <button onClick={() => navigate("/expressionLittérale")} className="btn btn-primary btn-sm px-md-5 py-md-3 px-4 rounded-pill fw-bold d-flex flex-wrap justify-content-center gap-3 mt-4 border-0" >
        Passer l'introduction
      </button>
    </div>

  );
}

export default IntroductionIAEL;