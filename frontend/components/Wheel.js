import React from 'react'

import Redux from 'redux';
import { connect } from 'react-redux';

import { MOVE_CLOCKWISE,
         MOVE_COUNTERCLOCKWISE } from '../state/action-types';

import { moveClockwise,
         moveCounterClockwise } from '../state/action-creators';

const mapStateToProps = state => {
  return {
           wheel: state.wheel,
         };
}

function Wheel(props) {

  const { wheel, dispatch } = props;

  const wheelClasses = wheel.map(x => {
    let secondClass = "";
    if (x === "B") secondClass += " active";
    return "cog"+secondClass;
  });

  return (
    <div id="wrapper"> <div id="wheel">
        <div className={ wheelClasses[0] } style={{ "--i": 0 }}>{ wheel[0]?"B":"" }</div>
        <div className={ wheelClasses[1] } style={{ "--i": 1 }}>{ wheel[1]?"B":"" }</div>
        <div className={ wheelClasses[2] } style={{ "--i": 2 }}>{ wheel[2]?"B":"" }</div>
        <div className={ wheelClasses[3] } style={{ "--i": 3 }}>{ wheel[3]?"B":"" }</div>
        <div className={ wheelClasses[4] } style={{ "--i": 4 }}>{ wheel[4]?"B":"" }</div>
        <div className={ wheelClasses[5] } style={{ "--i": 5 }}>{ wheel[5]?"B":"" }</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button 
          id="counterClockwiseBtn"
          onClick={ () => dispatch(moveCounterClockwise()) }
        >
          Counter clockwise
        </button>
        <button 
          id="clockwiseBtn"
          onClick={ () => dispatch(moveClockwise()) }
        >
          Clockwise
        </button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Wheel);
