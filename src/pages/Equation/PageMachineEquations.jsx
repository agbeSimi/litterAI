import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineEquations() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveauxEquations = [
    { id: 1, label: "Niveau 1 — Equations simples", pathRoute: "/pratiqueAutonome" },
    { id: 2, label: "Niveau 2 — Equations de 2 côtés", pathRoute: "/pratiqueAutonome2" },
    { id: 3, label: "Niveau 3 — Equation a decimal", pathRoute: "/pratiqueAutonome3" }
  ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Tester les égalités"
      listeNiveaux={niveauxEquations}
    />
  );
}

export default PageMachineEquations;