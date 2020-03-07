import React, { useState } from 'react';
import { connect } from 'react-redux'
import { regNewUserReq, loginReq } from '../../redux/actions/actions'
import './dashboardPage.css'


const DashboardPage = (props) => {
  const [isReg, setIsReg] = useState(false);

  const { regNewUserReq, loginReq } = props;


  const loginHandler = (event) => {
    event.preventDefault();
    const login = event.target.login.value;
    const password = event.target.password.value;

    loginReq(login, password)
  }

  const regHandler = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const conpass = event.target.conpass.value;

    if (password !== conpass) {
      return;
    }

    const login = event.target.login.value;
    const email = event.target.email.value;
    const fullName = event.target.fullName.value;

    regNewUserReq(login, fullName, email, password)
  }

  return (
    <div className="auth-wrap">
      {
        !isReg ?
          <form onSubmit={loginHandler} method="POST" className="form">
            <div className="wrap-input-auth" id="login">
              <input name='login' type="search" className="input-auth" placeholder='Login' />
            </div>
            <div className="wrap-input-auth" id="password">
              <input name='password' type="password" className="input-auth" placeholder='Password' />
            </div>
            <div id='buttons' style={{ gridRowStart: '6' }}>
              <button className='firstButt' type='submit'>Login
                </button>
              <button className='secondButt' type='submit' onClick={(event) => { event.preventDefault(); setIsReg(true) }}>Sign Up
                </button>
            </div>
          </form> :
          <form onSubmit={regHandler} method="POST" className="form">
            <div className="wrap-input-auth" id="fullName">
              <input name='fullName' type="search" className="input-auth" placeholder='Full Name' />
            </div>
            <div className="wrap-input-auth" id="email">
              <input name='email' type="search" className="input-auth" placeholder='Email' />
            </div>
            <div className="wrap-input-auth" id="login">
              <input name='login' type="search" className="input-auth" placeholder='Login' />
            </div>
            <div className="wrap-input-auth" id="password">
              <input name='password' type="password" className="input-auth" placeholder='Password' />
            </div>
            <div className="wrap-input-auth" id="conpass">
              <input name='conpass' type="password" className="input-auth" placeholder='Confirm Password' />
            </div>
            <div id='buttons'>
              <button className='firstButt' type='submit'>Register
                </button>

              <button className='secondButt' type='submit' onClick={(event) => { event.preventDefault(); setIsReg(false) }}>Sign In
                </button>
            </div>
          </form>
      }
    </div>
  );
}

export default connect(null, { regNewUserReq, loginReq })(DashboardPage);
