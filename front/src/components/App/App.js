import React from 'react';
import Messenger from '../Messenger';
import DashboardPage from '../Auth/DashboardPage';
import AddContact from '../Modals/AddContact'
import { connect } from 'react-redux'


import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const App = (props) => {
  const { isModalAddContact, isAuth } = props;


  return (
    <Router className="App">
      {isModalAddContact && <AddContact />}
      <Switch>
        {
          !isAuth && <> <Route path='/auth' component={DashboardPage} />
            <Redirect to="/auth" /> </>
        }
        {
          isAuth && <> <Route exact path="/" component={Messenger} />
            <Redirect to="/" /> </>
        }
      </Switch>
    </Router>
  );
}


const mapStateToProps = state => ({
  isModalAddContact: state.isModalAddContact,
  isAuth: state.isAuth,
})

export default connect(mapStateToProps)(App);
