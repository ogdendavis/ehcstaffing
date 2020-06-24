import React from 'react';
import styled from 'styled-components';

const FourOhFourMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto 2rem;
  overflow: hidden;

  img {
    max-width: 100%;
  }

  @media only screen and (max-width: calc(${props =>
    props.theme.contentWidth} + 10vw)) {
    max-width: 90vw;
  }
`;

const FourOhFour = props => {
  return (
    <FourOhFourMain>
      <h1>Oops!</h1>
      <h2>Page Not Found</h2>
      <p>
        It looks like the page you're trying to reach doesn't exist. Please try
        to navigate to the correct page using the menu links above.
      </p>
      <p>
        If you think we've royally screwed up, and there really ought to be a
        page here, please <a href="/contact">let us know</a>!
      </p>
    </FourOhFourMain>
  );
};

export default FourOhFour;
