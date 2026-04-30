function lancerExercice(conversation, setConversation, setIsWorking) {
  const URL_BASE = 'https://127.0.0.1:8000/api'
  setIsWorking(true);
  fetch(`${URL_BASE}/ia/groq`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      question: "Souhaite moi le bienvenue dans la 'Pratique guidé' et Génère une équation simple de format aX + b = c et demande-moi la première étape, sans me donner aucune indice ou réponse.",
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

export default lancerExercice;