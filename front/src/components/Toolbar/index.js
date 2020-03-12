import React from 'react';
import './ToolbarBlack.css';

export default function Toolbar(props) {
  const { leftItems, rightItems } = props;
  return (
    <div className="toolbar">
      <div className="left-items">{leftItems}</div>
      <h1 className="toolbar-title">Messenger</h1>
      <div className="right-items">{rightItems}</div>
    </div>
  );
}
