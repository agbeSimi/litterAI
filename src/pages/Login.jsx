import {useState} from "react";
import {handleLogout} from "../services/LitterAI_API.js";
import {handleSubmitLogin} from "../services/LitterAI_API.js";
import {Form} from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");





  return(
    <>
      <form onSubmit={event => {
      handleSubmitLogin(event,userName,password)}}>
      <input
        type="text"
        placeholder="Login"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Se connecter</button>
      </form>
      <form>
        <button onClick={handleLogout} type="submit">Se deconnecter</button>
      </form>
    </>

  )

}

export default Login;