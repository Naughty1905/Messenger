import React, { useState, useEffect } from 'react';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import './SidebarMenu.css'


export default function SidebarMenu(props) {


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
      <ul className="sideBar" active={false}>
        <li className='menu'><i className='ion-md-person' /> <span>Contacts</span></li>
        <li className='menu'><i className='ion-ios-call' /> <span>Calls</span> </li>
        <li className='menu'><i className='ion-md-people' />
          <span className='fixAnimation'>
            <p style={{ marginRight: '4px' }}>New</p><p>Group</p>
          </span>
        </li>
        <li className='menu'><i className='ion-md-settings' /> <span>Settings</span> </li>
      </ul>
    </div>
  );
}
