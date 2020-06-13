import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from "axios";
import { GiTrophyCup } from "react-icons/gi";

const QuizOver = React.forwardRef((props, ref) => {
  //console.log(props);
  //console.log(ref);

  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  //console.log(API_PUBLIC_KEY);

  const hash = "3370cc3027d752cfce24ce7338f12a6d";

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInf, setCharacterInf] = useState([]);
  const [loading, setLoading] = useState(true);

  //console.log(asked);

  useEffect(() => {
    setAsked(ref.current);

    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const averageGrade = maxQuestions / 2;

  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharacterInf(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          setCharacterInf(response.data);
          setLoading(false);

          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  if (score < averageGrade) {
    setTimeout(() => loadLevelQuestions(quizLevel), 3000);
    //setTimeout(() => loadLevelQuestions(0), 3000);
  }

  const decision =
    score >= averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Muito bem, vá para o próximo nível!</p>
              <button
                onClick={() => loadLevelQuestions(quizLevel)}
                className="btnResult success"
              >
                Próximo nível
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">
                <GiTrophyCup size="42px" /> Muito bem, você é um especialista!
              </p>
              <button
                onClick={() => loadLevelQuestions(0)}
                className="btnResult success"
              >
                Início
              </button>
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
              <button
                onClick={() => showModal(question.heroId)}
                className="btnInfo"
              >
                {" "}
                Mais{" "}
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"Sem respostas"}
            styling={{ textAlign: "center", color: "#ff385c" }}
          />
        </td>
      </tr>
    );

  const resultsInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{characterInf.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <h3>adad</h3>
      </div>
      <div className="modalFooter">
        <button className="modalBtn">Close</button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2>Resposta da Marvel ...</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </Fragment>
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
      <Modal showModal={openModal} hideModal={hideModal}>
        {resultsInModal}
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
