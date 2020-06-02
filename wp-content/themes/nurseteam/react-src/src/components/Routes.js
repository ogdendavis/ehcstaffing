import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Page templates
import Home from '../templates/Home';
import About from '../templates/About';
import BlogArchive from '../templates/BlogArchive';
import BlogSingle from '../templates/BlogSingle';
import Contact from '../templates/Contact';
import JobArchive from '../templates/JobArchive';
import FourOhFour from '../templates/404';

const Routes = () => (
  <Switch>
    {/* Remember that routes should go from most to least specific */}
    <Route path="/about" key="about_route" component={About} />
    <Route
      path="/articles/:id"
      key="blog_single_route"
      component={BlogSingle}
    />
    <Route path="/articles" key="blog_archive_route" component={BlogArchive} />
    <Route path="/contact" key="contact_route" component={Contact} />
    <Route path="/jobs" key="job_archive_route" component={JobArchive} />
    <Route exact path="/" key="home" component={Home} />
    <Route key="404_route" component={FourOhFour} />
  </Switch>
);

export default Routes;
