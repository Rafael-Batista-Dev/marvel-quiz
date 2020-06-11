import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  //console.log(props);
  //console.log(ref);

  const { levelNames, score, maxQuestions, quizLevel, percent } = props;

  const [asked, setAsked] = useState([]);
  //console.log(asked);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  const averageGrade = maxQuestions / 2;

  const decision =
    score >= averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Muito bem, vá para o próximo nível!</p>
              <button className="btnResult success">Próximo nível</button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">Muito bem, você é um especialista!</p>
              <button className="btnResult success">Início</button>
            </Fragment>
          )}
        </div>

        <div className="percentage">
          <div className="progressPercent">Aproveitamento: {percent}%</div>
          <div className="progressPercent">
            Nota: {score}/{maxQuestions}{" "}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Você falhou !</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">Aproveitamento: {percent} %</div>
          <div className="progressPercent">
            Nota: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button className="btnInfo"> Mais </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <p style={{ textAlign: "center", color: "red" }}>Sem respostas</p>
        </td>
      </tr>
    );

  return (
    <Fragment>
      {decision}
      <hr />

      <p>As respostas para as perguntas feitas:</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questão</th>
              <th>Respostas</th>
              <th>Informação</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
