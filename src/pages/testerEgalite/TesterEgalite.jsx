import IntroductionChapitre from "../../composants/IntroductionChapitre.jsx";

function TesterEgalite() {
  const phases = [
    { label: "Phase 1", path: "/ModelageTesterEgalite1" },
    { label: "Phase 2", path: "/PratiqueGuideTesterEgalite2" },
    { label: "Phase 3", path: "/PratiqueGuideTesterEgalite3" }
  ];

  return (
    <IntroductionChapitre
      chapitre="Tester les égalités"
      objectif="Remplacer les lettres par des nombres pour vérifier si une égalité est vraie ou fausse."
      conceptTexte="Une égalité est composée de deux côtés séparés par un signe '=' : Le membre de gauche et le membre de droite. Tester une égalité consiste à vérifier si ces deux côtés donnent le même résultat lorsqu'on remplace les lettres par des nombres."
      explicationTexte={
        <>
          On calcule chaque côté séparément :<br /><br />
          <span className="fw-bold text-dark">1. Remplacer :</span> On réécrit chaque membre en remplaçant les lettres par les nombres donnés.<br /><br />
          <span className="fw-bold text-dark">2. Calculer :</span> On effectue les calculs de chaque côté en respectant les priorités opératoires.<br /><br />
          <span className="fw-bold text-dark">3. Conclure :</span> Si les deux totaux sont identiques, l'égalité est VRAIE. S'ils sont différents, elle est FAUSSE.
        </>
      }
      phases={phases}
    />
  );
}

export default TesterEgalite;