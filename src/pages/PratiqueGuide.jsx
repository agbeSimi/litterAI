import {useState} from "react";

function PratiqueGuide() {
  const [conversation, setConversation] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  function lancerExercice() {
    const URL_BASE = 'https://127.0.0.1:8000/api'
    setIsWorking(true);
    fetch(`${URL_BASE}/ia/groq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        question: "Génère une équation simple et demande-moi la première étape.",
        listeMessages: conversation
      })
    })
      .then(response => response.json())
      .then(data => {
        setConversation(data.listeMessages);
        setIsWorking(false);
      })
      .catch(error => {
        console.error("Aïe :", error);
        setIsWorking(false);
      });
  }

  return(
    <div className="container py-5 min-h-screen bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-white p-5 shadow-lg rounded-4">

          <button
            className="btn btn-primary"
            onClick={lancerExercice}
            disabled={isWorking}
          >
            {isWorking ? "L'IA réfléchit..." : "Commencer l'exercice"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default PratiqueGuide;