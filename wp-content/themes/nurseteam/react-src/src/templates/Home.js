import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../components/Button';

const Hero = styled.div`
  min-height: 67vh;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.5)
    ),
    url(${process.env.PUBLIC_URL + '/assets/PROPOSEDhero1.png'}) left/cover
      no-repeat;
  position: relative;

  div {
    color: ${props => props.theme.primaryColor};
    text-shadow: 0px 0px 0.5rem #fff, 0 0 1rem #ddd;
    padding: 0 5vw;
    text-align: right;
    position: absolute;
    top: 10%;
    right: 0;
  }

  h1 {
    text-align: right;
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  span {
    font-size: 1.25rem;
    font-weight: 300;
  }

  @media only screen and (max-width: 1150px) {
    div {
      top: auto;
      bottom: 2rem;
      color: #fff;
      text-shadow: 0px 0px 0.5rem ${props => props.theme.primaryColor},
        0 0 1rem #ddd;
    }
  }

  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 3rem;
    }
    span {
      font-size: 1.1rem;
    }
  }
`;

const Section = styled.section`
  ${props => (props.centered ? 'text-align: center;' : '')}
  padding: 2rem 4rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  div {
    width: 45%;
    max-width: 600px;
    min-width: 300px;
    margin: 0 1rem;
  }

  img {
    width: 100%;
  }

  p {
    max-width: ${props => `calc(${props.theme.contentWidth} *.75)`};
    margin: 1rem auto;
  }

  @media only screen and (max-width: 850px) {
    flex-flow: row wrap;
    padding: 1rem;

    div {
      width: 100%;
    }

    .image-container {
      order: 2;
      margin-top: 1rem;
    }
  }
`;

const Home = props => {
  const [content, setContent] = useState(false);
  useEffect(() => {
    async function getHomepage() {
      await fetch(`${process.env.REACT_APP_HOME}/wp-json/ehcapi/v1/homepage`)
        .then(res => res.json())
        .then(j => setContent(j));
    }
    getHomepage();
  }, []);

  return !content ? (
    ''
  ) : (
    <main>
      <Hero>
        <div>
          <h1>{content['Hero Headline']}</h1>
          <span>{content['Hero Subhead']}</span>
        </div>
      </Hero>
      <Section centered={true}>
        <div>
          <h2>{content['Section 1 Head']}</h2>
          <p>{content['Secton 1 Body']}</p>
          <Link to={content['Section 1 Button Path']}>
            <Button text={content['Section 1 Button Text']} />
          </Link>
        </div>
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + '/assets/PROPOSEDhomepage1.png'}
            alt="Group of nurses"
          />
        </div>
      </Section>
      <Section centered={true}>
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + '/assets/PROPOSEDhomepage2.png'}
            alt="Nurse and doctor conferring"
          />
        </div>
        <div>
          <h2>{content['Section 2 Head']}</h2>
          <p>{content['Secton 2 Body']}</p>
          <Link to={content['Section 2 Button Path']}>
            <Button text={content['Section 2 Button Text']} />
          </Link>
        </div>
      </Section>
      <Section centered={true}>
        <div dangerouslySetInnerHTML={{ __html: content['page_body'] }} />
      </Section>
    </main>
  );
};

export default Home;
