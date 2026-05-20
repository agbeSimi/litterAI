import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineCalculFactorisation() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveauxEquations = [
    { id: 1, label: "Niveau 1 — Calcul littéral simple", pathRoute: "/PratiqueAutonomeCalculFactorisation" },
     ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Calcul astucieux via le Développement factorisation"
      listeNiveaux={niveauxEquations}
    />
  );
}

export default PageMachineCalculFactorisation;