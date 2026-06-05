import { useNavigate } from "react-router-dom";

function SousAccueilComposant({ titre, pathParcourComplet, pathMachine }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center py-5 mt-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-7 col-xl-6">
            {/* Carte principale avec ombre douce */}
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white text-center">

              {/* --- En-tête --- */}
              <header className="mb-5">
                <span className="text-uppercase small fw-bold text-muted mb-2 d-block opacity-75" style={{ letterSpacing: "1px" }}>
                  Espace Apprenant
                </span>
                {/* Application du dégradé de la charte sur le titre */}
                <h1 className="display-5 fw-bolder custom-logo mb-4">
                  {titre}
                </h1>

                {/* Bannière de bienvenue pastel */}
                <div className="bg-primary bg-opacity-10 rounded-3 p-3 mb-4 border border-primary border-opacity-10">
                  <p className="small text-primary mb-0 fw-semibold">
                    🎯 Bienvenue dans votre espace d'entraînement personnalisé !
                  </p>
                </div>

                <p className="text-secondary small px-md-4 opacity-85">
                  Choisissez votre méthode de progression aujourd'hui. Apprenez pas à pas ou lancez-vous directement dans la pratique autonome.
                </p>
              </header>

              {/* --- Choix du Mode --- */}
              {/* Utilisation de classes de largeur native Bootstrap (w-sm-auto) au lieu du CSS en ligne */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-2 px-md-4">
                <button
                  onClick={() => navigate(pathParcourComplet)}
                  className="btn btn-primary btn-gradient-primary rounded-pill px-4 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 w-100"
                >
                  🚀 Parcours Complet
                </button>

                <button
                  onClick={() => navigate(pathMachine)}
                  className="btn btn-outline-primary px-4 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 w-100 btn-hover-scale"
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