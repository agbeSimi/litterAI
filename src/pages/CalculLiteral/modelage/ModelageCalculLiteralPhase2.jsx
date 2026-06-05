import ExempleResolutionLiteralPhase2 from "../ExempleResolutionLiteralPhase2.jsx";
import ModelageLecon from "../../../composants/ModelageLecon.jsx";

function ModelageCalculLiteralPhase2() {
  return (
    <ModelageLecon
      titre="Le Programme de Calcul 🖩"
      description={
        <>
          Passer de la phrase en français à l'écriture mathématique.
          <br /><br />
          <span className="fw-bold text-dark">Règle :</span> On part de la phrase pour aller vers la lettre.
        </>
      }
      routePratiqueGuidee="/pratiqueGuidePhase2CL"
      srcVideo="/videos/Niveau-1-1-Introduction-au-calcul-litteral.mp4"
      ComponentExemple={ExempleResolutionLiteralPhase2}
    />
  );
}

export default ModelageCalculLiteralPhase2;