import React from 'react';
import Messenger from '../Messenger';
import DashboardPage from '../Auth/DashboardPage';
import AddContact from '../Modals/AddContact'
import { connect } from 'react-redux'


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = (props) => {
  const { isModalAddContact } = props;

  return (
    <Router className="App">
      {isModalAddContact && <AddContact />}
      <Switch>
        <Route exact path="/" component={Messenger} />
        <Route path='/auth' component={DashboardPage} />
      </Switch>
    </Router>
  );
}


const mapStateToProps = state => ({
  isModalAddContact: state.isModalAddContact
})

export default connect(mapStateToProps)(App);
