import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgressBar";
import Levels from "../Levels";
import QuizOver from "../QuizOver";

toast.configure();

class Quiz extends Component {
  //console.log(props.userData.apelido);

  constructor(props) {
    super(props);

    this.initialState = {
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
      quizEnd: false,
    };

    this.state = this.initialState;
    this.storedDataRef = React.createRef();
  }

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

  showMsgToast = (apelido) => {
    if (!this.state.showMsgWelcome) {
      this.setState({
        showMsgWelcome: true,
      });

      toast.warn(`Bem vindo ${apelido}, boa sorte! 🚀`, {
        position: "top-right",
        autoClose: 3000,
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
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length
    ) {
      //console.log(this.state.storedQuestions[this.state.idQuestion].question);
      //console.log(this.state.storedQuestions[this.state.idQuestion].options);

      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }

    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.props.userData.apelido !== prevProps.userData.apelido) {
      this.showMsgToast(this.props.userData.apelido);
    }
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.gameOver();
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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Errado você pontuou", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = () => {
    const gradepercent = this.getPercent(
      this.state.maxQuestions,
      this.state.score
    );

    if (gradepercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradepercent,
        quizEnd: true,
      });
    } else {
      this.setState({
        percent: gradepercent,
        quizEnd: true,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...this.initialState, quizLevel: param });

    this.loadQuestions(this.state.levelNames[param]);
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

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <Fragment>
        <Levels />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          {this.state.idQuestion < this.state.maxQuestions - 1
            ? "Enviar Resposta"
            : "Terminar"}
        </button>
      </Fragment>
    );
  }
}

export default Quiz;
