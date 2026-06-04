import { useState, useEffect } from 'react';

function ListeClasse() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const URL_BASE = 'https://127.0.0.1:8000/api'

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

  if (loading) return <div className="text-center mt-5">Chargement de vos classes...</div>;
  if (error) return <div className="text-center text-danger mt-5">Erreur : {error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Classes créées</h3>

      {classes.length === 0 ? (
        <div className="alert alert-info">Vous n'avez pas encore créé de classe.</div>
      ) : (
        <div className="row">
          {classes.map((classe) => (
            <div className="col-md-6 mb-4" key={classe.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <h5 className="card-title fw-bold text-primary">{classe.nom}</h5>
                    <p className="text-muted small mb-0">Identifiant unique : {classe.nomPurifie}</p>
                    <p className="text-muted small mb-0">Effectif : {classe.effectif} élèves</p>
                  </div>

                  <div className="border-top pt-3">
                    <h6 className="fw-bold mb-3 small text-uppercase text-secondary">Gestion des modules</h6>
                    <div className="row g-2">
                      {modulesDisponibles.map(mod => {
                        const isChecked = (classe.modulesAutoriser || []).includes(mod.id);
                        return (
                          <div key={mod.id} className="col-12 col-xl-6">
                            <div className="p-2 border rounded bg-light d-flex align-items-center justify-content-between h-100">
                              <span className="small text-dark text-truncate me-2" title={mod.nom}>
                                {mod.nom}
                              </span>
                              <div className="form-check form-switch m-0 flex-shrink-0">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  onClick={() => handleToggleModule(classe.id, mod.id)}
                                  style={{ cursor: 'pointer' }}
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

export default ListeClasse;