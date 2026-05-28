import { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { handleSubmitLogin } from "../services/LitterAI_API.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow border-0 p-4" style={{ width: "25rem", borderRadius: "15px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 fw-bold">Connexion</h2>
          <form
            onSubmit={async (event) => {
              await handleSubmitLogin(event, userName, password);
              if (localStorage.getItem("jwt_token")) {
                navigate("/");

              }
            }}
          >

            <div className="mb-3">
              <label className="form-label text-muted fw-semibold">Identifiant</label>
              <input
                type="text"
                className="form-control form-control-lg rounded-pill bg-light border-0"
                placeholder="Pseudo"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                required
              />
            </div>
            <div className="mb-4">
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
            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;