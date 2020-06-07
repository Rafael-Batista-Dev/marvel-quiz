import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const Signup = (props) => {
  const firebase = useContext(FirebaseContext);

  console.log(firebase);

  const data = {
    apelido: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    firebase
      .signupUser(email, password)
      .then((user) => {
        setLoginData({ ...data });
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const { apelido, email, password, confirmPassword } = loginData;

  const btn =
    apelido === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Cadastrar-se</button>
    ) : (
      <button>Cadastrar-se</button>
    );

  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}

            <h2>Cadastre-se</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={apelido}
                  type="text"
                  id="apelido"
                  autoComplete="off"
                  required
                />
                <label htmlFor="apelido">Apelido</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Senha</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="confirmPassword">Confirme a Senha</label>
              </div>

              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Já está inscrito? Conecte-se.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
