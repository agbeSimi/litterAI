import { useState, useEffect } from 'react';

function ListeClasse() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Récupération des classes créées par le prof
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    fetch('https://127.0.0.1:8000/api/classes', {
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
        // 🔴 CORRECTION ICI : API Platform enveloppe souvent les tableaux dans "hydra:member"
        // On extrait le tableau brut pour que le .map() fonctionne parfaitement
        const tableauClasses = data['hydra:member'] ? data['hydra:member'] : data;
        setClasses(tableauClasses);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 2. Gestion du clic sur l’interrupteur (Toggle basé sur modeApprentissage)
  const handleToggleActive = async (classeId) => {
    const classeActuelle = classes.find(c => c.id === classeId);
    if (!classeActuelle) return;

    // On s'assure de gérer le cas où le champ est vide au premier chargement
    const currentMode = classeActuelle.modeApprentissage || 'complet';
    const newMode = currentMode === 'complet' ? 'desactive' : 'complet';

    // Mise à jour de l'interface
    setClasses(prevClasses =>
      prevClasses.map(c => c.id === classeId ? { ...c, modeApprentissage: newMode } : c)
    );

    try {
      const response = await fetch(`https://127.0.0.1:8000/api/classes/${classeId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/merge-patch+json',
        },
        body: JSON.stringify({
          modeApprentissage: newMode
        })
      });

      if (!response.ok) {
        throw new Error('Erreur serveur lors du PATCH');
      }
    } catch (err) {
      alert("L'enregistrement a échoué, retour à l'état précédent.");
      setClasses(prevClasses =>
        prevClasses.map(c => c.id === classeId ? { ...c, modeApprentissage: currentMode } : c)
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
            <div className="col-md-4 mb-4" key={classe.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-primary">{classe.nom}</h5>
                    <p className="text-muted small mb-0">Identifiant unique : {classe.nomPurifie}</p>
                    <p className="text-muted small mb-0">Effectif : {classe.effectif} élèves</p>
                  </div>

                  {/* Section de l'interrupteur */}
                  <div className="form-check form-switch mt-4 d-flex align-items-center justify-content-between">
                    <span className="text-secondary small">
                      {classe.modeApprentissage === 'complet' ? '🟢 Session Activée' : '🔴 Session Désactivée'}
                    </span>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`switch-${classe.id}`}
                      checked={classe.modeApprentissage === 'complet'}
                      // 🟢 On passe uniquement l'ID maintenant, la fonction s'occupe du reste
                      onChange={() => {}} // 🟢 AJOUTE CETTE LIGNE (Fait taire l'avertissement React)
                      onClick={() => handleToggleActive(classe.id)}
                      style={{ cursor: 'pointer', width: '2.5em', height: '1.25em' }}
                    />
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