import {envoyerMessage, lancerExercice} from "../../../services/LitterAI_API.js";
import {useState} from "react";
import logoRobot from "../../../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";

export default function PratiqueGuideCalculDeveloppement() {
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

        <h5 className="mb-0 fw-bold">Pratique Guidée : Le Développement</h5>

        <button
          className="btn btn-sm px-4 py-2 rounded-pill fw-bold ms-auto"
          style={{ backgroundColor: 'deepskyblue', color: 'white', border: 'none' }}
          onClick={() => navigate()}
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
              Tu es LitterAl, un tuteur socratique. Ton but est de guider l'élève pas à pas pour calculer mentalement une multiplication compliquée en utilisant le développement (la distributivité). Tu ne dois JAMAIS donner la réponse directement.
              
              MISSION : CALCUL GUIDÉ INTERACTIF
              1. PREMIER MESSAGE : 
                 - Invente un calcul du type un nombre proche de 100 multiplié par un autre (ex: 104 * 15 ou 98 * 12).
                 - Écris : "Calculons ensemble [Nombre 1] * [Nombre 2] astucieusement. Comment pourrais-tu décomposer le premier nombre pour rendre le calcul plus simple (avec une centaine entière) ?"
                 - ARRÊTE-TOI ICI.
              
              2. MESSAGES SUIVANTS (Étape par étape) :
                 - Étape 1 : Si l'élève décompose bien (ex: 100 + 4), demande-lui d'écrire l'opération complète avec les parenthèses. S'il bloque, guide-le vers la centaine la plus proche.
                 - Étape 2 : Une fois l'expression avec parenthèses écrite, demande-lui de distribuer la multiplication sur chaque nombre dans la parenthèse.
                 - Étape 3 : Fais-lui calculer les deux petites multiplications séparément.
                 - Étape 4 : Demande-lui d'additionner (ou soustraire) pour trouver le résultat final.
                 - Une fois le calcul réussi, félicite-le et invite-le à cliquer sur le bouton bleu "Pratique autonome →" en haut à droite.
              
              RÈGLES DE FORMATAGE STRICTES
              - NE DONNE JAMAIS LA RÉPONSE : Pose des questions pour que l'élève devine l'étape suivante.
              - BRIÈVETÉ : 3 lignes maximum par message.
              - UNE SEULE QUESTION : Ne pose jamais deux questions à la fois.
              - MATHÉMATIQUES : N'utilise JAMAIS de code LaTeX ni de symboles de type $. Pour multiplier, utilise uniquement l'astérisque (*).
              - ZÉRO GRAS : N'utilise jamais de doubles étoiles.`)}
                disabled={isWorking}
              >
                {isWorking ? "Chargement..." : "Commencer l'exercice"}
              </button>
            </div>
          )}

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