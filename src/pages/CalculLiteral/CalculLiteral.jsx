import IntroductionChapitre from "../../composants/IntroductionChapitre.jsx";

function CalculLiteral() {
  const phases = [
    { label: "Phase 1", path: "/ModelageCalculLiteralPhase1" },
    { label: "Phase 2", path: "/ModelageCalculLiteralPhase2" },
    { label: "Phase 3", path: "/ModelageCalculLiteralPhase3" }
  ];

  return (
    <IntroductionChapitre
      chapitre="Le Calcul littéral"
      objectif="Comprendre qu'une lettre cache une valeur et savoir calculer une expression"
      conceptTexte="En mathématiques, une lettre est comme une 'boîte magique' : elle cache un nombre que l'on ne connaît pas encore, mais avec lequel on peut déjà faire des calculs !"
      explicationTexte="Utiliser des lettres permet d'écrire une seule règle qui fonctionne pour tous les nombres du monde. C'est l'outil secret des mathématiciens pour passer des phrases aux formules !"
      phases={phases}
    />
  );
}

export default CalculLiteral;