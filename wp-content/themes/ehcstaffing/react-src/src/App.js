import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Single from './templates/Single';
import Home from './templates/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/asdf" key="test">
          <Single />
        </Route>
        <Route path="/what" key="what">
          <div>OH NO</div>
        </Route>
        <Route path="/" key="home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
