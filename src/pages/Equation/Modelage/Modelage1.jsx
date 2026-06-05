import ModelageLecon from "../../../composants/ModelageLecon.jsx";
import ExempleResolution from "../ExempleResolution/ExempleResolution.jsx";

function Modelage1() {
  return (
    <ModelageLecon
      titre="L'équilibre de la Balance ⚖️"
      description={
        <>
          Le signe "=" est le pivot.
          <br />
          <span className="fw-bold text-dark">Règle d'or :</span> Tout ce que tu retires d'un côté, tu dois le retirer de l'autre avec l'opération contraire !
        </>
      }
      routePratiqueGuidee="/pratiqueGuide"
      srcVideo="/videos/le-mystere-de-la-balance.mp4"
      ComponentExemple={ExempleResolution}
    >
      {/* On passe le rappel spécifique à l'intérieur du composant */}
      <div className="card-body px-0 pt-0 mb-3 border-bottom border-light">
        <p className="mb-2 text-secondary">
          <i className="bi bi-arrow-right-short text-primary fs-5"></i> L'opposé de <strong>+5</strong> est <strong>-5</strong>.
        </p>
        <p className="mb-0 text-secondary">
          <i className="bi bi-arrow-right-short text-primary fs-5"></i> La réciproque de <strong>×3</strong> est <strong>÷3</strong>.
        </p>
      </div>
    </ModelageLecon>
  );
}

export default Modelage1;