import React from 'react';
import './ComposeBlack.css';
import ToolbarButton from '../ToolbarButton';

export default function Compose(props) {
  return (
    <div className="compose">
      <input
        autoFocus
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />

      <div className='toolbar-input'>
        <ToolbarButton key="photo" icon="ion-ios-camera" />
        <ToolbarButton key="audio" icon="ion-ios-mic" />
        <ToolbarButton key="money" icon="ion-ios-card" />
      </div>

    </div>
  );
}
