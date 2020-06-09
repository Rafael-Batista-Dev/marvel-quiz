import React, { Component } from "react";
import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgressBar";
import Levels from "../Levels";

class Quiz extends Component {
  //console.log(props.userData.apelido);

  state = {
    levelNames: ["beginner", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
  };

  loadQuestions = (quizz) => {
    //console.log(level);

    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];

    //console.log(fetchedArrayQuiz);

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );

      this.setState({
        storedQuestions: newArray,
      });
    } else {
      console.log("mais questoes");
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      //console.log(this.state.storedQuestions[this.state.idQuestion].question);
      //console.log(this.state.storedQuestions[this.state.idQuestion].options);

      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
  }

  render() {
    //const { apelido } = this.props.userData;

    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p key={index} className="answerOptions">
          {option}
        </p>
      );
    });

    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button className="btnSubmit">Enviar</button>
      </div>
    );
  }
}

export default Quiz;
