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
  border-bottom: 1px solid ${props => props.theme.primaryColor};
  font-family: ${props => props.theme.headingFontFamily};
  background: ${props => props.theme.bgColor};
`;

const LogoContainer = styled.div`
  max-width: 150px;

  img {
    width: 100%;
  }
`;

const HeaderNav = styled.nav`
  a:not(.emphasis)::before {
    content: '';
    position: absolute;
    bottom: -1px;
    width: 0px;
    height: 1px;
    margin: 1px 0 0;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    background-color: ${props => props.theme.primaryColor};
  }
  a:not(.emphasis):hover::before {
    width: 100%;
    opacity: 1;
    left: 0;
  }
`;

const HeaderLink = styled(Link)`
  position: relative;
  margin-right: 1rem;
  color: ${props => props.theme.primaryColor};
  font-weight: 500;
  text-decoration: none;

  &.emphasis {
    background: ${props => props.theme.secondaryColor};
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    transition: all 0.4s ease-in-out;
  }
  &.emphasis:hover {
    background: ${props => props.theme.primaryColor};
  }
`;

const Header = () => {
  return (
    <SiteHeader>
      <LogoContainer>
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/assets/logo150.png'}
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
