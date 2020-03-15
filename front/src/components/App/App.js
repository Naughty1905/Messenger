import React from 'react';
import Messenger from '../Messenger';
import DashboardPage from '../Auth/DashboardPage';
import AddContact from '../Modals/AddContact';
import Tooltip from '../Utils/Tooltip'
import { connect } from 'react-redux';


import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App = (props) => {

  const { isModalAddContact, isAuth, isAuthError } = props;
  return (
    <Router className="App">
      {isAuthError && <Tooltip />}
      {isModalAddContact && <AddContact />}
      <Switch>
        {
          !isAuth &&
          <>
            <Route path='/auth' component={DashboardPage} />
            <Redirect to="/auth" />
          </>
        }
        {
          isAuth &&
          <>
            <Switch >
              <Route exact path="/" component={Messenger} />
              <Redirect to="/" />
            </Switch>
          </>
        }
      </Switch>
    </Router>
  );
}


const mapStateToProps = state => ({
  isModalAddContact: state.chatEnvReducer.isModalAddContact,
  isAuth: state.userReducer.isAuth,
  isAuthError: state.userReducer.isAuthError
})

export default connect(mapStateToProps)(App);
