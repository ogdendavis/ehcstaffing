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
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: 300;
}
`;

// Theme info for site-wide use
const themeStyles = {
  primaryColor: `#6bb2d0`,
  secondaryColor: `#67b49f`,
  headingFontFamily: `Montserrat, Arial, sans-serif`,
  bodyFontFamily: `Roboto, Arial, sans-serif`,
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
