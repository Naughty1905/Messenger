import React, { useEffect, useRef } from 'react';
import shave from 'shave';
import { connect } from 'react-redux';
import { startChatReq } from '../../redux/actions/actions'

import './ConversationListItemBlack.css';

const ConversationListItem = (props) => {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const chatItem = useRef(null);
  const { startChatReq, currentChat, isAuth } = props;
  const { _id, members, messages } = props.chat;

  console.log(members);

  const chat = _id;

  const startChat = () => {
    startChatReq(chat, isAuth);
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
      <img className="conversation-photo" src={members[0].avatar} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{members[0]['name']}</h1>
        {
          messages.length &&
          <p className="conversation-snippet">{
            messages[messages.length - 1].messageType === 'Audio' ? 'Audio message' :
              messages[messages.length - 1].messageType === 'String' ?
                messages[messages.length - 1].content : "There's no messages yeat..."
          }</p>
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
  currentChat: state.chatReducer.chat
})


export default connect(mapStateToProps, { startChatReq })(ConversationListItem)
