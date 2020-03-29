import { ADDQUIZ, CHOOSEANSWER, NEXTQUESTION } from '../actions/actionsTypes';

const initialState = {
  questions: [],
  currentQuestion: 0,
  chosenAnswer: 5,
  correctAnswers: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDQUIZ:
      return {
        ...state,
        questions: action.payload,
      };

    case CHOOSEANSWER:
      return {
        ...state,
        chosenAnswer: action.payload,
      };

    case NEXTQUESTION:
      return state.currentQuestion === 9
        ? {
          ...state,
          currentQuestion: 0,
          chosenAnswer: 5,
          questions: state.questions.map((el, index) => (index === state.currentQuestion
            ? { ...el, chosenAnswer: state.chosenAnswer }
            : el)),
        }
        : {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          questions: state.questions.map((el, index) => (index === state.currentQuestion
            ? { ...el, chosenAnswer: state.chosenAnswer }
            : el)),
          chosenAnswer: 5,
          correctAnswers:
              state.questions[state.currentQuestion].correct_answer
              === state.questions[state.currentQuestion].answers[state.chosenAnswer]
                ? state.correctAnswers + 1
                : state.correctAnswers,
        };
    default:
      return state;
  }
}
