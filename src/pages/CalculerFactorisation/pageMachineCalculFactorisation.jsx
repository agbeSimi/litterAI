import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineCalculFactorisation() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveaux = [
    { id: 1, label: "Niveau 1 — Factorisation simple", pathRoute: "/PratiqueAutonomeFactorisation" },
     ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Calcul astucieux via la factorisation"
      listeNiveaux={niveaux}
    />
  );
}

export default PageMachineCalculFactorisation;