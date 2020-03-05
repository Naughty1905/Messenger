import React, { Component } from 'react';
import './dashboardPage.css'
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';


class DashboardPage extends Component {
  state = {
    flag:  true
  }
  render() {
    return (
      <div className='dashboardContainer'>
        {
          this.state.flag ? 
          <LoginPage /> :
        <RegisterPage /> 
        } 
        <div>
        <button onClick={()=> this.setState({flag: true})}>Sign In</button> 
        <button onClick={()=> this.setState({flag:false})}>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default DashboardPage;