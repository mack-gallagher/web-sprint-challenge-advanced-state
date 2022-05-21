// ❗ You don't need to add extra action creators to achieve MVP

import axios from 'axios';

import {
         MOVE_CLOCKWISE,
         MOVE_COUNTERCLOCKWISE,
         SET_QUIZ_INTO_STATE,
         SET_SELECTED_ANSWER,
         SET_INFO_MESSAGE,
         INPUT_CHANGE,
         RESET_FORM
       } from './action-types';

import {
         initialQuizState,
       } from './reducer';

export function moveClockwise() {
  return {
           type: MOVE_CLOCKWISE,
         }
}

export function moveCounterClockwise() {
  return {
           type: MOVE_COUNTERCLOCKWISE,
         }
}

export function selectAnswer(idx) {
  return {
           type: SET_SELECTED_ANSWER,
           payload: idx,
         } 
}

export function setMessage(message) {
 return {
          type: SET_INFO_MESSAGE,
          payload: message,
        }
}

export function setQuiz(quiz) {
  return {
           type: SET_QUIZ_INTO_STATE,
           payload: quiz,
         };
}

export function inputChange(name, newText) {
  return {
           type: INPUT_CHANGE,
           payload: {
                      "name": name,
                      "value": newText,
                    }
         }
}

export function resetForm() {
  return { type: RESET_FORM } 
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(initialQuizState));

    axios.get('http://localhost:9000/api/quiz/next')
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
      .then(res => {
        dispatch(setQuiz(res.data));
      })
      .catch(err => {
        console.error(err);
      })
  }
}
export function postAnswer(quiz_id,selected_answer_id) {
  return function (dispatch) {

    const our_payload = {
                          quiz_id: quiz_id,
                          answer_id: selected_answer_id
                        };

    axios.post('http://localhost:9000/api/quiz/answer',our_payload)
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
      .then(res => {

        console.log(res);
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch(err => {
        console.error(err);
      });
  }
}
export function postQuiz(questionText, trueAnswerText, falseAnswerText) {

  const postObj = {
                    question_text: questionText,
                    true_answer_text: trueAnswerText,
                    false_answer_text: falseAnswerText,
                  }

  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new',postObj)
    // On successful POST:

    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
      .then(res => {
        dispatch(setMessage(`Congrats: "${questionText}" is a great question!`));
        dispatch(resetForm());
      })
      .catch(err => {
        console.error(err);
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
