import { useState} from "react";
import {envoyerMessage} from "../services/LitterAI_API.js";
import logoRobot from "../assets/logo_robot.png";
import {useNavigate} from "react-router-dom";

function Contact() {
  const [typeRequete, setTypeRequete] = useState(null);
  const [conversationIA, setConversationIA] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis LitterAl. Ta question concerne-t-elle le contenu mathématique du site ou un problème technique ?"
    }
  ]);
  const [isWorking, setIsWorking] = useState(false);
  const [commentaire, setCommentaire] = useState("")
  const navigate = useNavigate();


  async function contactIA(messageUtilisateur = "") {

    setIsWorking(true);
    const contenuUser = messageUtilisateur || `Je n'arrive pas à traduire le programme en formule. J'ai écrit "${reponseEleve}". Peux-tu m'aider étape par étape ?`;
    const nouveauMessage = {role: "user", content: contenuUser};
    const historique = [...conversationIA, nouveauMessage];
    const promptSysteme = {
      role: "system",
      content: `RÔLE
Tu es LitterAl, l'assistant d'orientation du site. Tu es poli, concis et efficace.
Ton but est d'identifier si l'élève a besoin d'aide en MATHS (pédagogique) ou en INFORMATIQUE (technique).

MISSION : ANALYSE ET ROUTAGE
1. ANALYSE DE L'INTENTION :
   - Si l'élève parle de fractions, d'équations, de calcul littéral ou de devoirs -> Sa requête est MATHÉMATIQUE.
   - Si l'élève parle de bug, d'affichage, de mot de passe perdu, de bouton qui ne marche pas ou de problème de connexion -> Sa requête est TECHNIQUE.

2. RÉPONSE À DONNER :
   - Tu dois répondre de manière très brève pour confirmer que tu as compris.
   - Tu DOIS inclure le mot-clé #MATHS# si c'est pédagogique.
   - Tu DOIS inclure le mot-clé #TECH# si c'est technique.
   
   Exemple : "C'est noté, je t'oriente vers notre expert en maths. #MATHS# Peux-tu remplir le formulaire ?"

3. SI L'INTENTION EST FLOUE :
   - Demande gentiment une précision : "Est-ce que c'est pour un exercice de maths ou un souci avec le site ?"

RÈGLES DE FORMATAGE STRICTES
- INTERDICTION de copier les titres des instructions.
- BRIÈVETÉ : 2 lignes maximum.
- MOTS-CLÉS : #MATHS# ou #TECH# sont obligatoires pour que le système puisse masquer les emails.
- ZÉRO GRAS : N'utilise jamais de doubles étoiles (**).`
    };
    await envoyerMessage([promptSysteme, ...historique], (nouveauxMessages) => {
      setConversationIA(nouveauxMessages);

      // On récupère le tout dernier message (celui que l'IA vient d'envoyer)
      const derniereReponse = nouveauxMessages[nouveauxMessages.length - 1].content;

      if (derniereReponse.includes("#MATHS#")) {
        setTypeRequete("MATHS");
      } else if (derniereReponse.includes("#TECH#")) {
        setTypeRequete("TECH");
      }
    }, "", () => {}, setIsWorking);
  }

  return(
    <div className="d-flex flex-column min-vh-100 bg-gray-50">
      <main className="flex-grow-1 container py-5">
          <div className="bg-white shadow-sm rounded-4 p-5">
              <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                <img
                  src={logoRobot}
                  alt="Robot"
                  style={{ width: '100%', height: 'auto' }}
                  onClick={() => navigate("/")}
                />

              </div>
            <div className="mb-4 overflow-auto" style={{ height: '300px', borderBottom: '1px solid #eee' }}>
              {conversationIA.filter(m => m.role !== 'system'&& m.content.trim() !== "").map((m, index) => (
                <div key={index} className={`mb-3 d-flex ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`p-3 rounded-4 shadow-sm small ${m.role === 'user' ? 'bg-primary text-white' : 'bg-light text-dark border'}`} style={{ maxWidth: '80%' }}>
                    {/* On nettoie les balises pour que l'utilisateur ne les voit pas */}
                    {m.content.replace("#MATHS#", "").replace("#TECH#", "")}
                  </div>
                </div>
              ))}
              {isWorking && <div className=" small italic">LitterAl réfléchit...</div>}
            </div>

            {/* Champ de saisie pour tester */}
            {!typeRequete && (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-pill-start"
                  placeholder="Réponds à LitterAl..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim() !== "") {
                      contactIA(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            )}

            {/* Petit indicateur de succès pour le test */}
            {typeRequete && (
              <div className="alert alert-success mt-3 animate__animated animate__bounceIn">
                🎯 Type détecté : <strong>{typeRequete}</strong>
              </div>
            )}
          </div>
        <div className="bg-primary">
          {typeRequete && (
            <div className="animate__animated animate__fadeInUp mt-4">
              {/* En-tête dynamique du formulaire */}
              <div className={`p-3 rounded-top-4 text-white fw-bold d-flex align-items-center gap-2 ${typeRequete === 'MATHS' ? 'bg-primary' : 'bg-info text-dark'}`}>
                <span>{typeRequete === 'MATHS' ? '📚 Contact Pédagogique' : '⚙️ Support Technique'}</span>
              </div>

              <form className="bg-white border border-top-0 p-4 rounded-bottom-4 shadow-sm">
                <div className="row">
                  {/* Champ Nom */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold ">Nom</label>
                    <input type="text" className="form-control form-control-lg border-2" placeholder="Ex: Dupont" required />
                  </div>
                  {/* Champ Prénom */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold ">Prénom</label>
                    <input type="text" className="form-control form-control-lg border-2" placeholder="Ex: Jean" required />
                  </div>
                </div>

                {/* Champ Email */}
                <div className="mb-3">
                  <label className="form-label small fw-bold ">Adresse Email</label>
                  <input type="email" className="form-control form-control-lg border-2" placeholder="nom@exemple.com" required />
                </div>

                {/* Champ Objet (Pré-rempli par l'IA ou libre) */}
                <div className="mb-3">
                  <label className="form-label small fw-bold ">Objet</label>
                  <input type="text" className="form-control border-2" placeholder="De quoi souhaites-tu discuter ?" required />
                </div>

                {/* Champ Message avec Compteur */}
                <div className="mb-4 position-relative">
                  <label className="form-label small fw-bold ">Message</label>
                  <textarea
                    className="form-control border-2"
                    rows="5"
                    maxLength="1000"
                    placeholder="Écris ton message ici..."
                    onChange={(e) => setCommentaire(e.target.value)}
                    required
                  ></textarea>
                  {/* Compteur visuel */}
                  <div className={`text-end small mt-1 ${commentaire.length >= 1000 ? 'text-danger fw-bold' : ''}`}>
                    {commentaire.length} / 1000
                  </div>
                </div>

                {/* Bouton d'envoi */}
                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm transition-all hover-lift">
                  Envoyer le message 🚀
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
    )
}

export default Contact;