import React, { useState } from 'react';
import ToolbarButton from '../ToolbarButton';
import AudioTest from '../AudioTest'
import './ComposeBlack.css';

// Redux
import { connect } from 'react-redux';
import { getMessage } from '../../redux/actions/actions';

import speechRecognition from './SpeechRecognition';

const Compose = (props) => {
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = props;

  console.log(recording)

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
        <ToolbarButton startRecording={() => setRecording(true)} stopRecording={() => setRecording(false)} key="audio" icon="ion-ios-mic" />
        <ToolbarButton key="money" icon="ion-ios-card" />
        {
          recording && <AudioTest style={{ display: 'none' }} />
        }
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
