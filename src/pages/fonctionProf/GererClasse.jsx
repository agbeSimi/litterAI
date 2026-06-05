import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GererClasse() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const modulesDisponibles = [
    { id: 1, nom: "Module 1 : Développement" },
    { id: 2, nom: "Module 2 : Factorisation" },
    { id: 3, nom: "Module 3 : Prog. de calcul" },
    { id: 4, nom: "Module 4 : Intro calcul littéral" },
    { id: 5, nom: "Module 5 : Simplifier expression" },
    { id: 6, nom: "Module 6 : Tester égalité" },
    { id: 7, nom: "Module 7 : Dév. expression simple" },
    { id: 8, nom: "Module 8 : Équations" }
  ];

  const URL_BASE = 'https://127.0.0.1:8000/api';

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    fetch(`${URL_BASE}/classes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Impossible de charger les classes');
        return response.json();
      })
      .then(data => {
        const tableauClasses = data['hydra:member'] ? data['hydra:member'] : data;
        setClasses(tableauClasses);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleToggleModule = async (classeId, moduleId) => {
    const classeActuelle = classes.find(c => c.id === classeId);
    if (!classeActuelle) return;

    const modulesActuels = classeActuelle.modulesAutoriser || [];
    const isCurrentlyActive = modulesActuels.includes(moduleId);

    const newModules = isCurrentlyActive
      ? modulesActuels.filter(id => id !== moduleId)
      : [...modulesActuels, moduleId];

    setClasses(prevClasses =>
      prevClasses.map(c => c.id === classeId ? { ...c, modulesAutoriser: newModules } : c)
    );

    try {
      const response = await fetch(`${URL_BASE}/classes/${classeId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/merge-patch+json',
        },
        body: JSON.stringify({
          modulesAutoriser: newModules
        })
      });

      if (!response.ok) {
        throw new Error('Erreur API');
      }
    } catch (err) {
      setClasses(prevClasses =>
        prevClasses.map(c => c.id === classeId ? { ...c, modulesAutoriser: modulesActuels } : c)
      );
    }
  };

  const handleDeleteClasse = async (classeId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette classe ? Cette action est irréversible.")) {
      return;
    }

    try {
      const response = await fetch(`${URL_BASE}/classes/${classeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setClasses(prevClasses => prevClasses.filter(c => c.id !== classeId));
    } catch (err) {
      alert("Impossible de supprimer la classe. Elle contient peut-être encore des élèves liés dans la base de données.");
    }
  };

  if (loading) return (
    <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
      <h5 className="text-secondary fw-medium">Chargement de vos classes...</h5>
    </div>
  );

  if (error) return (
    <div className="container mt-5 pt-5 text-center">
      <div className="alert alert-danger rounded-4 shadow-sm d-inline-block p-4">
        <i className="bi bi-exclamation-triangle-fill fs-1 d-block mb-3"></i>
        <h5 className="fw-bold">Erreur de connexion</h5>
        <p className="mb-0">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container py-5 mt-4 min-vh-100">

      {/* En-tête avec le nouveau bouton */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-3">
        <div className="d-flex align-items-center gap-3">
          <h2 className="display-6 fw-bolder custom-logo mb-0">Mes Classes</h2>
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill fw-semibold">
            {classes.length} {classes.length > 1 ? 'classes créées' : 'classe créée'}
          </span>
        </div>

        <button
          onClick={() => navigate('/creer-classe')}
          className="btn btn-primary btn-gradient-primary rounded-pill px-4 py-2 fw-bold shadow-sm btn-hover-scale d-flex align-items-center gap-2"
        >
          <i className="bi bi-plus-lg fs-5"></i>
          Créer une classe
        </button>
      </div>

      {classes.length === 0 ? (
        <div className="card border-0 bg-light rounded-4 p-5 text-center shadow-sm">
          <h4 className="text-secondary fw-bold mb-3">Aucune classe pour le moment</h4>
          <p className="text-muted">Commencez par créer une classe pour générer les comptes de vos élèves et gérer leurs accès.</p>
        </div>
      ) : (
        <div className="row g-4">
          {classes.map((classe) => (
            <div className="col-12 col-lg-6" key={classe.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100 transition-hover" style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>

                <div className="card-body p-4">
                  <div className="d-flex align-items-start justify-content-between mb-4 pb-3 border-bottom border-light">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h4 className="card-title fw-bolder text-dark mb-0">{classe.nom}</h4>
                        <button
                          className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                          onClick={() => handleDeleteClasse(classe.id)}
                          title="Supprimer la classe"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                      <p className="text-secondary small fw-medium mb-0">ID: <span className="font-monospace text-primary">{classe.nomPurifie}</span></p>
                    </div>
                    <div className="bg-light rounded-3 px-3 py-2 text-center border border-light shadow-sm">
                      <span className="d-block fs-4 fw-bolder text-primary lh-1">{classe.effectif}</span>
                      <span className="small text-muted fw-semibold" style={{ fontSize: '0.7rem' }}>ÉLÈVES</span>
                    </div>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-3 small text-uppercase text-secondary tracking-wider opacity-75">
                      <i className="bi bi-unlock-fill me-2"></i>Modules Autorisés
                    </h6>
                    <div className="row g-3">
                      {modulesDisponibles.map(mod => {
                        const isChecked = (classe.modulesAutoriser || []).includes(mod.id);
                        return (
                          <div key={mod.id} className="col-12 col-xl-6">
                            <div className={`p-2 px-3 border rounded-3 d-flex align-items-center justify-content-between h-100 transition ${isChecked ? 'bg-primary bg-opacity-10 border-primary border-opacity-25' : 'bg-light border-light'}`}>
                              <span className={`small fw-medium text-truncate me-2 ${isChecked ? 'text-primary' : 'text-secondary'}`} title={mod.nom}>
                                {mod.nom}
                              </span>
                              <div className="form-check form-switch m-0 flex-shrink-0">
                                <input
                                  className="form-check-input shadow-none"
                                  type="checkbox"
                                  role="switch"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  onClick={() => handleToggleModule(classe.id, mod.id)}
                                  style={{ cursor: 'pointer', height: '1.25rem', width: '2.5rem' }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GererClasse;