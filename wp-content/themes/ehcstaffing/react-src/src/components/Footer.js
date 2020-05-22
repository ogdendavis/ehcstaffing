import React from 'react';
import styled from 'styled-components';

const SiteFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: -10;
  height: ${props => props.theme.footerHeight};
  box-sizing: border-box;
  padding: 2rem;
  background: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.bgColor};
`;

const Footer = () => {
  return <SiteFooter>This is the footer!</SiteFooter>;
};

export default Footer;
