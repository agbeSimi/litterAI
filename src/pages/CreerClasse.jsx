import { useState } from 'react';
import {classeSubmit} from "../services/LitterAI_API.js";

export default function CreerClasse() {
  const [niveau, setNiveau] = useState('6ème');
  const [lettre, setLettre] = useState('');
  const [effectif, setEffectif] = useState(0);
  const [eleves, setEleves] = useState([]);
  const [chargement, setChargement] = useState(false);

  return (
    <div className="container mt-5" style={{ maxWidth: '650px' }}>
      {eleves.length > 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-success text-white">
            <h3 className="card-title mb-0 h5">Classe créée avec succès !</h3>
          </div>
          <div className="card-body">
            <p className="text-muted">
              Voici les identifiants générés pour vos élèves.
              <span className="text-danger fw-bold"> Notez-les précieusement</span>, ils ne seront plus affichés par la suite.
            </p>

            <div className="table-responsive mt-3">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-light">
                <tr>
                  <th>Identifiant (Login)</th>
                  <th>Mot de passe en clair</th>
                </tr>
                </thead>
                <tbody>
                {eleves.map((eleve, index) => (
                  <tr key={index}>
                    <td className="font-monospace text-secondary">{eleve.login}</td>
                    <td className="font-monospace fw-bold text-danger">{eleve.motDePasse}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => { setEleves([]); setNiveau('6ème'); setLettre(''); setEffectif(0); }}
            >
              Créer une autre classe
            </button>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white">
            <h3 className="card-title mb-0 h5">Création d'une nouvelle classe</h3>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => {
              const nomComplet = `${niveau} ${lettre}`.trim();
              classeSubmit(e, nomComplet, effectif, setEleves, setChargement);
            }}>

              <div className="mb-3">
                <label htmlFor="niveau" className="form-label fw-semibold">Niveau :</label>
                <select
                  id="niveau"
                  className="form-select form-select-lg"
                  value={niveau}
                  onChange={event => setNiveau(event.target.value)}
                >
                  <option value="6ème">6ème</option>
                  <option value="5ème">5ème</option>
                  <option value="4ème">4ème</option>
                  <option value="3ème">3ème</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="lettre" className="form-label fw-semibold">Intitulé / Lettre de la classe :</label>
                <input
                  id="lettre"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Ex: A, B..."
                  value={lettre}
                  onChange={event => setLettre(event.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="effectif" className="form-label fw-semibold">Nombre d'élèves (Effectif) :</label>
                <input
                  id="effectif"
                  type="number"
                  className="form-control form-control-lg"
                  min="1"
                  max="100"
                  value={effectif}
                  onChange={event => setEffectif(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100 d-flex align-items-center justify-content-center"
                disabled={chargement}
              >
                {chargement ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Génération en cours...
                  </>
                ) : (
                  'Générer la classe et les comptes'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}