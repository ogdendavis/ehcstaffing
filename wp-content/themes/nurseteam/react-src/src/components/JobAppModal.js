import React from 'react';
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
`;

const JobAppModal = ({ jobs, selectedJob, toggleModal }) => {
  const handleClick = ev => {
    if (ev.target.id === 'jobModal') {
      toggleModal();
    }
  };

  return (
    <JobModal id="jobModal" onClick={handleClick}>
      <JobForm
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
        <label htmlFor="whichJob">Applying for:</label>
        <select id="whichJob" name="whichJob" defaultValue={selectedJob}>
          {jobs.map(job => {
            return (
              <option key={`${job.sourceid}option`} value={job.sourceid}>
                {job.display_title}
              </option>
            );
          })}
        </select>
        <label htmlFor="resume">Resume:</label>
        <input name="resume" id="resume" type="file" />
        <br />
        <label htmlFor="coverletter">Cover Letter:</label>
        <input name="coverletter" id="coverletter" type="file" />
        <br />
        <input type="hidden" name="action" value="submit_jobapp" />
        <JobSubmit type="submit" value="Submit" />
      </JobForm>
    </JobModal>
  );
};

export default JobAppModal;
