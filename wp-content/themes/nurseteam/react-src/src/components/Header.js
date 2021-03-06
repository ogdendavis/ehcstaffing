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
  z-index: 10;
`;

const LogoContainer = styled.div`
  width: 500px;
  max-width: 33vw;

  img {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    display: none;
    visibility: hidden;
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

  &:last-child {
    margin-right: 0;
  }

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
            src={process.env.PUBLIC_URL + '/assets/headerLogo.png'}
            alt="Nurse Team logo"
          />
        </Link>
      </LogoContainer>
      <HeaderNav>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink className="emphasis" to="/jobs">
          Jobs
        </HeaderLink>
        <HeaderLink to="/about">About</HeaderLink>
        <HeaderLink to="/articles">Blog</HeaderLink>
        <HeaderLink to="/contact">Contact</HeaderLink>
      </HeaderNav>
    </SiteHeader>
  );
};

export default Header;
