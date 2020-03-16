import React from 'react';

// Redux
import { connect } from 'react-redux';
import { setConversations } from '../../redux/actions/chat-env-actions';
import { startChatRec } from '../../redux/actions/chat-actions';

// Styles
import './ContactListItem.css';

const ContactListItem = (props) => {

  const { startChatRec, setConversations } = props;

  const { fullName, chat, friendId } = props.friend;

  const startChat = () => {
    startChatRec(chat);
    setConversations()
  }


  return (
    <div onClick={startChat} className="contact-list-item">
      <img className="contact-photo" src={friendId.avatar} alt="contact" />
      <div className="contact-info">
        <h1 className="contact-title">{fullName}</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth
})


export default connect(mapStateToProps, { startChatRec, setConversations })(ContactListItem)
