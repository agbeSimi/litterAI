import ExempleResolutionLiteralPhase1 from "../ExempleResolutionLiteralPhase1.jsx";
import ModelageLecon from "../../../composants/ModelageLecon.jsx";

function ModelageCalculLiteralPhase1() {
  return (
    <ModelageLecon
      titre="Qu'est-ce qu'une expression littérale?"
      description="Comprendre qu'une lettre cache une valeur et savoir calculer une expression."
      routePratiqueGuidee="/PratiqueGuidePhase1CL"
      srcVideo="/videos/Niveau-1-1-Introduction-au-calcul-litteral.mp4"
      ComponentExemple={ExempleResolutionLiteralPhase1}
    />
  );
}

export default ModelageCalculLiteralPhase1;