import React, { useState } from 'react';

// Components
import ToolbarButton from '../ToolbarButton';
import SpeechRecognition from '../SpeechRecognition/index';

// Styles
import './ComposeBlack.css';

// Redux
import { connect } from 'react-redux';
import { getMessage } from '../../redux/actions/users-actions';

const Compose = (props) => {
  const [recording, setRecording] = useState(false);
  const [content, setMessage] = useState('');
  const { user } = props;

  const messegeHandler = (event) => {
    event.preventDefault();
    if (!content) return
    props.getMessage({ content, user, messageType: 'String' });

    setMessage('');
  }

  return (
    <div className="compose">
      <input
        autoFocus
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        value={content}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => { event.key === 'Enter' && messegeHandler(event) }}
      />

      <div className='toolbar-input'>
        <ToolbarButton key="photo" icon="ion-ios-camera" />
        <ToolbarButton startRecording={() => setRecording(true)} stopRecording={() => setRecording(false)} key="audio" icon="ion-ios-mic" />
        <ToolbarButton key="money" icon="ion-ios-card" />
        {
          recording && <SpeechRecognition style={{ display: 'none' }} />
        }
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  }
}

export default connect(
  mapStateToProps,
  { getMessage }
)(Compose)
