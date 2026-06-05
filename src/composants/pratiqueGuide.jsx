import { envoyerMessage, lancerExercice } from "../services/LitterAI_API.js";
import { useState } from "react";
import logoRobot from "../assets/logo_robot.png";
import { useNavigate } from "react-router-dom";

export function PratiqueGuide({ titre, lienPratiqueAutonome, prompt }) {
  const [conversation, setConversation] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column vh-100 bg-light">

      {/* --- En-tête de l'exercice --- */}
      <div className="bg-white bg-opacity-75 border-bottom p-3 shadow-sm d-flex align-items-center custom-navbar fixed-top">
        <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center me-3 logo-bounce cursor-pointer"
             style={{ width: '48px', height: '48px' }}
             onClick={() => navigate("/")}>
          <img
            src={logoRobot}
            alt="Robot"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <h5 className="mb-0 fw-bold text-dark fs-6 fs-md-5">
          <span className="text-primary-gradient fw-bolder">{titre}</span>
        </h5>

        {/* Bouton vers la pratique autonome avec animation existante */}
        <button
          className="btn btn-outline-primary btn-hover-scale btn-sm px-4 py-2 rounded-pill fw-bold ms-auto"
          onClick={() => navigate(lienPratiqueAutonome)}
        >
          Pratique autonome →
        </button>
      </div>

      {/* --- Zone centrale de discussion --- */}
      {/* Ajout d'un padding top pour compenser l'en-tête fixé en haut */}
      <div className="flex-grow-1 overflow-auto p-3 p-md-5 pt-5 mt-5" style={{ scrollBehavior: 'smooth' }}>
        <div className="mx-auto" style={{ maxWidth: '800px' }}>

          {/* Écran d'accueil de l'exercice (si aucune discussion commencée) */}
          {(conversation?.length || 0) === 0 && (
            <div className="d-flex flex-column align-items-center justify-content-center mt-5 py-5 border-0 rounded-4 bg-white shadow-sm custom-exercise-card text-center px-3">
              <h2 className="fw-bolder custom-logo mb-2">Bienvenue !</h2>
              <p className="text-secondary fw-medium mb-4">Prêt à t'entraîner avec l'IA ?</p>
              <button
                className="btn btn-primary btn-gradient-primary btn-lg rounded-pill px-5 shadow-sm fw-bold"
                onClick={() => lancerExercice(conversation, setConversation, setIsWorking, prompt)}
                disabled={isWorking}
              >
                {isWorking ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Génération en cours...
                  </>
                ) : "Commencer l'exercice"}
              </button>
            </div>
          )}

          {/* Affichage des messages en bulles */}
          {conversation?.filter((_, index) => index !== 0).map((message, index) => (
            <div
              key={index}
              className={`d-flex mb-4 ${message.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`p-3 shadow-sm chat-bubble ${
                  message.role === 'user'
                    ? 'bg-gradient-user text-white'
                    : 'bg-white text-dark border-light custom-bot-bubble'
                }`}
                style={{ maxWidth: '80%', whiteSpace: 'pre-wrap' }}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Zone d'Input fixée en bas --- */}
      {conversation?.length > 0 && (
        <div className="bg-white bg-opacity-75 border-top p-3 p-md-4 shadow-lg custom-navbar">
          <div className="mx-auto" style={{ maxWidth: '800px' }}>
            <div className="d-flex align-items-center border border-light rounded-pill bg-light p-1 ps-3 shadow-sm custom-input-wrapper">
              <input
                type="text"
                className="form-control border-0 bg-transparent shadow-none py-2 fs-6 text-dark"
                placeholder="Écris ta réponse ici..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isWorking}
                onKeyDown={(e) => e.key === 'Enter' && !isWorking && envoyerMessage(conversation, setConversation, input, setInput, setIsWorking)}
              />
              <button
                className={`btn border-0 rounded-circle ms-2 d-flex align-items-center justify-content-center btn-hover-scale ${
                  !input.trim() || isWorking
                    ? 'btn-light text-muted'
                    : 'btn-primary btn-gradient-primary'
                }`}
                style={{ width: '45px', height: '45px' }}
                disabled={isWorking || !input.trim()}
                onClick={() => envoyerMessage(conversation, setConversation, input, setInput, setIsWorking)}
              >
                {isWorking ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  // Utilisation d'une flèche standard en texte si tu n'as pas Bootstrap Icons, sinon l'icône reste
                  <span className="fw-bold fs-5">➔</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}