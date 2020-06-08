import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const firebase = useContext(FirebaseContext);
  //console.log(email);

  const hendleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email)
      .then(() => {
        setError(null);
        setSuccess(`Recuperação de senha enviada para o email: ${email}`);
        setEmail("");

        setTimeout(() => {
          props.history.push("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };

  const disabled = email === "";

  return (
    <div className="slContainer">
      <div className="formBoxLeftForget"></div>
      <div className="formBoxRight">
        <div className="formContent">
          {success && (
            <span
              style={{
                border: "1px solid green",
                color: "green",
                background: "#FFF",
              }}
            >
              {success}
            </span>
          )}

          {error && <span>{error.message}</span>}

          <h2 style={{ marginBottom: "6rem" }}>Esqueceu sua senha?</h2>
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

            <button disabled={disabled}>Recuperar senha</button>
          </form>
          <div className="linkContainer">
            <Link className="simpleLink" to="/login">
              Deseja conectar-se?.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
