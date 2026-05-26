import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineCalculerDeveloppement() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveaux = [
    { id: 1, label: "Niveau 1 — Development simples", pathRoute: "/PratiqueAutonomeDeveloppement" },
   ];
  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Calcul astucieux via le Développement"
      listeNiveaux={niveaux}
    />
  );
}

export default PageMachineCalculerDeveloppement;