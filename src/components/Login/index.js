import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import { Link } from "react-router-dom";

const Login = (props) => {
  const firebase = useContext(FirebaseContext);

  //console.log(firebase);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const hendleSubmit = (e) => {
    e.preventDefault();

    firebase
      .loginUser(email, password)
      .then((user) => {
        //console.log(user);

        setEmail("");
        setPassword("");
        props.history.push("/painel");
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
    //console.log(email, password);
  };

  return (
    <div className="slContainer">
      <div className="formBoxLeftLogin"></div>
      <div className="formBoxRight">
        <div className="formContent">
          {error !== "" && <span>{error.message}</span>}

          <h2 style={{ marginBottom: "6rem" }}>Entrar</h2>
          <form onSubmit={hendleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="inputBox">
              <input
                type="password"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label htmlFor="password">Senha</label>
            </div>
            {btn ? <button>Entrar</button> : <button disabled>Entrar</button>}
          </form>
          <div className="linkContainer">
            <Link className="simpleLink" to="/signup">
              Cadastrar-se.
            </Link>
            <br />
            <br />
            <Link className="simpleLink" to="/forget-password">
              Recuperar senha!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
