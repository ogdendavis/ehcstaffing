import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AboutPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 2rem 2rem;
  margin: 0 auto;
  overflow: hidden;

  img {
    max-width: 100%;
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
