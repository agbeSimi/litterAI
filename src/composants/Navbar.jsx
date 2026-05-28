import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../services/LitterAI_API.js";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem("jwt_token");

  const onLogoutSuccess = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container-fluid px-4">

        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
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
              <Link className="nav-link text-dark" to="/" onClick={closeMenu}>
                Accueil
              </Link>
            </li>
          </ul>

          {isAuthenticated ? (
            <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
                <button
                  className="btn btn-outline-danger px-4 py-2 mt-3 mt-lg-0 rounded-pill fw-semibold shadow-sm w-100 w-lg-auto"
                  onClick={() => {
                    handleLogout(onLogoutSuccess);
                    closeMenu();
                  }}
                >
                  Se déconnecter
                </button>
            </div>
          ) : (
            <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
              <button
                className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold shadow-sm w-100 w-lg-auto"
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
              >
                Se connecter
              </button>
              <button
                className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm w-100 w-lg-auto"
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