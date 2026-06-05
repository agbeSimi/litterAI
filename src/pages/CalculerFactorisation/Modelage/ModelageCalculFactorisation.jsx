import ExempleCalculFactorisation from "../ExempleCalculFactorisation.jsx";
import ModelageLecon from "../../../composants/ModelageLecon.jsx";

function ModelageCalculFactorisation() {
  return (
    <ModelageLecon
      titre="Calculer astucieusement avec la factorisation"
      description="Lorsqu'un même nombre se répète dans un calcul, pas besoin de perdre du temps : tu peux le mettre en facteur ! Dans cette leçon, tu vas apprendre la technique de la factorisation pour regrouper les morceaux et transformer des opérations lourdes en calculs mentaux ultra simples."
      routePratiqueGuidee="/PratiqueGuideCalculFactorisation"
      srcVideo="/videos/Niveau-3-2-La-factorisation-pour-calculer.mp4"
      ComponentExemple={ExempleCalculFactorisation}
    />
  );
}

export default ModelageCalculFactorisation;