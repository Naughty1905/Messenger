import React, { useState, useEffect } from 'react';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { connect } from 'react-redux'
import { setContacts } from '../../redux/actions/actions'
import './SidebarMenu.css'


const SidebarMenu = (props) => {

  const { setContacts } = props;

  const changeSidebar = (event) => {
    event.stopPropagation();
    const { currentTarget } = event;
    const { title } = currentTarget;
    if (title == 'contacts') {
      setContacts()
    }
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
      </ul>
    </div>
  );
}



export default connect(null, { setContacts })(SidebarMenu);
