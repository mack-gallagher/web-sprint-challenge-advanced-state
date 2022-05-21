import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { message: state.infoMessage };
}

function Message(props) {
  const { message } = props;

  return <div id="message">{ message }</div>
}

export default connect(mapStateToProps)(Message);
