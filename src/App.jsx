import React from 'react';
import './style/main.sass';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Greatings from './components/Greating';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App({ started, finished }) {
  let content;
  if (!started) {
    content = <Greatings />;
  } else if (finished) {
    content = <Result />;
  } else {
    content = <Quiz />;
  }
  return <>{content}</>;
}

App.propTypes = {
  started: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    started: state.gameReducer.started,
    finished: state.gameReducer.finished,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     onClick: () => dispatch(loadData()),
//   };
// }

export default connect(mapStateToProps, null)(App);
