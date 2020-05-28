import React from 'react';
import styled from 'styled-components';

const ContactPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 2rem 2rem;
  margin: 0 auto;
`;

const ContactForm = styled.form`
  background: #f7f7f7;
  padding: 1rem;
  margin: 0 auto;
  width: 50%;
  min-width: 300px;
  box-sizing: border-box;
`;

// Styles copied from Button component
const ContactSubmit = styled.input`
  cursor: pointer;
  background: ${props =>
    props.highlighted ? props.theme.secondaryColor : props.theme.primaryColor};
  padding: 0.75rem 1.5rem;
  color: #fff;
  border-radius: 100px;
  border: 0;
  box-shadow: 0;
  transition: ${props => props.theme.transition};

  &:hover {
    transform: scale(1.1);
  }
`;

const Contact = props => {
  return (
    <ContactPageMain>
      <div>
        <h1>Get a job!</h1>
        <p>
          Apply for a job, or sumbit your resume for consideration for future
          travel nurse positions.
        </p>
      </div>
      <ContactForm
        action={process.env.REACT_APP_HOME + '/wp-admin/admin-post.php'}
        method="POST"
      >
        <label for="firstname">First Name:</label>
        <input name="firstname" id="firstname" />
        <br />
        <label for="lastname">Last Name:</label>
        <input name="lastname" id="lastname" />
        <br />
        <label for="email">Email:</label>
        <input name="email" id="email" type="email" />
        <br />
        <label for="phone">Phone:</label>
        <input name="phone" id="phone" type="tel" />
        <br />
        <label for="whichJob">Applying for:</label>
        <select id="whichJob" name="whichJob">
          <option value="">Please notify me of future jobs</option>
          <option value="sourceid1">
            Telemetry/Stepdown in Bar Harbor, ME
          </option>
          <option value="sourceid2">ER Observation RN in Winnebago, NE</option>
        </select>
        <label for="resume">Resume:</label>
        <input name="resume" id="resume" type="file" />
        <br />
        <label for="coverletter">Cover Letter:</label>
        <input name="coverletter" id="coverletter" type="file" />
        <br />
        <input type="hidden" name="action" value="submit_contactform" />
        <ContactSubmit type="submit" value="Submit" />
      </ContactForm>
    </ContactPageMain>
  );
};

export default Contact;
