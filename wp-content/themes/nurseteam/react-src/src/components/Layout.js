import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Routes from '../components/Routes';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.primaryColor};
  margin-bottom: ${props => props.theme.footerHeight};
  min-height: 100vh;
  z-index: 10;
  background: ${props => props.theme.bgColor};

  .transition-group {
    position: relative;
  }

  .routes-container {
    position: absolute:
    top: 0;
    left: 0;
    right: 0;
  }

  .pageFade-enter {
    opacity: 0;
    z-index: 1;
  }
  .pageFade-enter.pageFade-enter-active {
    opacity: 1;
    transition: all 250ms ease-in;
  }
  .pageFade-exit {
    opacity: 1;
    transition: all 250 ease-out;
  }
  .pageFade-exit.pageFade-exit-active {
    opacity: 0;
    z-index: -1;
  }
`;

const Layout = () => {
  let location = useLocation();
  return (
    <>
      <PageContainer>
        <Header />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="pageFade" timeout={250}>
            <Routes location={location} className="routes-container" />
          </CSSTransition>
        </TransitionGroup>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Layout;
