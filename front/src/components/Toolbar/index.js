import React from 'react';
import './ToolbarBlack.css';
import { connect } from 'react-redux'
import { setChat } from '../../redux/actions/chat-actions'
import { isMobile } from 'react-device-detect';

const Toolbar = (props) => {
  const { leftItems, rightItems, setChat } = props;

  const goBack = () => {
    // if ()
    //   isMobile && setChat()
  }
  return (
    <div className="toolbar">
      <div onClick={goBack} className="left-items">{leftItems}</div>
      <h1 className="toolbar-title">Messenger</h1>
      <div className="right-items">{rightItems}</div>
    </div>
  );
}

export default connect(null, { setChat })(Toolbar)
