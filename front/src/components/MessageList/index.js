import React, { useEffect } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// Server connection
import io from 'socket.io-client';
import queryString from 'query-string';

// Styles
import './MessageList.css';

// Ations
import {
  ENDPOINT,
  JOIN,
  DISCONNECT,
  MESSEGE
} from '../../Socket-client/socket-actions';

// Sockets 
let socket;

const MessageList = props => {


  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(JOIN, { name: 'EVA' }, () => {

    });

    socket.emit(MESSEGE, { messege : props.message }, () => {

    });

    return () => {
      socket.emit(DISCONNECT);
      socket.off();
    }
  })



  return (
    <div className="message-list">
      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />
        ]}
      />

      <div className="message-list-container">
        {

        }
      </div>

      <Compose rightItems={[
        <ToolbarButton key="photo" icon="ion-ios-camera" />,
        <ToolbarButton key="image" icon="ion-ios-image" />,
        <ToolbarButton key="audio" icon="ion-ios-mic" />,
        <ToolbarButton key="money" icon="ion-ios-card" />,
        <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
        <ToolbarButton key="emoji" icon="ion-ios-happy" />
      ]} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    message: state.messege
  }
}

export default connect(
  mapStateToProps,
)(MessageList)  
