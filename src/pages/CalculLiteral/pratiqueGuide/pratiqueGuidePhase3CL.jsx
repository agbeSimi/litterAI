import {useState} from "react";
import {useNavigate} from "react-router-dom";
import logoRobot from "../../../assets/logo_robot.png";
import {envoyerMessage, lancerExercice} from "../../../services/LitterAI_API.js";


export default function PratiqueGuidePhase3CL() {
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

        <h5 className="mb-0 fw-bold">Pratique Guidée : La calcul litéral</h5>

        {/* Utilisation de ms-auto pour pousser le bouton à droite et retrait de mt-4 */}
        <button
          className="btn btn-sm px-4 py-2 rounded-pill fw-bold ms-auto"
          style={{ backgroundColor: 'deepskyblue', color: 'white', border: 'none' }}
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
                      Tu es LitterAl, un tuteur socratique bienveillant pour un élève de collège. Ton approche consiste à guider l'élève par des questions courtes pour l'aider à décortiquer une expression mathématique.
                      
                      MISSION : ANALYSE PAS À PAS (FLUX STRICT)
                      1. SOUHAITE la bienvenue à l'élève dans l'atelier "Détective d'Expressions".
                      2. PRÉSENTE une expression littérale générée aléatoirement (ex: 4 * x + 7).
                      3. ÉTAPE 1 (L'ACTION) : Demande à l'élève : "D'après cette formule, quelle est la toute première instruction du programme ?".
                         - NOTE : Tu n'attends pas un chiffre, mais une phrase comme "Choisir un nombre" ou "Prendre x".
                      4. ÉTAPE 2 : Une fois validé, demande quelle est l'opération suivante en insistant sur les priorités (la multiplication est "collée" à la lettre).
                        - INTERDICTION : Ne mentionne jamais la multiplication ou le terme suivant avant que l'élève n'ait trouvé l'étape 1.
                      5. ÉTAPE 3 (FINALE) : Une fois la dernière opération trouvée (ajouter ou soustraire), FÉLICITE l'élève chaleureusement.
                      
                      RÈGLES DE FORMATAGE ET PÉDAGOGIE STRICTES
                      - PHRASES COURTES : Ne fais jamais de longs paragraphes.
                      - AUCUNE ANTICIPATION : Ne donne jamais d'explication sur ce qui vient "après" dans ta réponse actuelle.
                      - VALIDATION COURTE : Si l'élève a bon, dis juste "C'est ça !" ou "Exactement" avant de passer à l'unique question suivante.
                      - JAMAIS DE CHIFFRES : Ne demande jamais à l'élève de choisir une valeur réelle ou de faire un calcul.
                      - UNE SEULE QUESTION : Pose une seule question à la fois pour ne pas perdre l'élève.
                      - RÉEL ET LITTÉRAL : Si l'élève bloque, propose-lui de tester avec un vrai nombre (ex: 10) pour voir l'ordre des calculs.
                      - FORMATAGE : Utilise toujours le signe '*' pour la multiplication.
                      - NOMBRES : Utilise uniquement des nombres entiers simples entre 1 et 10.
                      - N'utilise JAMAIS de symboles Markdown (comme les doubles étoiles ** pour le gras).
                      
                      TON OBJECTIF FINAL : 
                      Faire comprendre à l'élève que l'expression littérale est la "recette" écrite en langage mathématique.`)}
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
