import { useEffect, useState } from "react";
import { envoyerMessage } from "../services/LitterAI_API.js";
import { useNavigate } from "react-router-dom";

function IntroductionIA({ prompt, pathSkip }) {
  const navigate = useNavigate();
  const [conversationIA, setConversationIA] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  async function discussionIA(messageUtilisateur = "") {
    setIsWorking(true);
    const nouveauMessage = { role: "user", content: messageUtilisateur };
    const historique = messageUtilisateur ? [...conversationIA, nouveauMessage] : conversationIA;

    if (messageUtilisateur) {
      setConversationIA(historique);
    }

    const promptSysteme = {
      role: "system",
      content: prompt
    };

    await envoyerMessage([promptSysteme, ...historique], setConversationIA, "", () => {}, setIsWorking);
  }

  useEffect(() => {
    const initChat = async () => {
      await discussionIA();
    };
    initChat();
  }, []);

  return (
    <div className="d-flex flex-column vh-100 bg-light pt-5">

      <div className="flex-grow-1 overflow-auto p-3 p-md-5 mt-4" style={{ scrollBehavior: 'smooth' }}>
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          {(conversationIA || [])
            .filter(m => m.role !== 'system' && m.content.trim() !== "")
            .map((m, i) => (
              <div
                key={i}
                className={`d-flex mb-4 ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`p-3 shadow-sm chat-bubble ${
                    m.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-dark border-light custom-bot-bubble'
                  }`}
                  style={{ maxWidth: '85%', whiteSpace: 'pre-wrap' }}
                >
                  {m.content}
                </div>
              </div>
            ))}

          {isWorking && (
            <div className="d-flex justify-content-start mb-4">
              <div className="p-3 shadow-sm chat-bubble bg-white text-dark border-light custom-bot-bubble d-flex align-items-center gap-2 opacity-75">
                <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                <span className="small fw-medium">LitterAI réfléchit...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white bg-opacity-75 border-top p-3 p-md-4 shadow-lg custom-navbar mt-auto">
        <div className="mx-auto d-flex flex-column gap-3" style={{ maxWidth: '800px' }}>
          <div className="d-flex align-items-center border border-light rounded-pill bg-light p-1 ps-3 shadow-sm custom-input-wrapper">
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none py-2 fs-6 text-dark"
              placeholder="Question au robot..."
              disabled={isWorking}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== "" && !isWorking) {
                  discussionIA(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>

          <button
            onClick={() => navigate(pathSkip)}
            className="btn btn-outline-primary w-100 py-2 rounded-pill fw-bold shadow-sm btn-hover-scale"
          >
            Passer l'introduction →
          </button>
        </div>
      </div>
    </div>
  );
}

export default IntroductionIA;