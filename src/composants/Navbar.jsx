import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../services/LitterAI_API.js";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("jwt_token");
  const isAuthenticated = !!token;

  let userLogin = "";
  let userRoles = [];

  if (isAuthenticated) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userLogin = payload.username || payload.login || "";
      userRoles = payload.roles || [];
    } catch (e) {
      console.error(e);
    }
  }

  const hasPrivilege = userRoles.includes("ROLE_ADMIN") || userRoles.includes("ROLE_USER_PROFESSEUR");

  const onLogoutSuccess = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)"
      }}
    >
      <div className="container-fluid px-4 py-1">

        <Link
          className="navbar-brand fw-bolder fs-3"
          to="/"
          style={{
            background: "linear-gradient(45deg, #0d6efd, #6610f2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px"
          }}
        >
          LitterAI
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium mt-3 mt-lg-0">
            <li className="nav-item mx-lg-2">
              <Link
                className="nav-link"
                to="/"
                onClick={closeMenu}
                style={{ color: "#333", transition: "color 0.3s" }}
                onMouseOver={(e) => e.target.style.color = "#0d6efd"}
                onMouseOut={(e) => e.target.style.color = "#333"}
              >
                Accueil
              </Link>
            </li>
            {hasPrivilege && (
              <li className="nav-item mx-lg-2">
                <Link
                  className="nav-link"
                  to="/creer-classe"
                  onClick={closeMenu}
                  style={{ color: "#333", transition: "color 0.3s" }}
                  onMouseOver={(e) => e.target.style.color = "#0d6efd"}
                  onMouseOut={(e) => e.target.style.color = "#333"}
                >
                  Créer une classe
                </Link>
              </li>
            )}
            {hasPrivilege && (
              <li className="nav-item mx-lg-2">
                <Link
                  className="nav-link"
                  to="/listeClasse"
                  onClick={closeMenu}
                  style={{ color: "#333", transition: "color 0.3s" }}
                  onMouseOver={(e) => e.target.style.color = "#0d6efd"}
                  onMouseOut={(e) => e.target.style.color = "#333"}
                >
                  Gérer ses classes
                </Link>
              </li>
            )}
          </ul>

          {isAuthenticated ? (
            <div className="d-flex flex-column flex-lg-row align-items-center gap-4 mt-3 mt-lg-0">
              {userLogin && (
                <span className="fw-bold" style={{ color: "#6610f2", letterSpacing: "0.5px" }}>
                  <span style={{ color: "#0d6efd" }}>●</span> {userLogin}
                </span>
              )}
              <button
                className="btn btn-danger px-4 py-2 mt-3 mt-lg-0 rounded-pill fw-semibold shadow-sm w-100 w-lg-auto"
                style={{
                  background: "linear-gradient(45deg, #dc3545, #fd7e14)",
                  border: "none",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                onClick={() => {
                  handleLogout(onLogoutSuccess);
                  closeMenu();
                }}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column flex-lg-row gap-3 mt-3 mt-lg-0">
              <button
                className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold shadow-sm w-100 w-lg-auto"
                style={{ transition: "transform 0.2s" }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
              >
                Se connecter
              </button>
              <button
                className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm w-100 w-lg-auto"
                style={{
                  background: "linear-gradient(45deg, #0d6efd, #6610f2)",
                  border: "none",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                onClick={() => {
                  navigate("/inscription");
                  closeMenu();
                }}
              >
                S'inscrire
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;