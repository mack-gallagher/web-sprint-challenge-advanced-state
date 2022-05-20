// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'

import {
         MOVE_CLOCKWISE,
         MOVE_COUNTERCLOCKWISE
       } from './action-types';

const initialWheelState = [null,null,"B",null,null,null];
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

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
