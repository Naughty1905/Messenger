import React from 'react';
import Messenger from '../Messenger';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
 
const App = () => {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/" component={Messenger} />
      </Switch>
    </Router>
  );
}

export default App;
