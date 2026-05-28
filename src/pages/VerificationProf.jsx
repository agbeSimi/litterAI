import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleVerifyCode } from "../services/LitterAI_API.js";

function VerificationProf() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow border-0 p-4" style={{ width: "25rem", borderRadius: "15px" }}>
        <div className="card-body text-center">
          <h2 className="card-title mb-3 fw-bold">Vérification</h2>
          <p className="text-muted mb-4">
            Veuillez saisir le code de sécurité envoyé à votre adresse académique.
          </p>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const success = await handleVerifyCode(code);
              if (success) {
                navigate("/login");
              } else {
                alert("Code invalide ou expiré.");
              }
            }}
          >
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg text-center rounded-pill bg-light border-0 fw-bold fs-4"
                placeholder="123456"
                maxLength="6"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm">
              Valider mon compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerificationProf;