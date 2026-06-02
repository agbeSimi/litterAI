

const URL_BASE = 'https://127.0.0.1:8000/api'

// const URL_BASE = 'https://litterai-api.onrender.com/api'

export function lancerExercice(conversation, setConversation, setIsWorking, prompt) {
  setIsWorking(true);
  fetch(`${URL_BASE}/ia/groq`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json',
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
  setInput("");


  setIsWorking(true);
  fetch(`${URL_BASE}/ia/groq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',

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
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
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

export async function handleSubmitLogin(event, userName, password) {
  event.preventDefault();

  try {
    const response = await fetch(`${URL_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName,
        password: password
      })
    });


    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("jwt_token", data.token);
      alert("Connexion réussie ! Jeton enregistré.");
    } else {
      alert("Identifiants incorrects.");
    }
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Impossible de joindre le serveur.");
  }

}


export function handleLogout(setConversation) {
  // 1. On supprime le jeton du localStorage
  localStorage.removeItem("jwt_token");

  // 2. Optionnel : On vide l'historique de la conversation en cours pour le prochain utilisateur
  if (setConversation) {
    setConversation([]);
  }

  alert("Vous avez été déconnecté avec succès !");
}

export async function handleSubmitRegister(event, login, email, password, role, mail_academique) {
  event.preventDefault();

  const payload = {
    email: email,
    login: login,
    password: password,
    role: role
  };

  if (role === "ROLE_USER_PROF") {
    payload.mail_academique = mail_academique;
  }

  try {
    const response = await fetch(`${URL_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Erreur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur d'inscription :", error);
    return false;
  }
}

export async function handleVerifyCode(code) {
  try {
    const response = await fetch(`${URL_BASE}/api/verify-teacher-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ code })
    });

    return response.ok;
  } catch (error) {
    console.error("Mauvais code :", error);
    return false;
  }
}
