import {useState} from "react";
import {useNavigate} from "react-router-dom";

function MachineExo({ titreModule, listeNiveaux }) {
  const [nbQuestions, setNbQuestions] = useState(5);
  const [niveau, setNiveau] = useState(listeNiveaux[0]?.id || 1);
  const navigate = useNavigate();

  const lancerEntrainement = () => {
    // 1. On cherche le niveau sélectionné par l'élève dans la liste
    const niveauChoisi = listeNiveaux.find(n => n.id === parseInt(niveau));

    // 2. S'il existe, on redirige vers sa page autonome dédiée
    // IMPORTANT : On transmet "totalQuestions" dans l'état de la navigation
    if (niveauChoisi && niveauChoisi.pathRoute) {
      navigate(niveauChoisi.pathRoute, { state: { totalQuestions: nbQuestions } });
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white text-center">

              <h2 className="fw-bold text-dark mb-2">⚙️ La Machine à Exercices</h2>
              <p className="text-muted small mb-4">{titreModule}</p>

              {/* Choix du nombre de questions */}
              <div className="mb-4 text-start">
                <label className="form-label fw-bold text-secondary">
                  Nombre de questions : <span className="text-primary fs-5">{nbQuestions}</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="5"
                  max="10"
                  value={nbQuestions}
                  onChange={(e) => setNbQuestions(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted small px-1">
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Sélection du niveau générée dynamiquement */}
              <div className="mb-5 text-start">
                <label className="form-label fw-bold text-secondary">Niveau de difficulté :</label>
                <select
                  className="form-select form-select-lg rounded-3 fs-6"
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

              {/* Bouton de lancement */}
              <button
                onClick={lancerEntrainement}
                className="btn btn-success rounded-pill w-100 py-3 fw-bold shadow transition"
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