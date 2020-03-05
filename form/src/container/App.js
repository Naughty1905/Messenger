import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginPage from '../components/LoginPage/LoginPage';
import RegisterPage from '../components/RegisterPage/RegisterPage';
import DashboardPage from '../components/Dashboard/DashboardPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* <Route path='/' exact={true} component={LoginPage} /> */}
            <Route path='/dashboard' component={DashboardPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;