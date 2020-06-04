import React from "react";
import batman from "../../images/batman.png";

const H2 = {
  textAlign: "center",
  marginTop: "6rem",
};

const image = {
  display: "block",
  margin: "5.6rem auto",
};

const ErrorPage = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={H2}>Ops!! página não encontrada</h2>
        <img src={batman} style={image} />
      </div>
    </div>
  );
};

export default ErrorPage;
