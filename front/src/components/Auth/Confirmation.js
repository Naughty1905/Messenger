import './dashboardPage.css';
import React from 'react';
import { connect } from 'react-redux'

class Confirmation extends React.Component {

  render() {
    return (
      <div className="form">
        <h2 id="fullName" className="confirmReg">Confirm Registration</h2>
        <div id="email" className="choose">
          <div ><b>Name:</b> {this.props.signUpInfo.name}</div>
        </div>
        <div id="login" className="choose">
          <div><b>Email:</b> {this.props.signUpInfo.email}</div>
        </div>
        <div id="password">
          <div><img src={this.props.signUpInfo.avatar} /></div>
          <div className="avatarConf"><b>Avatar</b></div>
        </div>
        <div id='buttons' >
          <button className="firstButt" onClick={this.props.previousStep}>Back</button>
          <button className="secondButt" onClick={this.props.submitRegistration} style={{ fontSize: "0.8rem" }}>Submit Registration</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  signUpInfo: state.userReducer.signUpInfo,
})

export default connect(mapStateToProps)(Confirmation)
