import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineCalculLitteral() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveauxEquations = [
    { id: 1, label: "Niveau 1 — Calcul littéral simple", pathRoute: "/PratiqueAutonomeCL1" },
    { id: 2, label: "Niveau 2 — Trouver le calcul a partir d'instructions", pathRoute: "/PratiqueAutonomeCL2" },
    { id: 3, label: "Niveau 3 — Trouver les instructions à partir d'un calcul ", pathRoute: "/PratiqueAutonomeCL3" }
  ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Le calcul littéral"
      listeNiveaux={niveauxEquations}
    />
  );
}

export default PageMachineCalculLitteral;