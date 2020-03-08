import React, { useEffect, useCallback, useRef } from 'react';
import shave from 'shave';
import { connect } from 'react-redux';
import { startChatReq } from '../../redux/actions/actions'

import './ConversationListItemBlack.css';

const ConversationListItem = (props) => {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const chatItem = useRef(null);
  const { startChatReq, currentChat } = props;
  const { photo, name, text } = props.data;
  const { _id, members, messages } = props.chat;

  const chat = _id;

  const startChat = () => {
    startChatReq(chat);
  }

  useEffect(() => {
    if (_id === currentChat) {
      chatItem.current.className = 'conversation-list-item active-item';
    } else {
      chatItem.current.className = 'conversation-list-item';
    }
  }, [currentChat])

  return (
    <div ref={chatItem} onClick={startChat}>
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{members}</h1>
        <p className="conversation-snippet">{messages[messages.length - 1].content || "There's no messages yeat..."}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.isAuth,
  currentChat: state.chat
})


export default connect(mapStateToProps, { startChatReq })(ConversationListItem)
