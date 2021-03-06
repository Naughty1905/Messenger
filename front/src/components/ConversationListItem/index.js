import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { keys, last, isEmpty } from 'lodash'
import { startChatRec, setChat } from '../../redux/actions/chat-actions'
import { isMobile } from 'react-device-detect';

import './ConversationListItemBlack.css';

const ConversationListItem = (props) => {

  const chatItem = useRef(null);
  const { startChatRec, currentChat, chats, user, setChat } = props;

  const { _id } = props.chat;

  const chat = _id;
  const { messages, members } = chats[chat];
  const keysOfMessages = keys(messages);
  const unreadMessages = keysOfMessages.filter(key => !messages[key].isSeen && messages[key].user !== user).length
  const { messageType, content } = messages[last(keysOfMessages)]

  const startChat = () => {
    startChatRec(chat);
    if (isMobile) {
      setChat()
    }
  }

  useEffect(() => {
    if (_id === currentChat) {
      chatItem.current.className = 'conversation-list-item active-item';
    } else {
      chatItem.current.className = 'conversation-list-item';
    }
  })


  return (
    <div className="conversation-body" ref={chatItem} onClick={startChat}>
      <img className="conversation-photo" src={members[0].avatar} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{members[0].name}</h1>
        {
          !isEmpty(messages) &&
          <p className="conversation-snippet">{
            messageType === 'Audio' ? 'Audio message' :
              messageType === 'String' ? content :
                "There's no messages yeat..."
          }</p>
        }
      </div>
      {
        !!unreadMessages && <div className="unreadMessages">{unreadMessages}</div>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
  currentChat: state.chatReducer.chat,
  chats: state.chatReducer.chats,
  user: state.userReducer.user
})




export default connect(mapStateToProps, { startChatRec, setChat })(ConversationListItem)
