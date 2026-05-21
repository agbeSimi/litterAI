
const URL_BASE = 'https://litter-api.onrender.com/api'

export function lancerExercice(conversation, setConversation, setIsWorking, prompt) {
  setIsWorking(true);
  fetch(`${URL_BASE}/ia/groq`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      question: prompt,
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



export function envoyerMessage(conversation, setConversation, input, setInput, setIsWorking) {
  const inputEleve = { role: 'user', content: input };

  const convMisAJour = [...conversation, inputEleve];
  setInput("");

  setIsWorking(true);
  fetch(`${URL_BASE}/ia/groq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        question: input,
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


export async function handleSubmit(setIsWorking,
                                   nom,
                                   prenom,
                                   email,
                                   objet,
                                   commentaire,
                                   typeRequete,
                                   setNom,
                                   setPrenom,
                                   setEmail,
                                   setObjet,
                                   setCommentaire,
)
{
  setIsWorking(true)

  const data = {
    nom: nom,
    prenom: prenom,
    email: email,
    objet: objet,
    commentaire: commentaire,
    typeRequete: typeRequete
  };

  try{
    const response = await fetch(`${URL_BASE}/contact_requests`, {
      method :'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
  });
    if (response.ok) {
      alert("Message envoyé avec succès !");
      setNom("");
      setPrenom("");
      setEmail("");
      setObjet("");
      setCommentaire("");
    } else {
      alert("Erreur lors de l'envoi.");
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  } finally {
    setIsWorking(false);
  }
}