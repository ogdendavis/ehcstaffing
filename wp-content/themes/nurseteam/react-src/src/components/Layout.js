import React from 'react';
import styled from 'styled-components';

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
`;

const Layout = () => {
  return (
    <>
      <PageContainer>
        <Header />
        <Routes />
      </PageContainer>
      <Footer />
    </>
  );
};

export default Layout;
