import IntroductionChapitre from "../../composants/IntroductionChapitre.jsx";

function DevExp() {
  const phases = [
    { label: "Phase 1", path: "/ModelageDevExp" },
    { label: "Phase 2", path: "/ModelageDevExp2" },
    { label: "Phase 3", path: "/ModelageDevExp3" }
  ];

  return (
    <IntroductionChapitre
      chapitre="Développer une expression"
      objectif="Comprendre comment distribuer un multiplicateur pour transformer un produit en somme"
      conceptTexte="La distributivité, c'est comme un livreur qui dépose le même colis à chaque maison d'un quartier ! Le nombre collé devant la parenthèse est 'distribué' et vient multiplier chaque nombre à l'intérieur."
      explicationTexte="Cette technique permet de casser un gros bloc de calcul avec des parenthèses en plusieurs petites additions beaucoup plus simples. C'est l'outil indispensable pour le calcul mental et la résolution d'équations !"
      phases={phases}
    />
  );
}

export default DevExp;