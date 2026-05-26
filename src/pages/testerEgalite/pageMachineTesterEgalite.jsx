import MachineExo from "../../MachineExo.jsx"; // Assure-toi que le chemin est correct

function PageMachineTesterEgalite() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveaux = [
    { id: 1, label: "Niveau 1 — Multiplications simples", pathRoute: "/PratiqueAutonomeTesterEgalite1" },
    { id: 2, label: "Niveau 2 — Nombres décimaux", pathRoute: "/PratiqueAutonomeTesterEgalite2" },
    { id: 3, label: "Niveau 3 — Deux variables (x, y)", pathRoute: "/PratiqueAutonomeTesterEgalite3" }  ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Tester une égalité"
      listeNiveaux={niveaux}
    />
  );
}

export default PageMachineTesterEgalite;