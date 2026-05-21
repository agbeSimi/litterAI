import logoRobot from "../assets/logo_robot.png";
import {useEffect, useState} from "react";
import {envoyerMessage} from "../services/LitterAI_API.js";
import {useNavigate} from "react-router-dom";

function IntroductionIA({prompt, pathSkip}) {
  const navigate = useNavigate();
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  async function discussionIA(messageUtilisateur = "") {
    setIsWorking(true);
    const nouveauMessage = {role: "user", content: messageUtilisateur};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: prompt
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

  return (
    <div className="bg-white border-start shadow-sm d-flex flex-column"
         style={{width: '100%', maxWidth: '100%', height: '100vh', flexBasis: '420px'}}>
      <div className="p-2 p-md-3 border-bottom text-center bg-white d-none d-md-block shadow-sm z-1">
        <img src={logoRobot} alt="Robot" style={{width: '50px'}} className="mb-1"/>
        <h6 className="fw-bold mb-0 text-primary">LitterAl</h6>
      </div>

      <div className="flex-grow-1 overflow-auto p-3 p-md-4 bg-light d-flex flex-column gap-3">
        {(conversationIA || []).filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
          <div key={i}
               className={`px-3 py-2 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white align-self-end' : 'bg-white text-dark border align-self-start'}`}
               style={{
                 maxWidth: '85%',
                 width: 'fit-content',
                 borderBottomRightRadius: m.role === 'user' ? '4px' : 'var(--bs-border-radius-xl)',
                 borderBottomLeftRadius: m.role !== 'user' ? '4px' : 'var(--bs-border-radius-xl)'
               }}>
            {m.content}
          </div>
        ))}
        {isWorking && <div className="text-muted small p-2 align-self-start">LitterAl réfléchit...</div>}
      </div>

      <div className="p-3 p-md-4 border-top bg-white d-flex flex-column gap-3">
        <div className="input-group shadow-sm rounded-pill overflow-hidden border">
          <input
            type="text"
            className="form-control border-0 px-4 py-2 shadow-none"
            style={{fontSize: '0.95rem'}}
            placeholder="Question au robot..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() !== "") {
                discussionIA(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
        <button onClick={() => navigate(pathSkip)} className="btn btn-outline-primary w-100 py-2 rounded-pill fw-bold shadow-sm" >
          Passer l'introduction →
        </button>
      </div>
    </div>
  );
}

export default IntroductionIA;