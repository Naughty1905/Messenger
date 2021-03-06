import React, { Suspense } from 'react';
// import ConversationList from '../ConversationList';
// import MessageList from '../MessageList';
import { isMobile } from 'react-device-detect';
import './MessengerBlack.css';
import Loader from '../Loader'
// import SidebarMenu from '../SidebarMenu';
import ContactList from '../ContactsList';
import { connect } from 'react-redux';
const ConversationList = React.lazy(() => import('../ConversationList'))
const MessageList = React.lazy(() => import('../MessageList'))
const SidebarMenu = React.lazy(() => import('../SidebarMenu'))



const Messenger = (props) => {
  const { isNav, isConversation, isContact, isChat } = props;

  if (isMobile) {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          {
            isNav && <Suspense fallback={<Loader />}><SidebarMenu /></Suspense>
          }
          {
            isConversation && <Suspense fallback={<Loader />}> <ConversationList /> </Suspense>
          }
          {
            isContact && <ContactList />
          }
          {
            isChat && <Suspense fallback={<Loader />}> <MessageList /></Suspense>
          }
        </div>
      </div >
    );
  }

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        {
          isNav && <Suspense fallback={<Loader />}><SidebarMenu /></Suspense>
        }
        {
          isConversation && <Suspense fallback={<Loader />}> <ConversationList /> </Suspense>
        }
        {
          isContact && <ContactList />
        }
      </div>

      <div className="scrollable content">
        <Suspense fallback={<Loader />}> <MessageList /></Suspense>
      </div>
    </div >
  );
}


const mapStateToProps = state => ({
  isNav: state.chatEnvReducer.isNav,
  isContact: state.chatEnvReducer.isContact,
  isConversation: state.chatEnvReducer.isConversation,
  isChat: state.chatEnvReducer.isChat
})

export default connect(mapStateToProps)(Messenger)
