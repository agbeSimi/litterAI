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
    let c = Math.floor(Math.random() * 9) + 1;
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
    const premierePartie = `Multiplier par ${a}`
    const deuxiemePartie = `${operations[indexAleatoire]} ${b}`
    const troisiemePartie = `${operationFinal[indexAleatoire]} par ${c}`
    let resultatPremiereEtape = x * a;
    let resultatDeuxiemeEtape ;
    if (operation() === "+") {
      resultatDeuxiemeEtape = resultatPremiereEtape + b;
    } else if (operation() === "-") {
      resultatDeuxiemeEtape = resultatPremiereEtape - b;
    }

    let resultatTroisiemeEtape;

    if (operationFinale() === "*") {
      resultatTroisiemeEtape = resultatDeuxiemeEtape * c;
    } else if (operation() === "/") {
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