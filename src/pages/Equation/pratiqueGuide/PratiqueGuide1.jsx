import {PratiqueGuide} from "../../../composants/pratiqueGuide.jsx";

function PratiqueGuide1() {

  return (
    <PratiqueGuide titre={"Les Équations"}
                   lienPratiqueAutonome={"/pratiqueAutonome"}
                   prompt={"Souhaite moi le bienvenue dans la 'Pratique guidé' et Génère une équation aléatoire simple de format aX + b = c " +
                     "et demande-moi la première étape, sans me donner aucune indice ou réponse."
    }
    />
  );
}

export default PratiqueGuide1;