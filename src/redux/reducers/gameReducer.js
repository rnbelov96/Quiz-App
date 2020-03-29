/* eslint-disable indent */
import { STARTQUIZ, HIDELOADING, NEXTQUESTION } from '../actions/actionsTypes';

const initialState = {
  started: false,
  isLoading: true,
  finished: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STARTQUIZ:
      return {
        started: true,
        isLoading: true,
        finished: false,
      };

    case HIDELOADING:
      return {
        ...state,
        isLoading: false,
      };

    case NEXTQUESTION:
      return action.payload === 9
        ? {
            ...state,
            finished: true,
          }
        : {
            ...state,
          };
    default:
      return state;
  }
}
