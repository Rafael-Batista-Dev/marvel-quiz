import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  //console.log(props);
  //console.log(ref);

  const [asked, setAsked] = useState([]);
  //console.log(asked);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  const questionAnswer = asked.map((question) => {
    return (
      <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>
          <button className="btnInfo"> Mais </button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div className="stepsBtnContainer">
        <p className="successMsg">Muito bem, você é um especialista!</p>
        <button className="btnResult success"> Tentar novamente</button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Sucesso: 100%</div>
        <div className="progressPercent">Nota: 10/10</div>
      </div>
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
