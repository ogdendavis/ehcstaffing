import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Page templates
import Home from './templates/Home';
import About from './templates/About';
import BlogArchive from './templates/BlogArchive';
import BlogSingle from './templates/BlogSingle';
import Contact from './templates/Contact';
import JobArchive from './templates/JobArchive';
import JobSingle from './templates/JobSingle';
import FourOhFour from './templates/404';

// Components
import Header from './components/Header';

const App = () => {
  const testPath = '/' + process.env.REACT_APP_HOME.split('/').pop();
  const baseName =
    testPath.includes('.') || testPath.length === 0 ? '/' : testPath;

  return (
    <BrowserRouter basename={baseName}>
      <Header />
      <Switch>
        {/* Remember that routes should go from most to least specific */}
        <Route path="/about" key="about_route">
          <About />
        </Route>
        <Route path="/blog/:id" key="blog_single_route">
          <BlogSingle />
        </Route>
        <Route path="/blog" key="blog_archive_route">
          <BlogArchive />
        </Route>
        <Route path="/contact" key="contact_route">
          <Contact />
        </Route>
        <Route path="/jobs/:id" key="job_single_route">
          <JobSingle />
        </Route>
        <Route path="/jobs" key="job_archive_route">
          <JobArchive />
        </Route>
        <Route exact path="/" key="home">
          <Home />
        </Route>
        <Route key="404_route">
          <FourOhFour />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
