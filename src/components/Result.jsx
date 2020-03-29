/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startQuiz, loadData } from '../redux/actions/actions';

function Result({ correctAnswers, onStart, questions }) {
  return (
    <div className="result">
      <div className="result__text">{`Your results: ${correctAnswers} of 10`}</div>
      <button className="quiz__button" onClick={onStart} type="button">
        New Quiz
      </button>
      <div className="result__questions">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <h1
              className="quiz__question"
              dangerouslySetInnerHTML={{
                __html: question.question,
              }}
            />
            <div className="quiz__answers">
              {question.answers.map((answer, answerIndex) => {
                let style = null;
                if (answerIndex === question.chosenAnswer) {
                  style = 'chosen';
                }
                if (answer === question.correct_answer) {
                  style = 'correct';
                }
                return (
                  <div
                    key={`${answerIndex + 1}-answer`}
                    className={style ? `${style}` : ''}
                  >
                    <span className={style ? `quiz__option-letter quiz__option-letter_${style}` : 'quiz__option-letter'}>A</span>
                    <span
                      className={style ? `quiz__answer quiz__answer_${style}` : 'quiz__answer'}
                      dangerouslySetInnerHTML={{
                        __html: answer,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Result.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    correctAnswers: state.quizReducer.correctAnswers,
    questions: state.quizReducer.questions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart: () => {
      dispatch(startQuiz());
      dispatch(loadData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
