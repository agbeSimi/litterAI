import {useState} from "react";

function PratiqueAutonomeInteractif() {
  // const [donnees, setDonnees] = useState(null);

  const [progression, setProgression] = useState(1);
  const [currentEquation, setCurrentEquation] = useState(genererProgramme());
  // const [operationPlacer, setOperationPlacer] = useState(null);
  // const [resultatSaisi, setResultatSaisi] = useState("");
  const [inputEleve, setInputEleve] = useState("");
  // const [estValide, setEstValide] = useState(false);

  

  function genererProgramme() {
    const operations = ['additionner', 'soustraire']
    const operationFinal = ['multiplier', 'diviser']
    const indexAleatoire = Math.floor(Math.random() * operations.length);
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 1;
    let x = Math.floor(Math.random() * 5) + 1;
    let c;



    const operation = () => {
      if (indexAleatoire === 0)
        return `+`
      else return `-`
    }
    const operationFinale = () => {
      if (indexAleatoire === 0)
        return `*`
      else return `/`
    }

    let resultatPremiereEtape = x * a;
    let resultatDeuxiemeEtape ;
    let resultatTroisiemeEtape ;

    if (operation() === "+") {
      resultatDeuxiemeEtape = resultatPremiereEtape + b;
    } else if (operation() === "-") {
      resultatDeuxiemeEtape = resultatPremiereEtape - b;
    }

    if (operationFinale() === '/') {
      // On cherche un diviseur de resultatDeuxiemeEtape

      // Pour faire simple : on essaie des chiffres jusqu'à ce qu'on en trouve un qui marche
      let diviseursPossibles = [];
      for (let i = 2; i <= 10; i++) {
        if (resultatDeuxiemeEtape % i === 0) {
          diviseursPossibles.push(i);
        }
      }
      // Si on a trouvé des diviseurs, on en prend un au hasard, sinon on prend 1
      c = diviseursPossibles.length > 0
        ? diviseursPossibles[Math.floor(Math.random() * diviseursPossibles.length)]
        : 1;

    } else {
      c = Math.floor(Math.random() * 9) + 1;
    }

    if (operationFinale() === "*") {
      resultatTroisiemeEtape = resultatDeuxiemeEtape * c;
    } else if (operationFinale() === "/") {
      resultatTroisiemeEtape = resultatDeuxiemeEtape / c;
    }

    const premierePartie = `Multiplier par ${a}`
    const deuxiemePartie = `${operations[indexAleatoire]} ${b}`
    const troisiemePartie = `${operationFinal[indexAleatoire]} par ${c}`

  return{
    affichage: `${a} * x ${operation()} ${b} ${operationFinale()} ${c}`,
    solutions: [resultatPremiereEtape,resultatDeuxiemeEtape,resultatTroisiemeEtape],
    x: x,
    a: a,
    b: b,
    c:c,
    premierePartie: premierePartie,
    deuxiemePartie: deuxiemePartie,
    troisiemePartie: troisiemePartie,
    operation: operation(),
    operationFinale: operationFinale(),

  }

  }

  const etapes = [
    {
      id: 0,
      consigne: currentEquation.premierePartie,
      solution: currentEquation.solutions[0],
      symbole: "*", // Car la 1ère étape est toujours ta multiplication par 'a'
      valeurOp: currentEquation.a
    },
    {
      id: 1,
      consigne: currentEquation.deuxiemePartie,
      solution: currentEquation.solutions[1],
      symbole: currentEquation.operation === "+" ? "+" : "-", // Ou utilise une variable de ton générateur
      valeurOp: currentEquation.b
    },
    {
      id: 2,
      consigne: currentEquation.troisiemePartie,
      solution: currentEquation.solutions[2],
      symbole: currentEquation.operationFinale === "*" ? "*" : "/", // Idem
      valeurOp: currentEquation.c
    }
  ];

  return (
    <div className="p-4">
      {/* Affichage du nombre de départ */}
      <div className="case-depart">Départ : {currentEquation.x}</div>

      {etapes.map((etape, index) => (
        <div key={index} className="d-flex flex-column align-items-center">
          {/* 1. La flèche descendante */}
          <div className="arrow-down">⬇️</div>

          <div className="d-flex align-items-center gap-3">
            {/* 2. La Case Blanche (Le résultat à deviner) */}
            <div className="resultat-container">
              {progression > index ? (
                // Étape déjà réussie
                <div className="case-blanche valide">{currentEquation.solutions[index]}</div>
              ) : progression === index ? (
                // Étape en cours : on affiche l'input
                <input
                  type="number"
                  value={inputEleve}
                  onChange={(e) => setInputEleve(e.target.value)}
                  // onBlur={verifierResultat} // On vérifie quand il quitte le champ
                />
              ) : (
                // Étape future : verrouillée
                <div className="case-blanche vide">?</div>
              )}
            </div>

            {/* 3. La Case Bleue (L'opération à placer) */}
            <div className="operation-container">
              {/* Ici tu mets ta logique de Drag & Drop pour currentEquation.consigne[index] */}
              <span className="badge bg-info">{etape.consigne}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );




}
export default PratiqueAutonomeInteractif;