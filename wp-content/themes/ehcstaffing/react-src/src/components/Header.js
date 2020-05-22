import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SiteHeader = styled.header`
  position: sticky;
  top: 0;
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid blue;
`;

const LogoContainer = styled.div`
  max-width: 4rem;

  img {
    width: 100%;
  }
`;

const HeaderNav = styled.nav`
  background: gray;
`;

const HeaderLink = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-right: 1rem;

  &.emphasis {
    background: red;
    padding: 0.5rem 1rem;
    border-radius: 100px;
  }
`;

const Header = () => {
  return (
    <SiteHeader>
      <LogoContainer>
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/assets/fakeLogo.png'}
            alt="Fake Logo"
          />
        </Link>
      </LogoContainer>
      <HeaderNav>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink className="emphasis" to="/jobs">
          Jobs
        </HeaderLink>
        <HeaderLink to="/about">About</HeaderLink>
        <HeaderLink to="/blog">Blog</HeaderLink>
        <HeaderLink to="/contact">Contact</HeaderLink>
      </HeaderNav>
    </SiteHeader>
  );
};

export default Header;
