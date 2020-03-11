import React, { useEffect, useRef } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import { database } from '../../Firebase';
import ToolbarButton from '../ToolbarButton';

// Redux
import { connect } from 'react-redux';

//Redux actions
import { setMessages } from '../../redux/actions/actions';

// Server connection
import io from 'socket.io-client';
// import queryString from 'query-string';

// Styles
import './MessageList.css';

// Ations
import {
  ENDPOINT,
  JOIN,
  DISCONNECT,
  MESSAGE,
  SEND_MESSAGE,
  // CHECK_READ_MESSAGE
} from '../../Socket-client/socket-actions';

//Functions
import renderMessages from './renderMessage';

// Sockets 
let socket;

const MessageList = props => {
  const { message, messages, user, chat, isAuth } = props;
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {

    if (!!message.content) {
      debugger
      const chatRef = database.ref(`chats/${chat}`);
      chatRef.push(message)
    }

    socket = io(ENDPOINT);

    socket.emit(JOIN, { user, chat }, () => {

    });
    socket.emit(MESSAGE + chat, { message }, () => {

    });

    // socket.emit(CHECK_READ_MESSAGE + chat, { chat, isAuth }, () => { })

    socket.on(SEND_MESSAGE + chat, ({ message }, callback) => {
      props.setMessages(message);
    })

    return () => {
      socket.emit(DISCONNECT);
      socket.off();
    }
  }, [message])


  useEffect(() => {
    if (chat) {
      const chatRef = database.ref(`chats/${chat}`);
      debugger
      chatRef.on('value', snapshot => {
        debugger
        const getChats = snapshot.val();
        debugger
        const messages = Object.values(getChats)
        props.setMessages(messages)
      })
    }
  }, [chat])

  useEffect(scrollToBottom, [messages]);


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
      {
        renderMessages(messages, user)
      }
      {/* {
        !!audios.length && audios.map(audio => <audio controls="controls" src={audio} />)

      } */}
      <div className="messages-bottom" ref={messagesEndRef} style={{ marginBottom: '40px' }} />

      <Compose rightItems={[
        <ToolbarButton key="photo" icon="ion-ios-camera" />,
        <ToolbarButton key="image" icon="ion-ios-image" />,
        <ToolbarButton key="audio" icon="ion-ios-mic" />,
        <ToolbarButton key="money" icon="ion-ios-card" />,
        <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
        <ToolbarButton key="emoji" icon="ion-ios-happy" />
      ]} />
    </div >
  );
}

const mapStateToProps = state => {
  return {
    message: state.chatReducer.message,
    messages: state.chatReducer.messages,
    user: state.userReducer.user,
    chat: state.chatReducer.chat,
    isAuth: state.userReducer.isAuth
  }
}

export default connect(
  mapStateToProps,
  { setMessages }
)(MessageList)  
