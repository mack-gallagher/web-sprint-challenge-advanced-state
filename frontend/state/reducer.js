// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'

import {
         MOVE_CLOCKWISE,
         MOVE_COUNTERCLOCKWISE,
         SET_QUIZ_INTO_STATE,
         SET_SELECTED_ANSWER,
         SET_INFO_MESSAGE,
         INPUT_CHANGE,
         RESET_FORM, 
       } from './action-types';

const initialWheelState = ["B",null,null,null,null,null];
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      const newState = [...state];
      let currInd = 0;
      for (let i = 0; i < newState.length; i++) {
        if (newState[i] === "B") currInd = i;
      }
      let newInd = (currInd + 1) % 6;
      for (let i = 0; i < newState.length; i++) {
        if (i === newInd) newState[i] = "B";
        else newState[i] = null;
      }
      return newState;
    case MOVE_COUNTERCLOCKWISE:
      const nextState = [...state];
      let originalInd = 0;
      for (let i = 0; i < nextState.length; i++) {
        if (nextState[i] === "B") originalInd = i; 
      }
      let nextInd = (originalInd - 1) % 6;
      if (nextInd < 0) nextInd += 6;
      for (let i = 0; i < nextState.length; i++) {
        if (i === nextInd) nextState[i] = "B";
        else nextState[i] = null;
      }
      return nextState;
    default:
      return state;
  }
}

const initialQuizState = {
  current_quiz_loaded: false,
  quiz_id: "",
  question: "",
  answers: [
             {
               answer_id: "",
               text: "",
               selected: false,
             },
             {
               answer_id: "", 
               text: "",
               selected: false,
             },
           ],
} 
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
               current_quiz_loaded: true,
               ...action.payload,
               answers: [
                          { 
                            ...action.payload.answers[0],
                            selected: false,
                          },
                          {
                            ...action.payload.answers[1],
                            selected: false,
                          }
                        ]
             };
    case SET_SELECTED_ANSWER:
      const newAnswers = state.answers.map((x,idx) => {
        if (idx===action.payload) {
          x.selected = true;
        } else {
          x.selected = false;
        }
        return x;
      })
      return { 
               ...state,
               answers: newAnswers,
             }
    default:
      return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
               ...state,
               [action.payload.name]: action.payload.value,
             }
    case RESET_FORM:
      return {
               newQuestion: '',
               newTrueAnswer: '',
               newFalseAnswer: '',
             }
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })

export { initialQuizState };
