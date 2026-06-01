import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSubmitRegister } from "../services/LitterAI_API.js";

function Inscription() {
  const [login, setLogin] = useState(""); // État pour l'identifiant
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER_ELEVE"); // Aligné avec la valeur des options
  const [mail_academique, setmail_academique] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs de l'API
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow border-0 p-4" style={{ width: "25rem", borderRadius: "15px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 fw-bold">Inscription</h2>

          {/* Affichage du message d'erreur s'il y en a un */}
          {errorMessage && (
            <div className="alert alert-danger rounded-pill text-center py-2 fs-6" role="alert">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={async (event) => {
              event.preventDefault(); // Sécurité pour éviter le rechargement de page natif
              setErrorMessage(""); // Réinitialise l'erreur à chaque tentative

              try {
                // Intégration de la variable login dans les paramètres envoyés à l'API
                await handleSubmitRegister(event, login, email, password, role, mail_academique);

                // Si tout s'est bien passé, on redirige selon le rôle
                if (role === "ROLE_USER_ELEVE") {
                  navigate("/");
                } else {
                  navigate("/verification-prof");
                }
              } catch (error) {
                // Si l'API renvoie une erreur (Ex: email non académique ou utilisateur existant)
                if (error.response && error.response.data) {
                  const message = error.response.data['hydra:description'] || "Une erreur est survenue.";
                  setErrorMessage(message);

                  // Si le message renvoyé par Symfony indique que le login existe déjà
                  if (message.includes("déjà utilisé") || message.includes("déjà un compte")) {
                    setTimeout(() => {
                      navigate("/login"); // Redirection automatique après 3 secondes vers la connexion
                    }, 3000);
                  }
                } else {
                  setErrorMessage("Impossible de contacter le serveur.");
                }
              }
            }}
          >
            {/* Champ ajouté : Identifiant (Login) */}
            <div className="mb-3">
              <label className="form-label text-muted fw-semibold">Identifiant (Login)</label>
              <input
                type="text"
                className="form-control form-control-lg rounded-pill bg-light border-0"
                placeholder="Votre identifiant"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fw-semibold">Email personnel</label>
              <input
                type="email"
                className="form-control form-control-lg rounded-pill bg-light border-0"
                placeholder="votre@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fw-semibold">Mot de passe</label>
              <input
                type="password"
                className="form-control form-control-lg rounded-pill bg-light border-0"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fw-semibold">Je suis :</label>
              <select
                className="form-select form-select-lg rounded-pill bg-light border-0"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="ROLE_USER_ELEVE">Un élève</option>
                <option value="ROLE_USER_PROF">Un professeur</option>
              </select>
            </div>

            {role === "ROLE_USER_PROF" && (
              <div className="mb-4">
                <label className="form-label text-primary fw-semibold">Email académique de vérification</label>
                <input
                  type="email"
                  className="form-control form-control-lg rounded-pill bg-light border-0 border-primary"
                  placeholder="prenom.nom@ac-academie.fr"
                  value={mail_academique}
                  onChange={(event) => setmail_academique(event.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm mt-3">
              Créer mon compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inscription;