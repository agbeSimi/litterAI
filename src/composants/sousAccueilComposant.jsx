import { useNavigate } from "react-router-dom";

function SousAccueilComposant({ titre, pathParcourComplet, pathMachine }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white text-center">

              {/* --- En-tête --- */}
              <header className="mb-5">
                <span className="text-uppercase tracking-wider small fw-bold text-muted mb-2 d-block">
                  Espace Apprenant
                </span>
                <h1 className="display-6 fw-extrabold text-dark mb-4">
                  {titre}
                </h1>
                <div className="bg-primary-subtle rounded-3 p-3 mb-4">
                  <p className="small text-primary-emphasis mb-0 fw-medium">
                    🎯 Bienvenue dans votre espace d'entraînement personnalisé !
                  </p>
                </div>
                <p className="text-secondary small px-lg-3">
                  Choisissez votre méthode de progression aujourd'hui. Apprenez pas à pas ou lancez-vous directement dans la pratique autonome.
                </p>
              </header>

              {/* --- Choix du Mode --- */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-2">
                <button
                  onClick={() => navigate(pathParcourComplet)}
                  className="btn btn-primary rounded-pill px-4 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 transition"
                  style={{ minWidth: "200px" }}
                >
                  🚀 Parcours Complet
                </button>

                <button
                  onClick={() => navigate(pathMachine)}
                  className="btn btn-outline-primary rounded-pill px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 transition"
                  style={{ minWidth: "200px" }}
                >
                  ⚙️ Machine à Exercices
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SousAccueilComposant;