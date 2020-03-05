import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Layouts
import Chat from './Scense/layouts/Chat'

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path='/' component={Authentification} /> */}
        <Route path='/chat' component={Chat} />
      </Switch>
    </Router>
  )
}

export default App;
