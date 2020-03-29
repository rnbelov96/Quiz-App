import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  quizReducer,
  gameReducer,
});
