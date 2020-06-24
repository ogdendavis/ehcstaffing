import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ContactPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto 2rem;

  @media only screen and (max-width: calc(${props =>
    props.theme.contentWidth} + 10vw)) {
    max-width: 90vw;
  }
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

const SubmissionConfirmation = styled.div`
  background: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.bgColor};
  font-weight: 700;
  padding: 1rem;
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

const ContactInfo = styled.div`
  margin: 2rem 0;
  text-align: center;

  p {
    margin: 0.5rem;
  }
`;

const Contact = props => {
  const [isAfterSubmission, setIsAfterSubmission] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [page, setPage] = useState(false);

  // Check for params that indicate page was reloaded after form submission
  useEffect(() => {
    function checkIfAfterSubmission() {
      const s = props.location.search;
      if (s.length > 0) {
        const p = new URLSearchParams(s);
        setIsAfterSubmission(p.get('s') === 'true' ? true : false);
      }
    }
    checkIfAfterSubmission();
  }, [props.location.search]);

  // Get page data on initial load
  useEffect(() => {
    async function getContactPage() {
      await fetch(`${process.env.REACT_APP_HOME}/wp-json/ehcapi/v1/contactpage`)
        .then(res => res.json())
        .then(j => {
          console.log(j);
          setPage(j);
        });
    }
    getContactPage();
  }, []);

  const formatPhoneNumber = ev => {
    let v = ev.target.value;
    // If the value in the input is already in our format, get outta here!
    if (/\(\d{3}\) \d{3}-\d{4}/.test(v)) {
      return;
    }

    // Get just the digits from the entered value
    const cleaned = ('' + v).replace(/\D/g, '');
    // Split it into pieces
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    // If we have pieces, construct the formatted number
    // If not, update the value until we get there
    if (match) {
      setPhoneNumber('(' + match[1] + ') ' + match[2] + '-' + match[3]);
    } else {
      setPhoneNumber(v);
    }
  };

  return (
    <ContactPageMain>
      <div>
        <h1>Get In Touch</h1>
        {page && <div dangerouslySetInnerHTML={{ __html: page.page_body }} />}
        {isAfterSubmission && (
          <SubmissionConfirmation>
            Thank you for your message. We will get back to you as soon as we
            are able.
          </SubmissionConfirmation>
        )}
      </div>
      <ContactForm
        action={process.env.REACT_APP_HOME + '/wp-admin/admin-post.php'}
        method="POST"
        encType="multipart/form-data"
      >
        <label htmlFor="firstname">First Name:</label>
        <input name="firstname" id="firstname" required />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <input name="lastname" id="lastname" required />
        <br />
        <label htmlFor="email">Email:</label>
        <input name="email" id="email" type="email" required />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          value={phoneNumber}
          name="phone"
          id="phone"
          type="tel"
          title="(999) 999-9999"
          pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
          onChange={formatPhoneNumber}
        />
        <br />
        <label htmlFor="message">Message:</label>
        <textarea name="message" id="message" required />
        <br />
        <label htmlFor="resume">Resume:</label>
        <input
          name="resume"
          id="resume"
          type="file"
          accept=".doc,.docx,.pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
        />
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
      <ContactInfo>
        <p>{page.contact_name}</p>
        <p>{page.contact_email}</p>
        <p>{page.contact_phone}</p>
      </ContactInfo>
    </ContactPageMain>
  );
};

export default Contact;
