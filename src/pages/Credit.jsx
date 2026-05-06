import {motion} from "framer-motion";


function Credit() {
  return(
    <div className="d-flex flex-column min-vh-100 bg-gray-50">
      {/* Header avec le logo pour revenir à l'accueil */}
      <main className="flex-grow-1 container py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto"
          style={{ maxWidth: '800px' }}
        >
          <div className="bg-white shadow-sm rounded-4 p-5">
            <h2 className="fw-bold text-primary mb-4 border-bottom pb-2">L'Équipe</h2>
            <div className="mb-5">
              <p className="mb-2">
                <strong>Conception Pédagogique :</strong> Morgan MARTIN (Professeur Agrégé de Mathématiques)
              </p>
              <p>
                <strong>Développement Logiciel :</strong> Simisola Agbe
              </p>
            </div>

            <h2 className="fw-bold text-primary mb-4 border-bottom pb-2">La Technologie (La "Stack")</h2>
            <div className="mb-5">
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-cpu-fill text-primary me-3 mt-1"></i>
                  <div>
                    <strong>IA :</strong> Utilisation du modèle de langage <strong>Llama 3</strong> via l'API <strong>GROQ</strong> pour une vitesse de réponse instantanée.
                  </div>
                </li>
                <li className="d-flex flex-column align-items-start">
                  <div className="mb-2">
                  <i className="bi text-primary bi-window-sidebar  me-3 mt-1"></i>
                    <strong>Frontend :</strong> Developpé avec React (JavaScript).
                  </div>
                  <div>
                    <i className="bi bi-server text-primary me-3 mt-1"></i>
                    <strong>Backend :</strong> Serveur sécurisé symfony.
                  </div>
                </li>
              </ul>
            </div>

            <h2 className="fw-bold text-primary mb-4 border-bottom pb-2">Engagement RGPD </h2>
            <div className="bg-light card-litteral p-3 rounded-3 border-start border-success border-4">
              <p className="mb-0 text-dark">
                LitterAl est conçu pour être un outil <strong>totalement anonyme</strong>. Aucune donnée personnelle n'est collectée : nous utilisons uniquement des pseudos ou des codes de séance pour garantir la protection de ta vie privée. 
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-4 text-center text-muted">
        <small>© 2026 - Projet LitterAl </small>
      </footer>
    </div>
  )
}

export default Credit;