import {useState} from "react";
import lancerExercice from "../services/LitterAI_API.js";

function PratiqueGuide() {
  const [conversation, setConversation] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  return(
    <div className="container py-5 min-h-screen bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-white p-5 shadow-lg rounded-4">

          <button
            className="btn btn-primary"
            onClick={() => lancerExercice(conversation,setConversation, setIsWorking)}
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