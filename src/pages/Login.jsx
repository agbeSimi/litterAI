import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSubmitLogin } from "../services/LitterAI_API.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onLoginSubmit = async (event) => {
    event.preventDefault(); // On évite le rechargement de la page si ce n'est pas déjà géré
    setIsLoading(true);

    await handleSubmitLogin(event, userName, password);

    if (localStorage.getItem("jwt_token")) {
      navigate("/");
    }

    setIsLoading(false);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card shadow-lg border-0 rounded-4 p-4 p-md-5 animate__animated animate__fadeIn"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div className="card-body p-0">

          {/* En-tête du formulaire */}
          <div className="text-center mb-5">

            <h2 className="fw-bolder custom-logo mb-1">LitterAI</h2>
            <p className="text-secondary fw-medium">Connectez-vous à votre espace</p>
          </div>

          <form onSubmit={onLoginSubmit}>

            {/* Champ Identifiant */}
            <div className="mb-4">
              <label className="form-label text-secondary fw-bold small text-uppercase tracking-wider">
                Identifiant
              </label>
              <div className="input-group shadow-sm rounded-4 overflow-hidden border border-light">
                <span className="input-group-text bg-light border-0 text-primary px-4">
                  <i className="bi bi-person-fill fs-5"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg bg-light border-0 custom-input-wrapper py-3 fw-medium text-dark"
                  placeholder="Votre pseudo"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="mb-5">
              <label className="form-label text-secondary fw-bold small text-uppercase tracking-wider">
                Mot de passe
              </label>
              <div className="input-group shadow-sm rounded-4 overflow-hidden border border-light">
                <span className="input-group-text bg-light border-0 text-primary px-4">
                  <i className="bi bi-lock-fill fs-5"></i>
                </span>
                <input
                  type="password"
                  className="form-control form-control-lg bg-light border-0 custom-input-wrapper py-3 fw-medium text-dark"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              className="btn btn-primary btn-gradient-primary btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm btn-hover-scale d-flex justify-content-center align-items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <i className="bi bi-box-arrow-in-right fs-5"></i>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;