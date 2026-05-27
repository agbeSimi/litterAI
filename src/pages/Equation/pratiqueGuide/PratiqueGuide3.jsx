import {PratiqueGuide} from "../../../composants/pratiqueGuide.jsx";

function PratiqueGuide2() {

  return (
   <PratiqueGuide titre={"Les équations"}
                  lienPratiqueAutonome={"/PratiqueAutonome3"}
                  prompt={`Souhaite-moi la bienvenue dans la 'Pratique guidée : Niveau Décimaux'. 
   
                         1. GÉNÉRATION : Génère une équation de type ax + b = c.
                         2. CONTRAINTES STRICTES : 
                            - La solution x DOIT être un nombre entier (ex: 1, 2, 3...).
                            - Les coefficients a et b DOIVENT être des nombres décimaux (ex: 1.5, 0.5, 2.5).
                            - Utilise toujours un point (.) pour la virguledans toute l'equation.
                         3. MÉTHODE : Guide-moi pas à pas. Ne donne jamais la réponse. Commence par me demander quelle opération faire pour déplacer b de l'autre côté de l'égalité.
                         4. RÈGLE D'AFFICHAGE : Si tu obtiens 1x, écris "x" directement.`
     }
   />
  )
}

export default PratiqueGuide2;