import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Single from './templates/Single';
import Home from './templates/Home';

ReactDOM.render(
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
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
