import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Single from './templates/Single';
import Home from './templates/Home';

const App = () => {
  console.log(process.env);

  const testPath = '/' + process.env.REACT_APP_HOME.split('/').pop();
  const baseName =
    testPath.includes('.') || testPath.length === 0 ? '/' : testPath;

  return (
    <BrowserRouter basename={baseName}>
      <Switch>
        <Route path="/asdf" key="test">
          <Single />
        </Route>
        <Route path="/" key="home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
