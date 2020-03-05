import React from 'react';
import { connect } from 'react-redux'
import './ToolbarButtonBlack.css';
import { setSidebar, setConversations, setContacts } from '../../redux/actions/actions'



const ToolbarButton = (props) => {

  const { setSidebar, isNav, isConversation, setConversations, setContacts } = props;

  const showBtn = (event) => {
    const btnName = event.target.className;
    if (btnName == 'toolbar-button ion-ios-cog') {
      if (!isNav && !isConversation) {
        setConversations()
      } else {
        setSidebar()
      }
    } else if (btnName == 'toolbar-button ion-ios-add-circle-outline') {
      setContacts()
    }
  }


  const { icon } = props;
  return (
    <i onClick={showBtn} className={`toolbar-button ${icon}`} />
  );
}


const mapStateToProps = state => ({
  isNav: state.isNav,
  isConversation: state.isConversation
})


export default connect(mapStateToProps, { setSidebar, setConversations, setContacts })(ToolbarButton)
