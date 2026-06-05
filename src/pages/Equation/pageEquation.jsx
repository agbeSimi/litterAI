import IntroductionChapitre from "../../composants/IntroductionChapitre.jsx";

function PageEquation() {
  const phases = [
    { label: "Phase 1", path: "/modelage" },
    { label: "Phase 2", path: "/modelage2" },
    { label: "Phase 3", path: "/modelage3" }
  ];

  return (
    <IntroductionChapitre
      chapitre="Les équations"
      objectif="Savoir isoler 'x' et résoudre l'équation"
      conceptTexte="Une équation est une balance en équilibre. Pour isoler x, chaque opération effectuée d'un côté doit être effectuée de l'autre."
      explicationTexte="Il faut savoir utiliser l'opposé (Annuler une addition par une soustraction et inversement) ainsi que la réciproque(Annuler une multiplication par une division et inversement)"
      phases={phases}
    />
  );
}

export default PageEquation;