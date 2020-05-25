import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

// Page templates
import Home from '../templates/Home';
import About from '../templates/About';
import BlogArchive from '../templates/BlogArchive';
import BlogSingle from '../templates/BlogSingle';
import Contact from '../templates/Contact';
import JobArchive from '../templates/JobArchive';
import JobSingle from '../templates/JobSingle';
import FourOhFour from '../templates/404';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.primaryColor};
  margin-bottom: ${props => props.theme.footerHeight};
  min-height: 100vh;
  z-index: 10;
  background: ${props => props.theme.bgColor};
`;

const Layout = () => {
  return (
    <>
      <PageContainer>
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
      </PageContainer>
      <Footer />
    </>
  );
};

export default Layout;
