import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levelNames, quizLevel }) => {
  //console.log(levelNames);

  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizStepper = levelNames.map((level) => ({
      title: level.toUpperCase(),
    }));
    setLevels(quizStepper);
  }, [levelNames]);

  //console.log(levels);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        size={42}
        circleTop={0}
        steps={levels}
        activeStep={quizLevel}
        circleFontSize={20}
        barStyle={"dashed"}
        activeColor={"#ff385c"}
        completeColor={"#E0E0E0"}
        completeBarColor={"#ff385c"}
        activeTitleColor={"#ff385c"}
        defaultTitleColor={"#E0E0E0"}
        completeTitleColor={"#E0E0E0"}
      />
    </div>
  );
};

export default React.memo(Levels);
