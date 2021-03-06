import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const JobModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    rgba(125, 125, 125, 0.75),
    rgba(125, 125, 125, 0.75)
  );
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JobForm = styled.form`
  background: #f7f7f7;
  padding: 2rem;
  position: relative;
  max-width: 100vw;
  box-sizing: border-box;

  h2 {
    margin-top: 0;
  }

  label {
    display: inline-block;
    width: 8rem;
    margin-bottom: 1rem;
  }

  select {
    max-width: 100%;
  }

  p {
    font-style: italic;
    font-size: 0.8rem;
  }

  @media only screen and (max-width: 600px) {
    margin: 0 1rem;
    label {
      display: block;
      width: auto;
      margin-bottom: 0;
      margin-top: 0.5rem;
    }
  }
`;

// X to indicate modal is closable
const Closer = styled.div`
  &:before {
    content: '×';
    position: absolute;
    top: -3rem;
    right: -1.75rem;
    font-size: 3rem;
    font-weight: 700;
    color: #f7f7f7;
    cursor: pointer;
    transition: color 0.25s ease;
  }

  &:hover:before {
    color: ${props => props.theme.primaryColor};
  }

  @media only screen and (max-width: 450px) {
    &:before {
      right: 0;
    }
  }
  @media only screen and (max-width: 400px) {
    &:before {
      right: 1rem;
    }
  }
`;

// Styles copied from Button component
const JobSubmit = styled.input`
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

  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

const JobAppModal = ({
  jobs,
  selectedJob,
  toggleModal,
  visible,
  info,
  setInfo,
}) => {
  const [selectedJobLocalId, setSelectedJobLocalId] = useState(0);
  const [selectedJobDisplayTitle, setSelectedJobDisplayTitle] = useState('');

  const handleClick = ev => {
    if (ev.target.id === 'jobModal' || ev.target.id === 'closer') {
      toggleModal();
    }
  };

  const handleUpdateInfo = ev => {
    ev.persist();
    setInfo(info => ({ ...info, [ev.target.name]: ev.target.value }));
  };

  const handleJobChange = ev => {
    const targetJob = jobs.find(
      j => j.sourceid.toString() === ev.target.value.toString()
    );
    setSelectedJobLocalId(targetJob.localid);
    setSelectedJobDisplayTitle(targetJob.display_title);
  };

  useEffect(() => {
    function setInitialLocalJobId() {
      const targetJob = jobs.find(
        j => j.sourceid.toString() === selectedJob.toString()
      );
      setSelectedJobLocalId(targetJob.localid);
      setSelectedJobDisplayTitle(targetJob.display_title);
    }
    setInitialLocalJobId();
  }, [jobs, selectedJob]);

  return (
    <JobModal id="jobModal" onClick={handleClick}>
      <JobForm
        action={process.env.REACT_APP_HOME + '/wp-admin/admin-post.php'}
        method="POST"
        encType="multipart/form-data"
      >
        <Closer id="closer" />
        <h2>Submit Your Application</h2>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={info.firstname}
          onChange={handleUpdateInfo}
          required
        />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={info.lastname}
          onChange={handleUpdateInfo}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={info.email}
          onChange={handleUpdateInfo}
          required
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={info.phone}
          onChange={handleUpdateInfo}
          required
        />
        <br />
        <label htmlFor="whichJob">Applying for:</label>
        <select
          id="whichJob"
          name="whichJob"
          defaultValue={selectedJob}
          onChange={handleJobChange}
          required
        >
          {jobs.map(job => {
            return (
              <option key={`${job.sourceid}option`} value={job.sourceid}>
                {job.display_title}
              </option>
            );
          })}
        </select>
        <input type="hidden" name="localid" value={selectedJobLocalId} />
        <input type="hidden" name="displayTitle" value={selectedJobDisplayTitle} />
        <br />
        <p>
          Please upload resume and coverletter (optional) as .doc, .docx, or
          .pdf
        </p>
        <label htmlFor="resume">Resume:</label>
        <input
          name="resume"
          id="resume"
          type="file"
          accept=".doc,.docx,.pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
          required
        />
        <br />
        <label htmlFor="coverletter">Cover Letter:</label>
        <input
          name="coverletter"
          id="coverletter"
          type="file"
          accept=".doc,.docx,.pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
        />
        <br />
        <input type="hidden" name="action" value="submit_jobapp" />
        <JobSubmit type="submit" value="Submit" />
      </JobForm>
    </JobModal>
  );
};

export default JobAppModal;
