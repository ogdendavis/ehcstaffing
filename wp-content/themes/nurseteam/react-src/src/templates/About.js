import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AboutPageMain = styled.main`
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

const About = props => {
  const [page, setPage] = useState(false);

  useEffect(() => {
    async function getAboutPage() {
      await fetch(
        `${process.env.REACT_APP_HOME}/wp-json/wp/v2/pages?_slug=about`
      )
        .then(res => res.json())
        .then(j => setPage(j[0]));
    }
    getAboutPage();
  }, []);

  return (
    <AboutPageMain>
      {page && (
        <>
          <h1>{page.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </>
      )}
    </AboutPageMain>
  );
};

export default About;
