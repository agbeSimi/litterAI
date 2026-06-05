import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { classeSubmit } from "../../services/LitterAI_API.js";

export default function CreerClasse() {
  const [niveau, setNiveau] = useState('6ème');
  const [lettre, setLettre] = useState('');
  const [effectif, setEffectif] = useState(0);
  const [eleves, setEleves] = useState([]);
  const [chargement, setChargement] = useState(false);

  const nomComplet = `${niveau} ${lettre}`.trim();

  function genererPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Liste des comptes eleves - ${nomComplet}`, 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Document genere le : ${new Date().toLocaleDateString()}`, 14, 28);

    const colonnes = ["Identifiant (Login)", "Mot de passe en clair"];
    const lignes = eleves.map(eleve => [eleve.login, eleve.motDePasse]);

    autoTable(doc, {
      startY: 35,
      head: [colonnes],
      body: lignes,
      theme: 'striped',
      headStyles: { fillColor: [13, 110, 253] },
      styles: { font: "courier", fontSize: 10 }
    });

    const nomFichier = `comptes_${nomComplet.replace(/\s+/g, '_')}.pdf`;
    doc.save(nomFichier);
  }

  return (
    <div className="container py-5 mt-4 min-vh-100 d-flex justify-content-center align-items-start">
      <div className="w-100" style={{ maxWidth: '650px' }}>
        {eleves.length > 0 ? (
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden animate__animated animate__fadeIn">
            <div className="bg-success bg-opacity-10 border-bottom border-success border-opacity-25 p-4 text-center">
              <h3 className="mb-0 h4 fw-bolder text-success">🎉 Classe créée avec succès !</h3>
            </div>

            <div className="card-body p-4 p-md-5 bg-white">
              <p className="text-secondary mb-4 text-center">
                Voici les identifiants générés pour vos élèves.
                <span className="text-danger fw-bold"> Notez-les précieusement</span>, ils ne seront plus affichés par la suite.
              </p>

              <div className="mb-4">
                <button
                  className="btn btn-outline-danger w-100 fw-bold py-3 rounded-pill d-flex align-items-center justify-content-center gap-2 btn-hover-scale"
                  onClick={genererPDF}
                >
                  <i className="bi bi-file-earmark-pdf-fill fs-5"></i>
                  Télécharger la liste en PDF
                </button>
              </div>

              <div className="table-responsive mb-4 rounded-3 border border-light">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                  <tr>
                    <th className="text-secondary fw-semibold py-3 px-4">Identifiant (Login)</th>
                    <th className="text-secondary fw-semibold py-3 px-4">Mot de passe</th>
                  </tr>
                  </thead>
                  <tbody>
                  {eleves.map((eleve, index) => (
                    <tr key={index}>
                      <td className="font-monospace text-dark fw-medium py-3 px-4">{eleve.login}</td>
                      <td className="font-monospace fw-bold text-primary py-3 px-4">{eleve.motDePasse}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>

              <button
                className="btn btn-primary btn-gradient-primary w-100 py-3 rounded-pill fw-bold btn-hover-scale"
                onClick={() => { setEleves([]); setNiveau('6ème'); setLettre(''); setEffectif(0); }}
              >
                ➕ Créer une autre classe
              </button>
            </div>
          </div>
        ) : (
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden animate__animated animate__fadeIn">
            <div className="bg-primary bg-opacity-10 border-bottom border-primary border-opacity-10 p-4 text-center">
              <h3 className="mb-0 h4 fw-bolder custom-logo">Création d'une nouvelle classe</h3>
            </div>

            <div className="card-body p-4 p-md-5 bg-white">
              <form onSubmit={(e) => classeSubmit(e, nomComplet, effectif, setEleves, setChargement)}>

                <div className="mb-4">
                  <label htmlFor="niveau" className="form-label fw-bold text-secondary">Niveau :</label>
                  <select
                    id="niveau"
                    className="form-select form-select-lg border-light shadow-sm custom-input-wrapper bg-light"
                    value={niveau}
                    onChange={event => setNiveau(event.target.value)}
                  >
                    <option value="6ème">6ème</option>
                    <option value="5ème">5ème</option>
                    <option value="4ème">4ème</option>
                    <option value="3ème">3ème</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="lettre" className="form-label fw-bold text-secondary">Intitulé / Lettre de la classe :</label>
                  <input
                    id="lettre"
                    type="text"
                    className="form-control form-control-lg border-light shadow-sm custom-input-wrapper bg-light"
                    placeholder="Ex: A, B, Rouge, Allemand..."
                    value={lettre}
                    onChange={event => setLettre(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="effectif" className="form-label fw-bold text-secondary">Nombre d'élèves (Effectif) :</label>
                  <input
                    id="effectif"
                    type="number"
                    className="form-control form-control-lg border-light shadow-sm custom-input-wrapper bg-light fw-bold text-primary"
                    min="1"
                    max="100"
                    value={effectif}
                    onChange={event => setEffectif(event.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-gradient-primary btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm btn-hover-scale d-flex align-items-center justify-content-center"
                  disabled={chargement}
                >
                  {chargement ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
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
    </div>
  );
}