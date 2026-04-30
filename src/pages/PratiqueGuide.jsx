import {useState} from "react";
import {lancerExercice, envoyerMessage} from "../services/LitterAI_API.js";

function PratiqueGuide() {
  const [conversation, setConversation] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const[input, setInput] = useState("");
  return(
    <div className="container py-5 min-h-screen bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-white p-5 shadow-lg rounded-4">

          {conversation?.filter((_, index) => index !== 0).map((message, index) => (
            <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
              {message.content}
            </div>
          ))}

          {(conversation?.length || 0) === 0 && <button
            className="btn btn-primary"
            onClick={() => lancerExercice(conversation, setConversation, setIsWorking)}
            disabled={isWorking}
          >
            {isWorking ? "L'IA réfléchit..." : "Commencer l'exercice"}
          </button>}
          <div>
            {conversation?.length > 0 && <input
            type="text"
            className="form-control mb-3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isWorking}/>
            }

            {conversation?.length > 0 && <button
              type="submit"
              className="btn btn-primary border-0"
              disabled={isWorking}
              onClick={() => envoyerMessage(conversation,setConversation,input,setInput,setIsWorking)}
            >
            Envoyer
            </button>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default PratiqueGuide;