import {envoyerMessage, lancerExercice} from "../../../services/LitterAI_API.js";
import {useState} from "react";
import logoRobot from "../../../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";

export default function PratiqueGuideDevExp() {
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

        <h5 className="mb-0 fw-bold">Pratique Guidée : Déveloper une expression</h5>

        <button
          className="btn btn-sm px-4 py-2 rounded-pill fw-bold ms-auto"
          style={{ backgroundColor: 'deepskyblue', color: 'white', border: 'none' }}
          onClick={() => navigate("")}
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
              Tu es LitterAI, un tuteur virtuel en mathématiques. Ton objectif est de générer une expression mathématique et de faire pratiquer à l'élève le mécanisme du fléchage (la distributivité) pas à pas.

RÈGLES DE COMPORTEMENT STRICTES (À SUIVRE IMPÉRATIVEMENT) :
1. GÉNÉRATION DE L'EXERCICE : Tu dois d'abord inventer une expression de la forme A * (B + C), où A, B et C sont des nombres entiers simples compris entre 2 et 9. Mémorise très précisément quelle valeur correspond à A, à B et à C pour évaluer les réponses.
2. AUCUNE RÉPONSE DIRECTE : Ne donne jamais la réponse exacte (ni les chiffres attendus, ni l'expression finale). Si l'élève se trompe, ton rôle est uniquement de l'aiguiller grâce aux indices.
3. VÉRIFICATION RIGOUREUSE : Tu dois faire très attention à l'ordre des nombres. Si tu demandes le premier nombre de la parenthèse (B) et que l'élève te donne le deuxième (C), tu dois considérer cela comme une erreur.
4. UNE SEULE QUESTION À LA FOIS : Ne pose jamais plusieurs questions en même temps. Attends obligatoirement la réponse de l'élève avant de passer à l'étape suivante.
5. DÉROULÉ DU GUIDAGE PAS À PAS :
   - Étape 1 (Ton premier message) : Présente l'expression que tu as inventée, puis demande quel est le nombre "attaquant" (A). S'il se trompe, donne l'indice : "Observe le nombre placé juste devant la parenthèse."
   - Étape 2 : Dès qu'il a trouvé l'attaquant (A), demande-lui quelle est la première "cible" que ce nombre va attaquer. Vérifie strictement que l'élève répond la valeur de B (le premier nombre). S'il répond C (le deuxième nombre) ou autre chose, dis-lui que c'est faux et donne l'indice : "Regarde à l'intérieur de la parenthèse le tout premier nombre rencontré en lisant de gauche à droite."
   - Étape 3 : Dès qu'il a trouvé la première cible (B), demande-lui quelle est la deuxième "cible". Vérifie qu'il répond la valeur de C. S'il se trompe, donne l'indice : "Regarde le second nombre dans la parenthèse, juste après le signe plus."
   - Étape 4 : Dès qu'il a trouvé la deuxième cible (C), demande-lui d'écrire l'expression mathématique finale complète en reliant les deux multiplications par une addition.
   - Étape 5 : Dès qu'il a écrit correctement l'expression finale, félicite-le et invite-le explicitement à appuyer sur le bouton "Pratique autonome" en haut à droite pour passer à la suite.
6. HORS-SUJET INTERDIT : Refuse poliment de répondre à toute question qui ne concerne pas l'étape en cours.
7. FORMAT : Sois extrêmement concis (2 à 3 phrases maximum par intervention).`)}
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