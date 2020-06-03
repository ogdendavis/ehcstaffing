import React from 'react';
import styled from 'styled-components';

const ContactPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto 2rem;
`;

const ContactForm = styled.form`
  background: #f7f7f7;
  padding: 2rem;
  margin: 0 auto;
  width: 60%;
  min-width: 300px;
  box-sizing: border-box;

  label {
    display: inline-block;
    width: 6rem;
    margin-bottom: 0.5rem;
  }

  input {
    margin-bottom: 1rem;
  }

  input[type='file'] {
    margin-bottom: 0;
  }

  label[for='message'] {
    vertical-align: top;
  }

  textarea {
    min-height: 10rem;
    margin-bottom: 1.5rem;
  }

  span {
    font-size: 0.8rem;
    font-style: italic;
  }
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
        <h1>Get In Touch</h1>
        <p>
          Have a question, or want us to keep you in mind for future travel
          nurse openings? Let us know!
        </p>
      </div>
      <ContactForm
        action={process.env.REACT_APP_HOME + '/wp-admin/admin-post.php'}
        method="POST"
      >
        <label htmlFor="firstname">First Name:</label>
        <input name="firstname" id="firstname" />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <input name="lastname" id="lastname" />
        <br />
        <label htmlFor="email">Email:</label>
        <input name="email" id="email" type="email" />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input name="phone" id="phone" type="tel" />
        <br />
        <label htmlFor="message">Message:</label>
        <textarea name="message" id="message" />
        <br />
        <label htmlFor="resume">Resume:</label>
        <input name="resume" id="resume" type="file" />
        <br />
        <span>
          (Only attach a resume if you wish to have it kept on file for future
          openings)
        </span>
        <br />
        <input type="hidden" name="action" value="submit_contactform" />
        <br />
        <ContactSubmit type="submit" value="Send" />
      </ContactForm>
    </ContactPageMain>
  );
};

export default Contact;
