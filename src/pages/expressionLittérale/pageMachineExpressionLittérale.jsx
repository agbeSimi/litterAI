import MachineExo from "../../MachineExo.jsx";

function PageMachineExpressionLitteral() {
  // 1. Tu définis la liste des niveaux de ce chapitre
  const niveaux = [
    { id: 1, label: "Niveau 1 — Expression Simple", pathRoute: "/PratiqueAutonomeEL" },
    ];

  // 2. Tu injectes ces données dans ton composant universel
  return (
    <MachineExo
      titreModule="Chapitre : Simplifier une expression"
      listeNiveaux={niveaux}
    />
  );
}

export default PageMachineExpressionLitteral;