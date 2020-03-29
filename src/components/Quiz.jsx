import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chooseAnswer, nextQuestion } from '../redux/actions/actions';

function Quiz({
  isLoading,
  questions,
  currentQuestion,
  chosenAnswer,
  onChoose,
  onNext,
}) {
  let content;

  if (isLoading) {
    content = (
      <>
        <div className="quiz__header">Loading questions...</div>
        <div className="lds-facebook">
          <div />
          <div />
          <div />
        </div>
      </>
    );
  } else {
    const { question, answers } = questions[currentQuestion];
    content = (
      <div className="quiz__question-wrapper">
        <h1
          className="quiz__question"
          dangerouslySetInnerHTML={{
            __html: question,
          }}
        />
        <div className="quiz__answers">
          {answers.map((el, index) => (
            <div
              key={`${index + 1}-answer`}
              onClick={() => onChoose(index)}
              className={index === chosenAnswer ? 'selected' : null}
            >
              <span className="quiz__option-letter">A</span>
              <span
                className="quiz__answer"
                dangerouslySetInnerHTML={{
                  __html: el,
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="quiz__button"
          disabled={chosenAnswer === 5}
          onClick={() => {
            window.scrollTo(0, 0);
            onNext(currentQuestion);
          }}
          type="button"
        >
          Next question
        </button>
      </div>
    );
  }
  return <div className="quiz">{content}</div>;
}

Quiz.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  chosenAnswer: PropTypes.number.isRequired,
  onChoose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoading: state.gameReducer.isLoading,
    questions: state.quizReducer.questions,
    currentQuestion: state.quizReducer.currentQuestion,
    chosenAnswer: state.quizReducer.chosenAnswer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChoose: index => dispatch(chooseAnswer(index)),
    onNext: currentQuestion => dispatch(nextQuestion(currentQuestion)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
