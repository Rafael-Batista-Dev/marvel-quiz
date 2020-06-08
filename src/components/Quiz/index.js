import React, { Component } from "react";

import ProgressBar from "../ProgressBar";
import Levels from "../Levels";

class Quiz extends Component {
  //console.log(props.userData.apelido);

  render() {
    const { apelido } = this.props.userData;

    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>Questões do Quiz</h2>
        <p className="answerOptions"> 1º Questão</p>
        <p className="answerOptions"> 2º Questão</p>
        <p className="answerOptions"> 3º Questão</p>
        <p className="answerOptions"> 4º Questão</p>
        <p className="answerOptions"> 5º Questão</p>
        <button className="btnSubmit">Enviar</button>
      </div>
    );
  }
}

export default Quiz;
