import logoRobot from "../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";
import ModuleCard from "../composants/moduleCard.jsx";

function Accueil(){
  const navigate = useNavigate();

  function goHome() {
    navigate("/")
  }

  return(
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
        <h4 className="fw-light text-dark mb-2 px-3" style={{maxWidth: '700px'}}>
          L'intelligence artificielle au service de ta réussite en mathématiques.
        </h4>
        <p className="text-muted small mb-5 px-3" style={{maxWidth: '600px'}}>
          Un projet conçu par Morgan MARTIN — Professeur agrégé de mathématiques
        </p>

        <div className="container px-0" style={{ maxWidth: '1200px' }}>
          <div className="row g-4 justify-content-center">

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 1 : Calculer astucieusement grâce au développement"
                description="Transforme des multiplications complexes en opérations simples et super rapides de tête en apprenant à décomposer les nombres grâce à la distributivité !"
                path="/SousAccueilCalculerDeveloppement"/>
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 2 : Calculer astucieusement grâce à la factorisation"
                description="Repère le nombre qui se répète dans un calcul pour le mettre en facteur et regrouper les morceaux."
                path="/SousAccueilCalculFactorisation"/>
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 3 : Comprendre un programme de calcul"
                description="Apprends à construire des programmes de calcul en manipulant des cartes et valide chaque étape pour maîtriser le raisonnement logique."
                path="/SousAccueilExoInteractif"/>
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 4 : Introduction au calcul littéral"
                description="Passe des phrases aux formules et comprends le rôle des lettres."
                path="/SousAccueilCalculLitteral"
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 5 : Simplifier une expression littérale"
                description="Écris plus vite, comme un pro ! Apprends à supprimer les signes « × » inutiles pour raccourcir tes formules et simplifier tes calculs en un clin d'œil."
                path="/SousAccueilExpressionLitterale"/>
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 6 : Tester une égalité"
                description="Apprends à remplacer les lettres par des nombres pour vérifier, étape par étape, si le membre de gauche et le membre de droite sont parfaitement égaux."
                path="/SousAccueilTesterEgalite"
              />
            </div>

            <div className="col-12 col-md-6 col-xl-4 d-flex">
              <ModuleCard
                titre="Module 7 : Résolution d'équations"
                description="Apprends à isoler x et à maîtriser la balance algébrique."
                path="/sousAccueilEquation"
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
          <span className="text-primary" style={{cursor: 'pointer'}} onClick={() => navigate("/credit")}>
            En savoir plus
          </span>
          <span className="text-primary" style={{cursor: 'pointer'}} onClick={() => navigate("/contact")}>
            Contact
          </span>
        </div>
      </footer>

    </div>
  )
}

export default Accueil;