import {PratiqueGuide} from "../../../composants/pratiqueGuide.jsx";

function PratiqueGuide2() {


  return (
    <PratiqueGuide titre={"Les équations"}
                   lienPratiqueAutonome={"/PratiqueAutonome2"}
                   prompt={`Souhaite-moi la bienvenue dans la 'Pratique guidée'. 
   
                         1. GÉNÉRATION : Génère une équation de format ax + b = cx + d (avec des nombres entiers).
                         
                         2. MISSION : Guide-moi étape par étape pour regrouper les x à gauche et les nombres à droite.
                         
                         3. RÈGLE D'ÉCRITURE : Si un coefficient est égal à 1 (comme 1x), écris toujours "x" à la place de "1x" dans tes messages. C'est une règle de simplification importante.
                         
                         4. DÉPART : Demande-moi quelle est la toute première étape pour déplacer les x du côté droit vers le côté gauche. Ne me donne ni indice, ni la réponse.`
                   }
    />
  )
}

export default PratiqueGuide2;
