import React from 'react';
import { connect } from 'react-redux';
import './ToolbarButtonBlack.css';
import { setSidebar, setConversations, setContacts, setModalAddContact } from '../../redux/actions/actions';

const ToolbarButton = (props) => {
  const { setSidebar, isNav, isConversation, setConversations, setModalAddContact, startRecording, stopRecording } = props;


  const showBtn = (event) => {
    const btnName = event.target.className;
    if (btnName === 'toolbar-button ion-ios-cog') {
      if (!isNav && !isConversation) {
        setConversations()
      } else {
        setSidebar()
      }
    } else if (btnName === 'toolbar-button ion-ios-add-circle-outline') {
      setModalAddContact()
    }
  }



  const { icon } = props;
  return (
    <i onMouseDown={startRecording} onMouseUp={stopRecording} onClick={showBtn} className={`toolbar-button ${icon}`} />
  );
}


const mapStateToProps = state => ({
  isNav: state.chatEnvReducer.isNav,
  isConversation: state.chatEnvReducer.isConversation
})


export default connect(mapStateToProps, { setSidebar, setConversations, setContacts, setModalAddContact })(ToolbarButton)
