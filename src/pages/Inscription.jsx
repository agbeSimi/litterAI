import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSubmitRegister } from "../services/LitterAI_API.js";

export default function Inscription() {
  const [login, setLogin] = useState("");
  const [email] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("ROLE_USER_PROF");
  const [mail_academique, setmail_academique] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      await handleSubmitRegister(event, login, email, password, role, mail_academique);
      navigate("/verification-prof");
    } catch (error) {
      if (error.response && error.response.data) {
        const message = error.response.data['hydra:description'] || "Une erreur est survenue.";
        setErrorMessage(message);

        if (message.includes("déjà utilisé") || message.includes("déjà un compte")) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        setErrorMessage("Impossible de contacter le serveur.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light p-3 py-5">
      <div
        className="card shadow-lg border-0 rounded-4 p-4 p-md-5 animate__animated animate__fadeIn"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="card-body p-0">

          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-person-plus-fill fs-1 text-primary"></i>
            </div>
            <h2 className="fw-bolder custom-logo mb-1">Inscription Enseignant</h2>
            <p className="text-secondary fw-medium">Créez votre espace professeur</p>
          </div>

          {errorMessage && (
            <div className="alert alert-danger border-danger border-opacity-25 rounded-4 py-3 px-4 shadow-sm mb-4 d-flex align-items-center gap-3 animate__animated animate__shakeX">
              <i className="bi bi-exclamation-triangle-fill fs-4 text-danger"></i>
              <div className="fw-medium small">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={onRegisterSubmit}>

            <div className="mb-3">
              <label className="form-label text-secondary fw-bold small text-uppercase tracking-wider">
                Identifiant (Login)
              </label>
              <div className="input-group shadow-sm rounded-4 overflow-hidden border border-light">
                <span className="input-group-text bg-light border-0 text-primary px-3">
                  <i className="bi bi-person-badge fs-5"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg bg-light border-0 custom-input-wrapper py-2 fw-medium text-dark"
                  placeholder="Votre identifiant"
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary fw-bold small text-uppercase tracking-wider">
                Mot de passe
              </label>
              <div className="input-group shadow-sm rounded-4 overflow-hidden border border-light">
                <span className="input-group-text bg-light border-0 text-primary px-3">
                  <i className="bi bi-lock-fill fs-5"></i>
                </span>
                <input
                  type="password"
                  className="form-control form-control-lg bg-light border-0 custom-input-wrapper py-2 fw-medium text-dark"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-primary fw-bold small text-uppercase tracking-wider d-flex align-items-center gap-2">
                <i className="bi bi-shield-lock-fill"></i>
                Email académique de vérification
              </label>
              <div className="input-group shadow-sm rounded-4 overflow-hidden border border-primary border-opacity-50">
                <span className="input-group-text bg-primary bg-opacity-10 border-0 text-primary px-3">
                  <i className="bi bi-building fs-5"></i>
                </span>
                <input
                  type="email"
                  className="form-control form-control-lg bg-light border-0 custom-input-wrapper py-2 fw-medium text-dark"
                  placeholder="prenom.nom@ac-academie.fr"
                  value={mail_academique}
                  onChange={(event) => setmail_academique(event.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="form-text text-muted mt-2 small">
                Cet email est requis pour vérifier votre statut d'enseignant.
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-gradient-primary btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm btn-hover-scale mt-2 d-flex justify-content-center align-items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Création en cours...
                </>
              ) : (
                <>
                  Créer mon compte Professeur
                  <i className="bi bi-arrow-right-circle-fill fs-5"></i>
                </>
              )}
            </button>

            <div className="text-center mt-4">
              <span className="text-secondary small fw-medium">Déjà un compte ? </span>
              <button
                type="button"
                className="btn btn-link text-primary fw-bold p-0 text-decoration-none small"
                onClick={() => navigate('/login')}
                disabled={isLoading}
              >
                Se connecter
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}