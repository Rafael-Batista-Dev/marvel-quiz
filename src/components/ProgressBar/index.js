import React, { Fragment } from "react";

const ProgressBar = () => {
  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">Questão 1/10</div>
        <div className="progressPercent">Progresso 10%</div>
      </div>
      <br />
      <div className="ProgressBar">
        <div className="progressBarChange" style={{ width: "10%" }}></div>
      </div>
    </Fragment>
  );
};

export default ProgressBar;
