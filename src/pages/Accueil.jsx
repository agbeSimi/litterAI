import React from "react";
import logoRobot from '../assets/logo_robot.png';

function Accueil() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <header className="text-center mb-5">
        <img
          src={logoRobot}
          alt="LitterAl"
          className="mb-4"
          style={{ width: '120px' }}
        />
        <h1 className="display-4 fw-bold text-primary">Litter AI</h1>
        <h2 className="text-secondary">Objectif : Savoir isoler "x" et résoudre l'équation</h2>
      </header>


    </div>
  );
};

export default Accueil;