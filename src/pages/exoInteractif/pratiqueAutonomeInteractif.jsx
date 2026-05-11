import {useState} from "react";

function pratiqueAutonomeInteractif() {
  const [donnees, setDonnees] = useState(null);

  const [progression, setProgression] = useState(1);
  const [currentEquation, setCurrentEquation] = useState(genererProgramme());
  const [operationPlacer, setOperationPlacer] = useState(null);
  const [resultatSaisi, setResultatSaisi] = useState("");

  const [estValide, setEstValide] = useState(false);

  

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

    const premierePartie = `Multiplier par ${a}`
    const deuxiemePartie = `${operations[indexAleatoire]} ${b}`
    let resultatPremiereEtape = x * a;
    let resultatDeuxiemeEtape ;
    const troisiemePartie = `${operationFinal[indexAleatoire]} par ${c}`


    let resultatTroisiemeEtape;

    if (operationFinale() === "*") {
      resultatTroisiemeEtape = resultatDeuxiemeEtape * c;
    } else if (operationFinale() === "/") {
      resultatTroisiemeEtape = resultatDeuxiemeEtape / c;
    }


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

  }

  }

  const etapes = [
    {
      consigne:
    }
  ]

}
export default pratiqueAutonomeInteractif;