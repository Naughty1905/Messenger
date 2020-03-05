import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './loginPage.css'

import { loginUserAction } from '../../actions/authenticationActions';
import { setCookie } from '../../utils/cookies';

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    this.props.dispatch(loginUserAction(data));
  }

  componentDidMount() {
    document.title = 'React Login';
  }

  render() {
    let isSuccess, message;

    if (this.props.response.login.hasOwnProperty('response')) {
      isSuccess = this.props.response.login.response.success;
      message = this.props.response.login.response.message;

      if (isSuccess) {
        setCookie('token', this.props.response.login.response.token, 1);
      }
    }

    return (
      // <div className='container'>
      //   <h3 >Login Page</h3>
      //   {!isSuccess ? <div>{message}</div> : <Redirect to='dashboard' />}
      //   <form onSubmit={this.onHandleLogin}>
      //     <div className="dws-input">
      //       <label htmlFor="email">Email</label>
      //       <input type="email" name="email" id="email" />
      //     </div>
      //     <div className="dws-input">
      //       <label htmlFor="password">Password</label>
      //       <input type="password" name="password" id="password" />
      //     </div>
      //     <div>
      //       <button>Login</button>
      //     </div>
      //   </form>

      // </div>
      <form>
        <h1>Login Page</h1>
        <div class="inset">
          <p>
            <label for="email">EMAIL ADDRESS</label>
            <input type="text" name="email" id="email" />
  </p>
            <p>
              <label for="password">PASSWORD</label>
              <input type="password" name="password" id="password" />
  </p>
  </div>
              <p class="p-container">
                <input type="submit" name="go" id="go" value="Log in" />
  </p>
</form>
              );
            }
          }
          
const mapStateToProps = (response) => ({response});
              
export default connect(mapStateToProps)(LoginPage);