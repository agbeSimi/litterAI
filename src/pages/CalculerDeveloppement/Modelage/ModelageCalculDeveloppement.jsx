
import ExempleCalculDeveloppement from "../ExempleCalculDeveloppement.jsx";
import ModelageLecon from "../../../composants/ModelageLecon.jsx";

function ModelageCalculDeveloppement() {
  return (
    <ModelageLecon
      titre="Calculer astucieusement avec le Développement"
      description="Pour calculer des multiplications difficiles de tête sans calculatrice, il existe une technique secrète : la distributivité ! Dans cette leçon, tu vas apprendre à décomposer les nombres pour transformer des calculs complexes en opérations simples et super rapides."
      routePratiqueGuidee="/PratiqueGuideCalculDeveloppement"
      srcVideo="/videos/Niveau-1-1-Introduction-au-calcul-litteral.mp4"
      ComponentExemple={ExempleCalculDeveloppement}
    />
  );
}

export default ModelageCalculDeveloppement;