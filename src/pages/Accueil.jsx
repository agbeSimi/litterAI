import logoRobot from "../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";
import ModuleCard from "../composants/moduleCard.jsx";

function Accueil(){
  const navigate = useNavigate();

  function goHome() {
    navigate("/")
  }

  return(
    <>
      <div className="d-flex flex-column min-vh-100 bg-gray-50 p-8">

        {/* Cette partie contient tout ton contenu du haut */}
        <div className="flex-grow-1 d-flex flex-column align-items-center text-center">
          <img
            src={logoRobot}
            alt="LitterAl"
            className="mb-4"
            style={{ width: '120px', cursor: 'pointer' }}
            onClick={goHome}
          />
          <h1 className="display-4 fw-bold text-primary mb-3 mt-3">
            LitterAl
          </h1>
          <h3 className="text-secondary mb-5">
            L'intelligence artificielle au service de ta réussite en mathématiques.
          </h3>
          <h5 className="fw text-secondary mb-5">
            Un projet conçu par Morgan MARTIN — Professeur Agrégé de Mathématiques
          </h5>

          {/* Conteneur pour tes cartes */}
          <div className="d-flex flex-wrap justify-content-center gap-4">
            <ModuleCard
              titre="Module 0: Exercice Interactif"
              description="Apprends à construire des programmes de calcul en manipulant des cartes et valide chaque étape pour maîtriser le raisonnement logique."
              path="/SousAccueilExoInteractif"/>
            <ModuleCard
              titre="Module 1: Calcul Littéral"
              description="Passer des phrases aux formules et comprendre le rôle des lettres."
              path="/SousAccueilCalculLitteral"
            />

            <ModuleCard
              titre="Module 2: Simplifier une expression littérale"
              description="Écris plus vite, comme un pro ! Apprends à supprimer les signes 'x' inutiles pour raccourcir tes formules et simplifier tes calculs en un clin d'œil."
              path="/SousAccueilExpressionLitterale"/>

            <ModuleCard
              titre="Module 3: Tester une Égalité"
              description="--"
              path="/SousAccueilTesterEgalite"
            />

            <ModuleCard
              titre="Module 3: Les Équations"
            description="Apprendre à isoler x et maîtriser la balance algébrique."
            path="/sousAccueilEquation"
            />
          </div>
        </div>

        {/* Le footer avec mt-auto se collera tout en bas car le parent est flex-column */}
        <footer className="text-center py-4 border-top mt-auto">
          <small className="text-muted">
            Développement : Simisola Agbe | Conception : Morgan MARTIN
          </small><br/>
          <small
            onClick={() => navigate("/credit")}>
            En savoir plus
          </small>
          <br/>
          <small
            onClick={() => navigate("/contact")}>
            Contact
          </small>
        </footer>
      </div>

    </>
  )
}

export default Accueil;