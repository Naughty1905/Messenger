import React from 'react';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { setContacts } from '../../redux/actions/chat-env-actions'
import './SidebarMenu.css'


const SidebarMenu = (props) => {

  const { setContacts, history } = props;

  const changeSidebar = (event) => {
    event.stopPropagation();
    const { currentTarget } = event;
    const { title } = currentTarget;
    if (title === 'contacts') {
      setContacts()
    }
  }

  const logOut = (event) => {
    event.stopPropagation();
    localStorage.removeItem('token')
    localStorage.removeItem('user');
    window.location = '/auth';
  }

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      <ul className="sideBar" >
        <li title='contacts' onClick={changeSidebar} className='menu'><i className='ion-md-person' /> <span>Contacts</span></li>
        <li title='calls' className='menu'><i className='ion-ios-call' /> <span>Calls</span> </li>
        <li title='newgroup' className='menu'><i className='ion-md-people' /><span className='fixAnimation'>New Group </span></li>
        <li title='settings' className='menu'><i className='ion-md-settings' /> <span>Settings</span> </li>
        <li onClick={logOut} title='settings' className='menu'><i className='ion-md-exit' /> <span>Logout</span> </li>

      </ul>
    </div>
  );
}



// export default connect(null, { setContacts })(withRouter(SidebarMenu));

export default compose(
  withRouter,
  connect(null, { setContacts })
)(SidebarMenu);
