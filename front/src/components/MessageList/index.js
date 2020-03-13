import React, { useEffect, useRef } from 'react';


//Modules
import { keys } from 'lodash'
import { database } from '../../Firebase';

// Components
import ToolbarButton from '../ToolbarButton';
import Compose from '../Compose';
import Toolbar from '../Toolbar';

// Redux
import { connect } from 'react-redux';

//Redux actions
import { startChat } from '../../redux/actions/chat-actions';
import { setMessages } from '../../redux/actions/users-actions';

// Styles
import './MessageList.css';

//Functions
import renderMessages from './renderMessage';
const MessageList = props => {
  const { message, messages, user, chats, chat, setMessages, isAvailableToWrite, startChat } = props;

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" })
  }
  useEffect(() => {
    if (!!message.content) {
      const chatRef = database.ref(`chats/${chat}`)
      chatRef.push(message)
    }
  }, [message])

  useEffect(() => {
    if (chat) {
      const messages = chats[chat]['messages'];
      const keysOfMessages = keys(messages);
      const unreadMessages = keysOfMessages.reverse().filter(key => !messages[key].isSeen && messages[key].user !== user);
      unreadMessages.map(unreadMessage => {
        messages[unreadMessage].isSeen = true;
       return database.ref(`chats/${chat}/${unreadMessage}`).update(messages[unreadMessage]);
      })
      startChat(chat)
      setMessages(messages)
    }
  }, [chat, message, chats])

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
      <div className="messages-bottom" ref={messagesEndRef} style={{ marginBottom: '40px' }} />
      <>
        {
          isAvailableToWrite && <Compose rightItems={[
            <ToolbarButton key="photo" icon="ion-ios-camera" />,
            <ToolbarButton key="image" icon="ion-ios-image" />,
            <ToolbarButton key="audio" icon="ion-ios-mic" />,
            <ToolbarButton key="money" icon="ion-ios-card" />,
            <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
            <ToolbarButton key="emoji" icon="ion-ios-happy" />
          ]} />
        }
      </>
    </div >
  );
}
const mapStateToProps = state => {
  return {
    message: state.chatReducer.message,
    messages: state.chatReducer.messages,
    user: state.userReducer.user,
    chat: state.chatReducer.chat,
    isAuth: state.userReducer.isAuth,
    chats: state.chatReducer.chats,
    isAvailableToWrite: state.chatEnvReducer.isAvailableToWrite
  }
}
export default connect(
  mapStateToProps,
  {
    setMessages,
    startChat
  }
)(MessageList)  
