import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

// import styles to use globally
import normalize from '../styles/normalize.css';
import { fonts } from '../styles/fonts';

// Making global styles from css imported above
const GlobalStyle = createGlobalStyle`
${normalize}
${fonts}
body {
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: 300;
}
`;

// Theme info for site-wide use
const themeStyles = {
  primaryColor: `#2d69a5`,
  secondaryColor: `#1bce73`,
  bgColor: `#fff`,
  textColor: `#3a3a3a`,
  headingFontFamily: `Montserrat, Arial, sans-serif`,
  bodyFontFamily: `Roboto, Arial, sans-serif`,
  footerHeight: `300px`,
  contentWidth: `960px`,
  transition: `all .5s cubic-bezier(.25,1.7,.35,.8)`,
};

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={themeStyles}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
