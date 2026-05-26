import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineEquations() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveaux = [
    { id: 1, label: "Niveau 1 — Equations simples", pathRoute: "/pratiqueAutonome" },
    { id: 2, label: "Niveau 2 — Equations linéaire", pathRoute: "/pratiqueAutonome2" },
    { id: 3, label: "Niveau 3 — Equations a nombres décimaux", pathRoute: "/pratiqueAutonome3" }
  ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Résoudre des équations"
      listeNiveaux={niveaux}
    />
  );
}

export default PageMachineEquations;