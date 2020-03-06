import React, { Component } from 'react';
import './dashboardPage.css'


class DashboardPage extends Component {
  state = {
    isReg: true
  }
  render() {
    return (
      <div className="auth-wrap">
        {
          this.state.isReg ?
            <form method="POST" className="form">
              <div className="wrap-input-auth" id="email">
                <input type="search" className="input-auth" placeholder='Email' />
              </div>
              <div className="wrap-input-auth" id="password">
                <input type="search" className="input-auth" placeholder='Password' />
              </div>
              <div id='buttons'>
                <button className='firstButt' type='submit'>Login
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                </button>
                <button className='secondButt' type='submit' onClick={(event) => { event.preventDefault(); this.setState({ isReg: false }) }}>Sign Up
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                </button>
              </div>
            </form> :
            <form method="POST" className="form">
              <div className="wrap-input-auth" id="email">
                <input autoFocus type="search" className="input-auth" placeholder='Email' />
              </div>
              <div className="wrap-input-auth" id="password">
                <input type="search" className="input-auth" placeholder='Password' />
              </div>
              <div className="wrap-input-auth" id="conpass">
                <input type="search" className="input-auth" placeholder='Confirm Password' />
              </div>
              <div id='buttons'>
                <button className='firstButt' type='submit'>Register
                </button>

                <button className='secondButt' type='submit' onClick={(event) => { event.preventDefault(); this.setState({ isReg: true }) }}>Sign In
                </button>
              </div>
            </form>
  }
      </div>
    );
  }
}

export default DashboardPage;
