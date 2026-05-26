import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineDevExp() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveaux = [
    { id: 1, label: "Niveau 1 — Numérique", pathRoute: "/PratiqueAutonomeDevExp1" },
    { id: 2, label: "Niveau 2 — Litéral simple", pathRoute: "/PratiqueAutonomeDevExp2" },
    { id: 3, label: "Niveau 3 — Avancé ", pathRoute: "/PratiqueAutonomeDevExp3" }
  ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Développer une expression simple"
      listeNiveaux={niveaux}
    />
  );
}

export default PageMachineDevExp;