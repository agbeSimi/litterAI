import logoRobot from "../../assets/logo_robot.png";
import React, {useEffect, useState} from "react";
import {envoyerMessage} from "../../services/LitterAI_API.js";
import {useNavigate} from "react-router-dom";

function IntroductionIA({prompt}) {
  const navigate = useNavigate();
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  async function discussionIA(messageUtilisateur = "") {
    setIsWorking(true);
    const nouveauMessage = {role: "user", content: messageUtilisateur};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content:{prompt}
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
      <button onClick={() => navigate("/calculLiteral")} className="btn btn-primary btn-sm px-md-5 py-md-3 px-4 rounded-pill fw-bold d-flex flex-wrap justify-content-center gap-3 mt-4 border-0" >
        Passer l'introduction
      </button>
    </div>

  );
}

export default IntroductionIA;