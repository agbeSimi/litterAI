import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {handleSubmitRegister} from "../services/LitterAI_API.js";
// import { handleSubmitRegister } from "../services/LitterAI_API.js";

function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("eleve");
  const [emailPro, setEmailPro] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow border-0 p-4" style={{ width: "25rem", borderRadius: "15px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 fw-bold">Inscription</h2>

          <form
            onSubmit={async (event) => {
              await handleSubmitRegister(event, email, password, role, emailPro);
              if (role === "eleve") {
                navigate("/login");
              } else {
                navigate("/verification-prof");
              }
            }}
          >
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
                <option value="eleve">Un élève</option>
                <option value="professeur">Un professeur</option>
              </select>
            </div>

            {role === "professeur" && (
              <div className="mb-4">
                <label className="form-label text-primary fw-semibold">Email académique de vérification</label>
                <input
                  type="email"
                  className="form-control form-control-lg rounded-pill bg-light border-0 border-primary"
                  placeholder="prenom.nom@ac-academie.fr"
                  value={emailPro}
                  onChange={(event) => setEmailPro(event.target.value)}
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