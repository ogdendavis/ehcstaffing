import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Get svgs
import { ReactComponent as FaceIcon } from '../icons/icon-facebook-white.svg';
import { ReactComponent as InstaIcon } from '../icons/icon-instagram-white.svg';
import { ReactComponent as TwitIcon } from '../icons/icon-twitter-white.svg';

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
  justify-content: space-between;
  width: 100%;
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto;
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
`;

const FooterSocial = styled.div`
  display: flex;
  flex-flow: row wrap;
  svg {
    max-width: 60px;
    margin: 0 1rem;
  }
`;

const FooterFooter = styled.div`
  margin-top: 2rem;
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
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
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/logoText150.png`}
            alt="Nurse Team"
          />
        </div>
        <FooterFooter>
          © {new Date().getFullYear()} Essential Healthcare Staffing and
          Consulting
        </FooterFooter>
      </FooterInner>
    </SiteFooter>
  );
};

export default Footer;
