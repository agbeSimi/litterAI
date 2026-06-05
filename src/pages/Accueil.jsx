import { useState, useEffect } from "react";
import logoRobot from "../assets/logo_robot.png";
import { useNavigate } from "react-router-dom";
import ModuleCard from "../composants/moduleCard.jsx";

function Accueil() {
  const navigate = useNavigate();
  const [modulesAutorises, setModulesAutorises] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    fetch('https://127.0.0.1:8000/api/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.classe && data.classe.modulesAutoriser) {
          const modulesNettoyes = data.classe.modulesAutoriser.map(Number);
          setModulesAutorises(modulesNettoyes);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  function goHome() {
    navigate("/");
  }

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Chargement...</span>
        </div>
        <h5 className="fw-medium text-muted">Chargement de votre espace...</h5>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light pt-5 mt-4">
      {/* Container principal de présentation */}
      <div className="flex-grow-1 d-flex flex-column align-items-center text-center px-3 py-4 py-md-5">

        {/* Logo interactif avec animation CSS au survol */}
        <img
          src={logoRobot}
          alt="LitterAI"
          className="mb-4 logo-bounce"
          style={{ width: '110px', cursor: 'pointer' }}
          onClick={goHome}
        />

        {/* Titre principal avec le dégradé de la Navbar */}
        <h1 className="display-2 fw-bolder custom-logo mb-3">
          LitterAI
        </h1>

        {/* Slogan */}
        <h4 className="fw-light text-secondary mb-2 px-3 mx-auto" style={{ maxWidth: '750px' }}>
          L'intelligence artificielle au service de ta réussite en mathématiques.
        </h4>

        {/* Auteur du projet */}
        <p className="text-muted small mb-5 px-3 mx-auto opacity-75" style={{ maxWidth: '600px' }}>
          Un projet conçu par <span className="fw-semibold text-dark">Morgan MARTIN</span> — Professeur agrégé de mathématiques
        </p>

        {/* Grille des modules */}
        <div className="container px-2 px-sm-0" style={{ maxWidth: '1200px' }}>
          <div className="row g-4 justify-content-center">

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 1 : Calculer astucieusement grâce au développement"
                description="Transforme des multiplications complexes en opérations simples et super rapides de tête en apprenant à décomposer les nombres grâce à la distributivité !"
                path="/SousAccueilCalculerDeveloppement"
                estActif={modulesAutorises.includes(1)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 2 : Calculer astucieusement grâce à la factorisation"
                description="Repère le nombre qui se répète dans un calcul pour le mettre en facteur et regrouper les morceaux."
                path="/SousAccueilCalculFactorisation"
                estActif={modulesAutorises.includes(2)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 3 : Comprendre un programme de calcul"
                description="Apprends à construire des programmes de calcul en manipulant des cartes et valide chaque étape pour maîtriser le raisonnement logique."
                path="/SousAccueilExoInteractif"
                estActif={modulesAutorises.includes(3)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 4 : Introduction au calcul littéral"
                description="Passe des phrases aux formules et comprends le rôle des lettres."
                path="/SousAccueilCalculLitteral"
                estActif={modulesAutorises.includes(4)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 5 : Simplifier une expression littérale"
                description="Écris plus vite, comme un pro ! Apprends à supprimer les signes « × » inutiles pour raccourcir tes formules et simplifier tes calculs en un clin d'œil."
                path="/SousAccueilExpressionLitterale"
                estActif={modulesAutorises.includes(5)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 6 : Tester une égalité"
                description="Apprends à remplacer les lettres par des nombres pour vérifier, étape par étape, si le membre de gauche et le membre de droite sont parfaitement égaux."
                path="/SousAccueilTesterEgalite"
                estActif={modulesAutorises.includes(6)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 7 : Développer une expression simple"
                description="Apprends à isoler x et à maîtriser la balance algébrique."
                path="/sousAccueilDevExp"
                estActif={modulesAutorises.includes(7)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <ModuleCard
                titre="Module 8 : Résolution d'équations"
                description="Apprends à isoler x et à maîtriser la balance algébrique."
                path="/sousAccueilEquation"
                estActif={modulesAutorises.includes(8)}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Footer Premium assorti à la Navbar */}
      <footer className="text-center py-4 bg-white bg-opacity-75 border-top mt-auto shadow-sm custom-footer">
        <p className="text-muted small mb-2">
          Développement : <span className="text-dark fw-medium">Simisola Agbe</span> | Conception : <span className="text-dark fw-medium">Morgan MARTIN</span>
        </p>
        <div className="d-flex justify-content-center gap-4 small fw-bold">
          <span className="text-primary link-primary-hover cursor-pointer" onClick={() => navigate("/credit")}>
            En savoir plus
          </span>
          <span className="text-primary link-primary-hover cursor-pointer" onClick={() => navigate("/contact")}>
            Contact
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Accueil;