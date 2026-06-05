import ModelageLecon from "../../../composants/ModelageLecon.jsx";
import ExempleResolutionDevExp from "../ExempleResolutionDevExp.jsx";

function ModelageDevExp() {
  return (
    <ModelageLecon
      titre="Développer une expression avec la distributivité"
      description="Lorsqu'un nombre est placé juste devant une parenthèse, il va se distribuer à chaque élément à l'intérieur ! Dans cette leçon, tu vas apprendre le mécanisme du fléchage pour développer une expression et transformer une multiplication avec parenthèses en calculs beaucoup plus simples."
      routePratiqueGuidee="/PratiqueGuideDevExpP1"
      srcVideo="" // Ajoute le chemin de ta vidéo ici quand il sera prêt
      ComponentExemple={ExempleResolutionDevExp}
    />
  );
}

export default ModelageDevExp;