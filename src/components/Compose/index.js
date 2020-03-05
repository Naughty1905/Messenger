import React from 'react';
import './ComposeBlack.css';

export default function Compose(props) {
  return (
    <div className="compose">
      <input
        autoFocus
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />

      {
        props.rightItems
      }
    </div>
  );
}
