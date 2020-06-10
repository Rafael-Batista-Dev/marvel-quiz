import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgressBar";
import Levels from "../Levels";

toast.configure();

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
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showMsgWelcome: false,
  };

  storedDataRef = React.createRef();

  loadQuestions = (quizz) => {
    //console.log(level);

    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];

    //console.log(fetchedArrayQuiz);

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;

      //console.log(this.storedDataRef.current);

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

  showMsgWelcome = (apelido) => {
    if (!this.state.showMsgWelcome) {
      this.setState({
        showMsgWelcome: true,
      });

      toast.warn(`Bem vindo ${apelido}, boa sorte! 🚀`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.props.userData.apelido) {
      this.showMsgWelcome(this.props.userData.apelido);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const goodanswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if (this.state.userAnswer === goodanswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      toast.success("Ótimo você pontuou +1", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Errado você pontuou", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    //const { apelido } = this.props.userData;

    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
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
        <button
          disabled={this.state.btnDisabled}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          Enviar
        </button>
      </div>
    );
  }
}

export default Quiz;
