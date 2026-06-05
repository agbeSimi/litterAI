import ModelageLecon from "../../../composants/ModelageLecon.jsx";
import ExempleResolutionDevExp3 from "../ExempleResolutionDevExp3.jsx";

function ModelageDevExp3() {
  return (
    <ModelageLecon
      titre="Développer une expression avec la distributivité"
      description="Lorsqu'un nombre est placé juste devant une parenthèse, il va se distribuer à chaque élément à l'intérieur ! Dans cette leçon, tu vas apprendre le mécanisme du fléchage pour développer une expression et transformer une multiplication avec parenthèses en calculs beaucoup plus simples."
      routePratiqueGuidee="/PratiqueGuideDevExpP3"
      srcVideo="" // Ajoute le chemin de ta vidéo ici quand il sera prêt
      ComponentExemple={ExempleResolutionDevExp3}
    />
  );
}

export default ModelageDevExp3;