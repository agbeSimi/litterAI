import "react";
import logoRobot from '../../assets/logo_robot.png';
import CarteConcept from "../../composants/CarteConcept.jsx";
import CarteExplication from "../../composants/CarteExplication.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";

function PageEquation() {
  const navigation = useNavigate();

  const goToModelage = () => {
    navigation("/modelage"); // 3. Définir la destination
  };
  return (
    <div className="text-center mb-5 min-h-screen bg-gray-50 flex flex-col items-center p-8">
        <img
          src={logoRobot}
          alt="LitterAl"
          className="mb-4"
          style={{ width: '120px' }}
        />
        <h1 className="display-4 fw-bold text-primary mb-5 mt-3">Litter AI</h1>
        <h2 className="text-secondary mb-5">Chapitre : Les équations</h2>
        <h4 className="fw-bold text-secondary">Objectif : Savoir isoler "x" et résoudre l'équation</h4>
        <CarteConcept
          description="Une équation est une balance en équilibre. Pour isoler x, chaque opération effectuée d'un côté doit
        être effectuée de l'autre."/>
        <CarteExplication
          description="Il faut savoir utiliser l'opposé (Annuler une addition par une soustraction et inversement)
            ainsi que la réciproque(Annuler une multiplication par une division et inversement)"/>
      <div className="text-center mt-5">
        <button onClick={goToModelage} className="btn btn-primary rounded-pill border-0 px-5 py-3 fw-bold shadow">
          Commencer la séance
        </button>
      </div>
    </div>
  );
}

export default PageEquation;