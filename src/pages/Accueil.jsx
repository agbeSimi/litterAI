import React from "react";
import logoRobot from '../assets/logo_robot.png';

function Accueil() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <header className="text-center mb-12">
        <img
          src={logoRobot}
          alt="LitterAl"
          className="w-32 mx-auto mb-4"

        />
        <h1 className="text-4xl font-bold text-indigo-900">Projet LitterAl</h1>
        <p className="text-gray-600 mt-2">Apprendre les équations avec l'aide de l'IA</p>
      </header>

      {/* Grille des objectifs (Les 4 Piliers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {/* Ici tes composants de cartes pour chaque pilier */}
      </div>

      {/* Bouton d'action */}
      <button className="mt-12 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition">
        Démarrer la séance
      </button>
    </div>
  );
};

export default Accueil;