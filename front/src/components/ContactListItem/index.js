import React, { useEffect } from 'react';
import shave from 'shave';
import { connect } from 'react-redux';
import { startChatReq } from '../../redux/actions/actions'

import './ContactListItem.css';

const ContactListItem = (props) => {

  const { startChatReq, isAuth } = props;

  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const { fullName, chat } = props.friend;

  const startChat = () => {
    startChatReq(chat, isAuth);
  }



  return (
    <div onClick={startChat} className="contact-list-item">
      <img className="contact-photo" src='https://firebasestorage.googleapis.com/v0/b/vue-elbrus-crm.appspot.com/o/avatar%2Fpetr.jpg?alt=media&token=2b1660a7-5133-411f-9da1-7012eeb2cecf' alt="contact" />
      <div className="contact-info">
        <h1 className="contact-title">{fullName}</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.isAuth
})


export default connect(mapStateToProps, { startChatReq })(ContactListItem)
