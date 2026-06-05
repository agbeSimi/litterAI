import ModelageLecon from "../../../composants/ModelageLecon.jsx";
import ExempleTesterEgalite from "../ExempleTesterEgalite.jsx";

function ModelageTesterEgalite1() {
  return (
    <ModelageLecon
      titre="Comment Tester une égalité?"
      description="Pour vérifier si deux expressions mathématiques sont égales, il ne faut jamais mélanger les pinceaux ! Dans cette leçon, tu vas apprendre la méthode rigoureuse des deux colonnes."
      routePratiqueGuidee="/PratiqueGuideTesterEgalite1"
      srcVideo="" // Pas de vidéo dans le code de départ, le bouton se masquera tout seul !
      ComponentExemple={ExempleTesterEgalite}
    />
  );
}

export default ModelageTesterEgalite1;