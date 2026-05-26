import MachineExo from "../../MachineExo.jsx";

function PageMachineExoInteractif() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveaux = [
    { id: 1, label: "Niveau 1", pathRoute: "/PratiqueAutonomeInteractif" },
    ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Exercices Intéractifs"
      listeNiveaux={niveaux}
    />
  );
}

export default PageMachineExoInteractif;