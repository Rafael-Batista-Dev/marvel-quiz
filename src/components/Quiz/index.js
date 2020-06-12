import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight } from "react-icons/fa";
import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgressBar";
import Levels from "../Levels";
import QuizOver from "../QuizOver";

toast.configure();

const initialState = {
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
  percent: null,
};

const levelNames = ["iniciante", "moderado", "especialista"];

class Quiz extends Component {
  //console.log(props.userData.apelido);

  constructor(props) {
    super(props);

    this.state = initialState;
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
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizEnd,
    } = this.state;
    if (
      storedQuestions !== prevState.storedQuestions &&
      storedQuestions.length
    ) {
      //console.log(this.state.storedQuestions[this.state.idQuestion].question);
      //console.log(this.state.storedQuestions[this.state.idQuestion].options);

      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      });
    }

    if (idQuestion !== prevState.idQuestion && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (quizEnd !== prevState.quizEnd) {
      //console.log(this.state.score);
      const gradepercent = this.getPercent(maxQuestions, score);
      this.gameOver(gradepercent);
    }

    if (this.props.userData.apelido !== prevProps.userData.apelido) {
      this.showMsgToast(this.props.userData.apelido);
    }
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      //this.gameOver();
      this.setState({
        quizEnd: true,
      });
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

  gameOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent,
      });
    } else {
      this.setState({
        percent,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });

    this.loadQuestions(levelNames[param]);
  };

  render() {
    //const { apelido } = this.props.userData;

    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent,
    } = this.state;

    const displayOptions = options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          <FaChevronRight />
          {option}
        </p>
      );
    });

    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <Fragment>
        <Levels levelNames={levelNames} quizLeve={quizLevel} />

        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
        <h2>{question}</h2>
        {displayOptions}
        <button
          disabled={btnDisabled}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          {idQuestion < maxQuestions - 1 ? "Enviar Resposta" : "Terminar"}
        </button>
      </Fragment>
    );
  }
}

export default Quiz;
