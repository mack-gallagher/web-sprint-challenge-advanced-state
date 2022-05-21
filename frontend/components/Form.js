import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const { form, dispatch, inputChange, postQuiz } = props;

  const onChange = (name,evt) => {
    inputChange(name,evt.target.value);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    console.log('value 1: ',evt.target['0'].value);
    console.log('value 2: '+evt.target['1'].value);
    console.log('value 3: '+evt.target['2'].value);
    postQuiz(evt.target['0'].value,evt.target['1'].value,evt.target['2'].value);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={e => onChange('newQuestion',e)} id="newQuestion" placeholder="Enter question"
        value={ form.newQuestion }
      />
      <input maxLength={50} onChange={e => onChange('newTrueAnswer',e)} id="newTrueAnswer" placeholder="Enter true answer"
        value={ form.newTrueAnswer }
      />
      <input maxLength={50} onChange={e => onChange('newFalseAnswer',e)} id="newFalseAnswer" placeholder="Enter false answer"
        value={ form.newFalseAnswer }
      />
      <button 
        id="submitNewQuizBtn"
        disabled={ form.newQuestion.trim().length<=1 
                   || form.newTrueAnswer.trim().length<=1 
                   || form.newFalseAnswer.trim().length<=1
                 }
      >Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
