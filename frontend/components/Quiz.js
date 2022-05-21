import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import {
         SET_QUIZ_INTO_STATE,
         SET_SELECTED_ANSWER
       } from '../state/action-types';

import {
         setQuiz,
         selectAnswer,
         fetchQuiz,
         postAnswer,
         postQuiz,
       } from '../state/action-creators';

const mapStateToProps = state => {
  return {
           quiz: state.quiz,
         }
}

function Quiz(props) {

  const loadNextQuiz = () => {
    if (!quiz.current_quiz_loaded) dispatch(fetchQuiz())
  }

  useEffect(loadNextQuiz,[])

  const { quiz, dispatch } = props;

  const answerClassNames = quiz.answers.map(x => {
    let extraClass = '';
    if (x.selected) extraClass += " selected";
    return "answer"+extraClass;
  })

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz.current_quiz_loaded ? (
          <>
            <h2>{ quiz.question }</h2>

            <div id="quizAnswers">
              <div className={answerClassNames[0]}>
                { quiz.answers[0].text }
                <button onClick={ () => dispatch(selectAnswer(0)) }>
                  { quiz.answers[0].selected?"SELECTED":"SELECT" }                  
                </button>
              </div>

              <div className={answerClassNames[1]}>
                { quiz.answers[1].text }
                <button onClick={ () => dispatch(selectAnswer(1)) }>
                  { quiz.answers[1].selected?"SELECTED":"SELECT" }
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn"
              disabled={quiz.answers.filter(x => x.selected === true).length===0}
              onClick={() => dispatch(postAnswer(quiz.quiz_id,quiz.answers.filter(x=>x.selected===true)[0].answer_id))} 
            >
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(mapStateToProps)(Quiz);
