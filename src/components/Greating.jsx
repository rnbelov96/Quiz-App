import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadData, startQuiz } from '../redux/actions/actions';

function Greatings({ onClick }) {
  return (
    <div className="greating__outlayer">
      <div className="greating">
        <h1 className="greating__title">Welcome to Video Games Quiz</h1>
        <div className="greating__text">
          <p>This is a quiz application built using ReactJS/Redux.</p>
          <p>You will have to answer 10 questions with 4 answer options</p>
          <p>All questions are taken from Trivia API</p>
        </div>
        <button className="greating__button" type="button" onClick={onClick}>
          Start the quiz
        </button>
      </div>
    </div>
  );
}

Greatings.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(startQuiz());
      dispatch(loadData());
    },
  };
}

export default connect(null, mapDispatchToProps)(Greatings);
