import ExempleResolutionLiteralPhase3 from "../ExempleResolutionLiteralPhase3.jsx";
import ModelageLecon from "../../../composants/ModelageLecon.jsx";

function ModelageCalculLiteralPhase3() {
  return (
    <ModelageLecon
      titre="Expression littéraire"
      description={
        <>
          Savoir lire une formule complexe et décrire les étapes du calcul.
          <br /><br />
          <span className="fw-bold text-dark">Règle :</span> On inverse la logique. On part de la lettre pour aller vers la phrase.
        </>
      }
      routePratiqueGuidee="/pratiqueGuidePhase3CL"
      srcVideo="/videos/Niveau-1-1-Introduction-au-calcul-litteral.mp4"
      ComponentExemple={ExempleResolutionLiteralPhase3}
    />
  );
}

export default ModelageCalculLiteralPhase3;