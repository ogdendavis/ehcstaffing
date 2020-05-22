import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';

const App = () => {
  const testPath = '/' + process.env.REACT_APP_HOME.split('/').pop();
  const baseName =
    testPath.includes('.') || testPath.length === 0 ? '/' : testPath;

  return (
    <BrowserRouter basename={baseName}>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
