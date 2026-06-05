import ModelageLecon from "../../../composants/ModelageLecon.jsx";
import ExempleResolutionExpressionLitteral from "../ExempleResolutionExpressionLitteral.jsx";

function ModelageExpressionLitteral() {
  return (
    <ModelageLecon
      titre="Simplifier une expression littérale."
      description="Comprendre qu'on peut supprimer le signe de multiplication pour réordonner des expressions littérales."
      routePratiqueGuidee="/PratiqueGuideEL"
      srcVideo="/videos/Niveau-2-1-Initiation-Simplification.mp4"
      ComponentExemple={ExempleResolutionExpressionLitteral}
    />
  );
}

export default ModelageExpressionLitteral;