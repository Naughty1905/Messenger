import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './registerPage.css'
import { registerUserAction } from '../../actions/authenticationActions';

class RegisterPage extends Component {
  onHandleRegistration = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name, email, password
    };

    this.props.dispatch(registerUserAction(data));
  }

  componentDidMount() {
    document.title = 'React Login';
  }

  render() {
    let message, isSuccess;

    if (this.props.response.register.hasOwnProperty('response')) {
      isSuccess = this.props.response.register.response.success;
      message = this.props.response.register.response.message;
    }
    
    return (
      // <div>
      //   <h3>RegisterPage</h3>
      //   {!isSuccess ? <div>{message}</div> : <Redirect to='login' />}
      //   <form onSubmit={this.onHandleRegistration}>
      //     <div>
      //       <label htmlFor="name">Name</label>
      //       <input type="text" name="name" id="name" />
      //     </div>
      //     <div>
      //       <label htmlFor="email">Email</label>
      //       <input type="email" name="email" id="email" />
      //     </div>
      //     <div>
      //       <label htmlFor="password">Password</label>
      //       <input type="password" name="password" id="password" />
      //     </div>
      //     <div>
      //       <button>Register</button>
      //     </div>
      //   </form>
      // </div>
      <form>
  <h1>Register Page</h1>
  <div class="inset">
  <p>
    <label for="email">EMAIL ADDRESS</label>
    <input type="text" name="email" id="email"/>
  </p>
  <p>
    <label for="name">NAME</label>
    <input type="text" name="name" id="name"/>
  </p>
  <p>
    <label for="password">PASSWORD</label>
    <input type="password" name="password" id="password"/>
  </p>
  </div>
  <p class="p-container">
    <input type="submit" name="go" id="go" value="Register"/>
  </p>
</form>
    )
  }
}

const mapStateToProps = (response) => ({
  response
});

export default connect(mapStateToProps)(RegisterPage);