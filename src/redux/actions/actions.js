import {
  ADDQUIZ,
  STARTQUIZ,
  HIDELOADING,
  CHOOSEANSWER,
  NEXTQUESTION,
} from './actionsTypes';

export function addQuiz(quiz) {
  return {
    type: ADDQUIZ,
    payload: quiz,
  };
}

export function startQuiz() {
  return {
    type: STARTQUIZ,
  };
}

export function hideLoading() {
  return {
    type: HIDELOADING,
  };
}

export function chooseAnswer(index) {
  return {
    type: CHOOSEANSWER,
    payload: index,
  };
}

export function nextQuestion(currentQuestion) {
  return {
    type: NEXTQUESTION,
    payload: currentQuestion,
  };
}

export function loadData() {
  return dispatch => {
    fetch('https://opentdb.com/api.php?amount=10&category=15&type=multiple')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const questions = data.results.map(el => {
          const answers = [...el.incorrect_answers];
          answers.push(el.correct_answer);
          const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
          return {
            ...el,
            answers: shuffledAnswers,
          };
        });

        dispatch(addQuiz(questions));
        dispatch(hideLoading());
      })
      .catch(error => {
        console.log(error);
      });
  };
}
