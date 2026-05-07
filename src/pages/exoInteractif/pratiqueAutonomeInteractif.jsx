import {useState} from "react";

function pratiqueAutonomeInteractif() {
  const [donnees, setDonnees] = useState(null);

  const [progression, setProgression] = useState(1);

  const [operationPlacer, setOperationPlacer] = useState(null);
  const [resultatSaisi, setResultatSaisi] = useState("");

  const [estValide, setEstValide] = useState(false);

  

  
  function creerExercice()
  {
    const nombreDepart = Math.floor(Math.random() * 10) + 2;
    for (let i = 0; i < 3; i++) {
      const nouvelleEtape = genererEtape(nombreEnCours);
     
    }


  }


  const etapes = [
    {
      consigne:
    }
  ]

  return();


}
export default pratiqueAutonomeInteractif;