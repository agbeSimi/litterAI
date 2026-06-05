import { useNavigate } from "react-router-dom";
import logoRobot from "./../../../assets/logo_robot.png";

export default function LayoutPratiqueIA({
                                           exercice,
                                           totalQuestions,
                                           isFinished,
                                           score,
                                           niveau,
                                           isCorrect,
                                           message,
                                           conversationIA,
                                           isWorking,
                                           onValidate,
                                           onNext,
                                           onNextLevel,
                                           onRetry,
                                           onSendMessage,
                                           btnValidateText = "Valider",
                                           children
                                         }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex flex-column flex-lg-row bg-light p-0 pt-5 mt-4 app-layout">

      {/* ZONE GAUCHE : EXERCICE */}
      <div className="p-3 p-md-5 d-flex flex-column align-items-center justify-content-center exercise-section">
        <div className="card shadow-lg p-4 p-md-5 rounded-4 text-center custom-exercise-card w-100" style={{ maxWidth: '650px' }}>

          {!isFinished ? (
            <>
              {/* En-tête de l'exercice */}
              <div className="progress mb-4 rounded-pill bg-primary bg-opacity-10" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${((exercice - 1) / totalQuestions) * 100}%`,
                    background: 'linear-gradient(45deg, #0d6efd, #6610f2)'
                  }}
                ></div>
              </div>
              <h6 className="text-secondary fw-bold text-uppercase small tracking-wider mb-2 opacity-75">
                Ex {exercice} / {totalQuestions}
              </h6>

              {/* CONTENU SPÉCIFIQUE À CHAQUE PHASE */}
              <div className="my-4">
                {children}
              </div>

              {/* Bouton de validation global */}
              <div className="d-flex justify-content-center mb-3">
                {isCorrect !== true && (
                  <button
                    className="btn btn-primary btn-gradient-primary px-5 py-3 fw-bold shadow-sm rounded-pill btn-hover-scale"
                    onClick={onValidate}
                  >
                    {btnValidateText}
                  </button>
                )}
              </div>

              {/* Alertes et feedbacks */}
              {message && (
                <div className={`alert ${isCorrect ? 'alert-success border-success' : 'alert-danger border-danger'} border-opacity-25 rounded-4 py-3 px-4 shadow-sm animate__animated animate__fadeIn mt-4`}>
                  <div className="fw-medium mb-3 small">{message}</div>
                  <button
                    className={`btn ${isCorrect ? 'btn-success' : 'btn-outline-danger btn-hover-scale'} rounded-pill px-5 fw-bold w-100 w-sm-auto`}
                    onClick={onNext}
                  >
                    {exercice < totalQuestions ? "Question suivante →" : "Voir le bilan complet"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ÉCRAN BILAN */
            <div className="animate__animated animate__fadeIn py-4">
              <h2 className="fw-bolder mb-2 custom-logo">Bilan de l'entraînement</h2>
              <div className="display-1 fw-bold mb-4 text-dark opacity-75">{score} <span className="fs-3 text-secondary">/ {totalQuestions}</span></div>

              {(score / totalQuestions) >= 0.75 ? (
                <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-4 mt-4">
                  <p className="fw-semibold text-success mb-4">Excellent travail ! Prêt pour la suite ?</p>
                  <button
                    className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale w-100"
                    onClick={onNextLevel}
                  >
                    {niveau < 3 ? "🚀 Niveau Suivant" : "🏆 Terminer le module"}
                  </button>
                </div>
              ) : (
                <div className="bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-4 p-4 mt-4">
                  <p className="fw-semibold text-danger mb-4">Encore quelques erreurs. Il faut réviser la méthode.</p>
                  <button
                    className="btn btn-danger rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover-scale w-100"
                    onClick={onRetry}
                  >
                    Retour à la leçon 📖
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ZONE DROITE : CHAT IA */}
      <div className="bg-white border-top border-lg-start border-lg-top-0 shadow-sm d-flex flex-column z-1 chat-sidebar">
        <div className="p-3 border-bottom text-center bg-white d-none d-lg-block shadow-sm z-1">
          <img src={logoRobot} alt="Robot" style={{ width: '45px' }} className="mb-1 logo-bounce cursor-pointer" onClick={() => navigate("/")} />
          <h6 className="fw-bolder mb-0 custom-logo fs-5">LitterAI</h6>
        </div>

        <div className="flex-grow-1 overflow-auto p-3 p-md-4 bg-light d-flex flex-column gap-3" style={{ scrollBehavior: 'smooth' }}>
          {isCorrect === false && !isFinished ? (
            <>
              {(conversationIA || []).filter(m => m.role !== 'system' && m.content.trim() !== "").map((m, i) => (
                <div key={i} className={`d-flex ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`px-3 py-2 shadow-sm small chat-bubble ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white text-dark border-light custom-bot-bubble'}`} style={{ maxWidth: '85%', whiteSpace: 'pre-wrap' }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isWorking && (
                <div className="d-flex justify-content-start">
                  <div className="px-3 py-2 shadow-sm small chat-bubble bg-white text-dark border-light custom-bot-bubble d-flex align-items-center gap-2 opacity-75">
                    <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                    <span className="fw-medium">LitterAI analyse...</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted opacity-50 py-5 py-lg-0">
              <i className="bi bi-robot display-1 mb-3"></i>
              <p className="small text-center px-4 fw-medium">Fais l'exercice à gauche.<br />Je t'aiderai si tu te trompes !</p>
            </div>
          )}
        </div>

        {isCorrect === false && !isFinished && (
          <div className="p-3 p-md-4 border-top bg-white d-flex flex-column shadow-lg">
            <div className="d-flex align-items-center border border-light rounded-pill bg-light p-1 ps-3 shadow-sm custom-input-wrapper">
              <input
                type="text"
                className="form-control border-0 bg-transparent shadow-none py-2"
                style={{ fontSize: '0.95rem' }}
                placeholder="Demander de l'aide à LitterAI..."
                disabled={isWorking}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim() !== "" && !isWorking) {
                    onSendMessage(e.target.value);
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