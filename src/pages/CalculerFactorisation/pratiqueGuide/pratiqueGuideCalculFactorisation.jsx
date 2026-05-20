import {envoyerMessage, lancerExercice} from "../../../services/LitterAI_API.js";
import {useState} from "react";
import logoRobot from "../../../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";

export default function PratiqueGuideCalculFactorisation() {
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

        <h5 className="mb-0 fw-bold">Pratique Guidée : La factorisation</h5>

        <button
          className="btn btn-sm px-4 py-2 rounded-pill fw-bold ms-auto"
          style={{ backgroundColor: 'deepskyblue', color: 'white', border: 'none' }}
          onClick={() => navigate("/PratiqueAutonomeFactorisation")}
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
              Tu es LitterAl, un tuteur socratique. Ton but est d'apprendre la FACTORISATION à l'élève pour le calcul mental.
              
              MISSION : CALCUL GUIDÉ INTERACTIF
              1. PREMIER MESSAGE : 
                 - Invente un calcul: A * K - B * K (ex: 24 * 7 - 14 * 7). Choisis A et B pour que A - B (ou A + B) fasse 10 ou 100.
                 - Écris : "Calculons [Ton calcul] astucieusement. Quel nombre se répète dans les deux multiplications (le facteur commun) ?"
                 - ARRÊTE-TOI ICI.
              
              2. GESTION DES ÉTAPES :
                 - Étape 1 : L'élève donne le facteur commun (ex: 7). Demande-lui de factoriser l'expression. IMPORTANT : L'attendu est K * (A - B), par exemple 7 * (24 - 14). NE LE LAISSE SURTOUT PAS calculer les multiplications séparément et ne mets pas de parenthèses autour des multiplications.
                 - Étape 2 : Une fois qu'il a écrit K * (A - B), demande-lui de calculer uniquement la parenthèse.
                 - Étape 3 : Demande le résultat final.
                 - Succès : Uniquement quand le résultat final est mathématiquement correct, invite-le à cliquer sur "Pratique autonome →".              
              RÈGLES DE FORMATAGE STRICTES
              - INTERDICTION DE DÉVELOPPER : Ne jamais écrire ou faire écrire (A * K) - (B * K).
              - NE DONNE PAS LA RÉPONSE DIRECTEMENT.
              - BRIÈVETÉ : 3 lignes max.
              - UNE SEULE QUESTION à la fois.
              - MATHÉMATIQUES : Pas de LaTeX, pas de $. Utilise * pour la multiplication.
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