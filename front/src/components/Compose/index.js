import React, { useState } from 'react';
import ToolbarButton from '../ToolbarButton';
import './ComposeBlack.css';

// Redux
import { connect } from 'react-redux';
import { getMessage } from '../../redux/actions/actions';

const Compose = (props) => {
  const [message, setMessage] = useState('');
  const { user } = props;

  const messegeHandler = (event) => {
    event.preventDefault();
    if (!message) return
    props.getMessage({ message, user });

    setMessage('');
  }

  return (
    <div className="compose">
      <input
        autoFocus
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => { event.key === 'Enter' && messegeHandler(event) }}
      />

      <div className='toolbar-input'>
        <ToolbarButton key="photo" icon="ion-ios-camera" />
        <ToolbarButton key="audio" icon="ion-ios-mic" />
        <ToolbarButton key="money" icon="ion-ios-card" />
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { getMessage }
)(Compose)
