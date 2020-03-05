import React from 'react';
import { connect } from 'react-redux'
import './ToolbarButtonBlack.css';
import { setSidebar } from '../../redux/actions/actions'



const ToolbarButton = (props) => {

  const { setSidebar } = props;

  const showBtn = (event) => {
    const btnName = event.target.className;
    if (btnName === 'toolbar-button ion-ios-cog') {
      setSidebar()
    }
  }


  const { icon } = props;
  return (
    <i onClick={showBtn} className={`toolbar-button ${icon}`} />
  );
}



export default connect(null, { setSidebar })(ToolbarButton)
