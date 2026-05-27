import {useState} from "react";
import {handleSubmitLogin} from "../services/LitterAI_API.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");





  return(
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
  )

}

export default Login;