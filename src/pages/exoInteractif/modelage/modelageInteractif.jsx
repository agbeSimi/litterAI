import ModelageLecon from "../../../composants/ModelageLecon.jsx";
import ExempleInteractif from "../composant/ExempleInteractif.jsx";

function ModelageInteractif() {
  return (
    <ModelageLecon
      titre="Le Programme Interactif 🧩"
      description="Apprendre à manipuler les opérations pour transformer un nombre."
      routePratiqueGuidee="/pratiqueGuideInteractif"
      ComponentExemple={ExempleInteractif}
    >
      <div className="alert alert-warning border-0 rounded-3 mb-4 shadow-sm py-3 px-4 text-start small">
        <strong>Comment ça marche ?</strong> Tu devez d'abord choisir l'opération (case bleue) puis calculer le résultat (case blanche).
      </div>
    </ModelageLecon>
  );
}

export default ModelageInteractif;