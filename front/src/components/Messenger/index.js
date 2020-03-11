import React from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './MessengerBlack.css';
import SidebarMenu from '../SidebarMenu';
import ContactList from '../ContactsList';
import { connect } from 'react-redux';

const Messenger = (props) => {
  const { isNav, isConversation, isContact } = props;

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        {
          isNav && <SidebarMenu />
        }
        {
          isConversation && <ConversationList />
        }
        {
          isContact && <ContactList />
        }
      </div>

      <div className="scrollable content">
        <MessageList />
      </div>
    </div>
  );
}


const mapStateToProps = state => ({
  isNav: state.chatEnvReducer.isNav,
  isContact: state.chatEnvReducer.isContact,
  isConversation: state.chatEnvReducer.isConversation
})

export default connect(mapStateToProps)(Messenger)
