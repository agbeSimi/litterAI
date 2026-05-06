import {envoyerMessage, lancerExercice} from "../../../services/LitterAI_API.js";
import {useState} from "react";
import logoRobot from "../../../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";

export default function PratiqueGuidePhase2CL() {
  const [conversation, setConversation] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const[input, setInput] = useState("");
  const navigate = useNavigate();


  return (

    <div className="d-flex flex-column vh-100 bg-light">
      <div className="bg-white border-bottom p-3 shadow-sm d-flex align-items-center">
        <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
          <img
            src={logoRobot}
            alt="Robot"
            style={{ width: '100%', height: 'auto' }}
            onClick={() => navigate("/")}
          />
        </div>

        <h5 className="mb-0 fw-bold">Pratique Guidée : Les Équations</h5>

        {/* Utilisation de ms-auto pour pousser le bouton à droite et retrait de mt-4 */}
        <button
          className="btn btn-sm px-4 py-2 rounded-pill fw-bold ms-auto"
          style={{ backgroundColor: 'deepskyblue', color: 'white', border: 'none' }}
          onClick={() => navigate("/PratiqueAutonomeCL2")}
        >
          Pratique autonome →
        </button>
      </div>
      <div className="flex-grow-1 overflow-auto p-3 p-md-5" style={{ scrollBehavior: 'smooth' }}>
        <div className="mx-auto" style={{ maxWidth: '800px' }}>

          {(conversation?.length || 0) === 0 && (
            <div className="d-flex flex-column align-items-center justify-content-center mt-5 py-5 border rounded-4 bg-white shadow-sm">
              <h2 className="fw-bold">Bienvenue !</h2>
              <p className="text-muted mb-4">Prêt à t'entraîner?</p>
              <button
                className="btn btn-primary btn-lg rounded-pill px-5 shadow"
                onClick={() => lancerExercice(conversation, setConversation, setIsWorking,
                  `RÔLE
                  Tu es un professeur de mathématiques de collège. Ton approche est "socratique" : tu guides l'élève par des questions sans jamais donner la réponse directement. Tu dois l'aider à trouver par lui-même.

                  MISSION : PRATIQUE GUIDÉE PHASE 2
                  1. Souhaite la bienvenue à l'élève dans la "Pratique Guidée Phase 2".
                  2. Présente clairement ce programme de calcul avec des valeurs simples :
                  - Choisir un nombre.
                  - Multiplier par [NOMBRE ALÉATOIRE].
                  - Additionner [NOMBRE ALÉATOIRE] au résultat.
                  3. ÉTAPE 1 : Demande d'abord à l'élève de choisir un nombre de départ.
                  4. ÉTAPE 2.1 : Une fois le nombre choisi, demande à l'élève de multiplier par 3 et de donner l'expression littérale.
                  

                  RÈGLES DE FORMATAGE STRICTES
                  - Pour le calcul littéral, n'utilise JAMAIS l'abréviation (ex: 5X).
                  - Tu dois TOUJOURS afficher le signe de multiplication explicitement.
                  - Exemple obligatoire : (5 * X) + 2.
                  - Ne donne aucune explication complexe, reste simple et concis.`)}
                disabled={isWorking}
              >
                {isWorking ? "Chargement..." : "Commencer l'exercice"}
              </button>
            </div>
          )}

          {/* Affichage des messages en bulles */}
          {conversation?.filter((_, index) => index !== 0).map((message, index) => (
            <div key={index} className={`d-flex mb-4 ${message.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div
                className={`p-3 shadow-sm ${message.role === 'user' ? 'bg-primary text-white rounded-user' : 'bg-white text-dark border rounded-bot'}`}
                style={{ maxWidth: '85%', whiteSpace: 'pre-wrap' }}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* ZONE D'INPUT : Toujours fixée en bas */}
    {conversation?.length > 0 && (
      <div className="bg-white border-top p-3 p-md-4 shadow-lg">
        <div className="mx-auto position-relative" style={{ maxWidth: '800px' }}>
          <div className="d-flex align-items-center border rounded-pill bg-light p-1 ps-3 shadow-sm">
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none py-2"
              placeholder="Écris ta réponse ici..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isWorking}
              onKeyDown={(e) => e.key === 'Enter' && !isWorking && envoyerMessage(conversation, setConversation, input, setInput, setIsWorking)}
            />
            <button
              className={`btn border-0 rounded-circle ms-2 d-flex align-items-center justify-content-center ${!input.trim() || isWorking ? 'btn-light text-muted' : 'btn-primary'}`}
              style={{ width: '45px', height: '45px' }}
              disabled={isWorking}
              onClick={() => envoyerMessage(conversation, setConversation, input, setInput, setIsWorking)}
            >
              {isWorking ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-send-fill"></i>}
            </button>
          </div>
        </div>
      </div>
  )}
    <div/>
    </div>
  )
}