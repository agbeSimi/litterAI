import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../services/LitterAI_API.js";
import { motion, AnimatePresence } from "framer-motion"; // <-- Import ici

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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Variantes d'animation pour le menu déroulant
  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2 } }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: { height: { duration: 0.4, ease: "easeOut" }, opacity: { duration: 0.3, delay: 0.1 } }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white bg-opacity-75 fixed-top border-bottom shadow-sm custom-navbar">
      <div className="container-fluid px-4 py-1">

        <Link className="navbar-brand fw-bolder fs-3 custom-logo" to="/">
          LitterAI
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* On utilise AnimatePresence pour gérer proprement le montage/démontage si besoin,
            mais ici on anime directement la présence des classes selon l'écran */}
        <div className="collapse navbar-collapse d-none d-lg-flex">
          {/* Version Bureau (Desktop) : Reste inchangée et toujours visible */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item mx-lg-2">
              <Link className="nav-link link-dark link-primary-hover" to="/">Accueil</Link>
            </li>
            {hasPrivilege && (
              <li className="nav-item mx-lg-2">
                <Link className="nav-link link-dark link-primary-hover" to="/creer-classe">Créer une classe</Link>
              </li>
            )}
            {hasPrivilege && (
              <li className="nav-item mx-lg-2">
                <Link className="nav-link link-dark link-primary-hover" to="/listeClasse">Gérer ses classes</Link>
              </li>
            )}
          </ul>

          {/* Boutons Desktop */}
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-3">
              {userLogin && <span className="fw-bold text-primary-gradient">● {userLogin}</span>}
              <button className="btn btn-danger btn-gradient-danger px-4 py-2 rounded-pill fw-semibold shadow-sm" onClick={() => handleLogout(onLogoutSuccess)}>Se déconnecter</button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <button className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold shadow-sm btn-hover-scale" onClick={() => navigate("/login")}>Se connecter</button>
              <button className="btn btn-primary btn-gradient-primary px-4 py-2 rounded-pill fw-semibold shadow-sm" onClick={() => navigate("/inscription")}>S'inscrire</button>
            </div>
          )}
        </div>

        {/* Version Mobile animée par Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="navbar-collapse d-lg-none w-100 overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <ul className="navbar-nav me-auto mb-2 fw-medium mt-3">
                <li className="nav-item">
                  <Link className="nav-link link-dark link-primary-hover py-2" to="/" onClick={closeMenu}>Accueil</Link>
                </li>
                {hasPrivilege && (
                  <li className="nav-item">
                    <Link className="nav-link link-dark link-primary-hover py-2" to="/creer-classe" onClick={closeMenu}>Créer une classe</Link>
                  </li>
                )}
                {hasPrivilege && (
                  <li className="nav-item">
                    <Link className="nav-link link-dark link-primary-hover py-2" to="/listeClasse" onClick={closeMenu}>Gérer ses classes</Link>
                  </li>
                )}
              </ul>

              {isAuthenticated ? (
                <div className="d-flex flex-column gap-3 pb-3">
                  {userLogin && <span className="fw-bold text-primary-gradient">● {userLogin}</span>}
                  <button className="btn btn-danger btn-gradient-danger w-100 py-2 rounded-pill fw-semibold" onClick={() => { handleLogout(onLogoutSuccess); closeMenu(); }}>Se déconnecter</button>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2 pb-3">
                  <button className="btn btn-outline-primary w-100 py-2 rounded-pill fw-semibold" onClick={() => { navigate("/login"); closeMenu(); }}>Se connecter</button>
                  <button className="btn btn-primary btn-gradient-primary w-100 py-2 rounded-pill fw-semibold" onClick={() => { navigate("/inscription"); closeMenu(); }}>S'inscrire</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}

export default Navbar;