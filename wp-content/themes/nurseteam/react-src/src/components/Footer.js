import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Get svgs
import { ReactComponent as FaceIcon } from '../assets/icons/icon-facebook-white.svg';
import { ReactComponent as InstaIcon } from '../assets/icons/icon-instagram-white.svg';
import { ReactComponent as TwitIcon } from '../assets/icons/icon-twitter-white.svg';

const SiteFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: -10;
  height: ${props => props.theme.footerHeight};
  box-sizing: border-box;
  padding: 2rem;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.bgColor};
`;

const FooterInner = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto;

  @media only screen and (max-width: 600px) {
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const FooterNav = styled.nav`
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${props => props.theme.bgColor};
    text-decoration: none;
    position: relative;
  }

  a::before {
    content: '';
    position: absolute;
    bottom: -1px;
    width: 0px;
    height: 1px;
    margin: 1px 0 0;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    background-color: ${props => props.theme.bgColor};
  }
  a:hover::before {
    width: 100%;
    opacity: 1;
    left: 0;
  }

  @media only screen and (max-width: 600px) {
    li {
      display: inline-block;
      margin: 0 0.5rem 1rem;
    }
  }
`;

const FooterSocial = styled.div`
  display: flex;
  flex-flow: row wrap;
  svg {
    width: 60px;
    max-width: 7vw;
    margin: 0 1rem;
  }
`;

const FooterLogo = styled.div`
  img {
    max-width: 20vw;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

const FooterFooter = styled.div`
  margin-top: 2rem;
  width: 100%;
  text-align: center;
  font-size: 0.8rem;

  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

const Footer = () => {
  return (
    <SiteFooter>
      <FooterInner>
        <FooterNav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/articles">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </FooterNav>
        <FooterSocial>
          <FaceIcon />
          <InstaIcon />
          <TwitIcon />
        </FooterSocial>
        <FooterLogo>
          <img
            src={`${process.env.PUBLIC_URL}/assets/logoText150.png`}
            alt="Nurse Team"
          />
        </FooterLogo>
        <FooterFooter>
          © {new Date().getFullYear()} Essential Healthcare Staffing and
          Consulting
        </FooterFooter>
      </FooterInner>
    </SiteFooter>
  );
};

export default Footer;
