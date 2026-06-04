import { useState, useEffect } from "react";
import logoRobot from "../assets/logo_robot.png";
import { useNavigate } from "react-router-dom";
import ModuleCard from "../composants/moduleCard.jsx";

function Accueil() {
  const navigate = useNavigate();
  const [modulesAutorises, setModulesAutorises] = useState([1,2,3,4,5,6,7,8]);
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
      .then(response => {
        if (!response.ok) {
          console.error("Alerte : L'API a renvoyé une erreur", response.status);
        }
        return response.json();
      })
      .then(data => {
        // 🔴 LE MOUCHARD EST ICI : On regarde ce que Symfony nous renvoie vraiment
        console.log("Données de l'élève reçues depuis Symfony :", data);

        if (data.classe && data.classe.modulesAutoriser) {
          // On s'assure de convertir les valeurs en nombres (au cas où Symfony renvoie des chaînes de caractères comme ["1", "2"])
          const modulesNettoyes = data.classe.modulesAutoriser.map(Number);
          setModulesAutorises(modulesNettoyes);
        } else {
          console.warn("Attention : Impossible de trouver data.classe.modulesAutoriser dans la réponse");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur réseau ou fetch :", err);
        setLoading(false);
      });
  }, []);

  function goHome() {
    navigate("/");
  }

  if (loading) {
    return <div className="text-center mt-5">Chargement de votre espace...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="flex-grow-1 d-flex flex-column align-items-center text-center px-3 py-4 py-md-5">
        <img
          src={logoRobot}
          alt="LitterAl"
          className="mb-3"
          style={{ width: '100px', cursor: 'pointer', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}
          onClick={goHome}
        />
        <h1 className="display-3 fw-bolder text-primary mb-3">
          LitterAl
        </h1>
        <h4 className="fw-light text-dark mb-2 px-3" style={{ maxWidth: '700px' }}>
          L'intelligence artificielle au service de ta réussite en mathématiques.
        </h4>
        <p className="text-muted small mb-5 px-3" style={{ maxWidth: '600px' }}>
          Un projet conçu par Morgan MARTIN — Professeur agrégé de mathématiques
        </p>

        <div className="container px-0" style={{ maxWidth: '1200px' }}>
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 1 : Calculer astucieusement grâce au développement"
                description="Transforme des multiplications complexes en opérations simples et super rapides de tête en apprenant à décomposer les nombres grâce à la distributivité !"
                path="/SousAccueilCalculerDeveloppement"
                estActif={modulesAutorises.includes(1)}
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 2 : Calculer astucieusement grâce à la factorisation"
                description="Repère le nombre qui se répète dans un calcul pour le mettre en facteur et regrouper les morceaux."
                path="/SousAccueilCalculFactorisation"
                estActif={modulesAutorises.includes(2)}
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 3 : Comprendre un programme de calcul"
                description="Apprends à construire des programmes de calcul en manipulant des cartes et valide chaque étape pour maîtriser le raisonnement logique."
                path="/SousAccueilExoInteractif"
                estActif={modulesAutorises.includes(3)}
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 4 : Introduction au calcul littéral"
                description="Passe des phrases aux formules et comprends le rôle des lettres."
                path="/SousAccueilCalculLitteral"
                estActif={modulesAutorises.includes(4)}
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 5 : Simplifier une expression littérale"
                description="Écris plus vite, comme un pro ! Apprends à supprimer les signes « × » inutiles pour raccourcir tes formules et simplifier tes calculs en un clin d'œil."
                path="/SousAccueilExpressionLitterale"
                estActif={modulesAutorises.includes(5)}
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 6 : Tester une égalité"
                description="Apprends à remplacer les lettres par des nombres pour vérifier, étape par étape, si le membre de gauche et le membre de droite sont parfaitement égaux."
                path="/SousAccueilTesterEgalite"
                estActif={modulesAutorises.includes(6)}
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 7 : Développer une expression simple"
                description="Apprends à isoler x et à maîtriser la balance algébrique."
                path="/sousAccueilDevExp"
                estActif={modulesAutorises.includes(7)}
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
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

      <footer className="text-center py-4 bg-white border-top mt-auto shadow-sm">
        <p className="text-muted small mb-2">
          Développement : Simisola Agbe | Conception : Morgan MARTIN
        </p>
        <div className="d-flex justify-content-center gap-4 small fw-bold">
          <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate("/credit")}>
            En savoir plus
          </span>
          <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate("/contact")}>
            Contact
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Accueil;