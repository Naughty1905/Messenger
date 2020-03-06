import React, { Component } from 'react';
import './dashboardPage.css'


class DashboardPage extends Component {
  state = {
    isReg: true
  }
  render() {
    return (
      <div className="auth-wrap">
        <form method="POST" className="form">
          <div className="wrap-input-auth" id="login">
            <input type="search" className="input-auth" placeholder='Login' />
          </div>
          <div className="wrap-input-auth" id="email">
            <input type="search" className="input-auth" placeholder='Email' />
          </div>
          <div className="wrap-input-auth" id="password">
            <input type="search" className="input-auth" placeholder='Password' />
          </div>
          <div id='buttons'>
            <button type='submit'>Submit</button>
            <button type='submit'>Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default DashboardPage;
