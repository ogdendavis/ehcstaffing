import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../components/Button';

const Hero = styled.div`
  min-height: 50vh;
  background: rgb(37, 51, 126);
  background: linear-gradient(
    195deg,
    rgba(37, 51, 126, 1) 0%,
    rgba(67, 156, 210, 1) 60%,
    rgba(27, 206, 115, 1) 100%
  );

  div {
    color: white;
    padding: 6rem;
    text-align: right;
  }

  h1 {
    text-align: right;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  span {
    font-size: 1.1rem;
    font-weight: 300;
  }
`;

const Section = styled.section`
  ${props => (props.centered ? 'text-align: center;' : '')}
  padding: 2rem 4rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;

  div {
    max-width: 50%;
  }

  p {
    max-width: ${props => `calc(${props.theme.contentWidth} *.75)`};
    margin: 1rem auto;
  }
`;

const Home = props => {
  return (
    <>
      <Hero>
        <div>
          <h1>We Are Nurse Team</h1>
          <span>And we're going to get you a badass job</span>
        </div>
      </Hero>
      <Section centered={true}>
        <div>
          <h2>Find The Best Travel Nurse Jobs</h2>
          <p>
            We have up-to-date listings of the best travel nursing opportunities
            around the U.S.
          </p>
          <Link to="/jobs">
            <Button text="See job listings" />
          </Link>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + '/assets/patient_care.png'}
            alt="Nurse with patient"
          />
        </div>
      </Section>
      <Section centered={true}>
        <div>
          <img
            src={process.env.PUBLIC_URL + '/assets/doctor_nurse.png'}
            alt="Nurse team"
          />
        </div>
        <div>
          <h2>Let The Jobs Find You</h2>
          <p>
            Want to be recruited for travel nursing opportunities that fit your
            preferences and skill set? Upload your resume and preferences, and
            we'll reach out to you when there's an opportunity that fits.
          </p>
          <Button text="Upload your info" />
        </div>
      </Section>
      <Section centered={true}>
        <div>
          <h2>We need more content!</h2>
          <p>
            As you can tell, I'm just making this up. Marc, think about what you
            want to communicate to your prospects, and we'll find the best way
            to put those things on the homepage in a high-impact way!
          </p>
        </div>
      </Section>
    </>
  );
};

export default Home;
