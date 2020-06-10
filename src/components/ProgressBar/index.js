import React, { Fragment } from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  const getWidth = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  };

  const actualQuestion = idQuestion + 1;
  const progressPercent = getWidth(maxQuestions, actualQuestion);

  //console.log(progressPercent);
  //console.log(idQuestion, maxQuestions);

  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">{`Questão: ${
          idQuestion + 1
        } / ${maxQuestions}`}</div>
        <div className="progressPercent">{`${progressPercent}%`}</div>
      </div>
      <br />
      <div className="ProgressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </Fragment>
  );
};

export default React.memo(ProgressBar);
