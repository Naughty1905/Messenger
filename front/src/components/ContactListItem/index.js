import React, { useEffect } from 'react';
import shave from 'shave';
import { connect } from 'react-redux';
import { startChatReq } from '../../redux/actions/actions'

import './ContactListItem.css';

const ContactListItem = (props) => {

  const { startChatReq } = props;

  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const { photo, name } = props.data;
  const { _id, fullName, chat } = props.friend;

  const startChat = () => {
    startChatReq(chat);
  }



  return (
    <div onClick={startChat} className="contact-list-item">
      <img className="contact-photo" src={photo} alt="contact" />
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
