import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MachineExo({ titreModule, listeNiveaux }) {
  const [nbQuestions, setNbQuestions] = useState(5);
  const [niveau, setNiveau] = useState(listeNiveaux[0]?.id || 1);
  const navigate = useNavigate();

  const lancerEntrainement = () => {
    const niveauChoisi = listeNiveaux.find(n => n.id === parseInt(niveau));
    if (niveauChoisi && niveauChoisi.pathRoute) {
      navigate(niveauChoisi.pathRoute, { state: { totalQuestions: nbQuestions } });
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center py-5 mt-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">
            {/* Carte avec effet Glassmorphism léger sur les bordures */}
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white text-center custom-exercise-card">

              {/* Titre avec le dégradé de la charte */}
              <h2 className="fw-bolder custom-logo mb-2">
                ⚙️ La Machine à Exercices
              </h2>
              <p className="text-secondary fw-medium small mb-5 opacity-75">{titreModule}</p>

              {/* Choix du nombre de questions */}
              <div className="mb-4 text-start">
                <label className="form-label fw-bold text-secondary d-flex justify-content-between align-items-center">
                  <span>Nombre de questions :</span>
                  {/* Badge numérique personnalisé */}
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 fs-6">
                    {nbQuestions}
                  </span>
                </label>
                <input
                  type="range"
                  className="form-range custom-range"
                  min="5"
                  max="10"
                  value={nbQuestions}
                  onChange={(e) => setNbQuestions(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted small px-1 mt-1 fw-semibold">
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Sélection du niveau générée dynamiquement */}
              <div className="mb-5 text-start">
                <label className="form-label fw-bold text-secondary">Niveau de difficulté :</label>
                <select
                  className="form-select form-select-lg rounded-3 fs-6 custom-select shadow-sm"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                >
                  {listeNiveaux.map((niv) => (
                    <option key={niv.id} value={niv.id}>
                      {niv.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bouton de lancement avec le dégradé LitterAI */}
              <button
                onClick={lancerEntrainement}
                className="btn btn-primary btn-gradient-primary rounded-pill w-100 py-3 fw-bold shadow-sm"
              >
                ⚡ Lancer l'entraînement
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MachineExo;