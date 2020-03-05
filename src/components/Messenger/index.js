import React from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import SidebarMenu from '../SidebarMenu';
import './MessengerBlack.css';
import { connect } from 'react-redux'

const Messenger = (props) => {
  const { isNav } = props;


  return (
    <div className="messenger">

      <div className="scrollable sidebar">
        {
          isNav ? (<SidebarMenu />) : (<ConversationList />)
        }
      </div>

      <div className="scrollable content">
        <MessageList />
      </div>
    </div>
  );
}



const mapStateToProps = state => ({
  isNav: state.isNav
})


export default connect(mapStateToProps)(Messenger)
