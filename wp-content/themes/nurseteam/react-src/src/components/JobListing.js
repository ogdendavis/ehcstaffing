import React, { useState } from 'react';
import styled from 'styled-components';

import Opener from './Opener';
import Button from './Button';

const JobListingContainer = styled.article`
  border: ${props =>
    props.open ? `5px solid ${props.theme.secondaryColor}` : '5px solid #eee'};
  padding: 1rem;
  transform: all 0.5s ease;

  &:nth-child(odd) {
    background-color: #f7f7f7;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const FrontPage = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;

  p:first-child {
    font-weight: 700;
  }
`;

const InsidePage = styled.div`
  .inside__inner {
    font-size: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    transition: opacity 0.25s ease, font-size 0.25s 0.25s ease,
      margin 0.25s 0.25s ease, padding 0.25s 0.25s ease;
  }

  &.open .inside__inner {
    font-size: 1rem;
    opacity: 1;
    padding: 1rem 0;
    transition: font-size 0.25s ease, margin 0.25s ease, padding 0.25s ease,
      opacity 0.25s 0.25s ease;
  }
`;

const JobListing = ({ job, handleButtonClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <JobListingContainer open={open}>
      <FrontPage onClick={() => setOpen(!open)}>
        <div>
          <p>{job.display_title}</p>
          <p>
            {job.duration}, starting on {job.startdate}.
          </p>
        </div>
        <Opener open={open} />
      </FrontPage>
      <InsidePage className={open ? 'open' : ''}>
        <div className="inside__inner">
          <p>{job.pay}</p>
          <p>{job.description}</p>
        </div>
      </InsidePage>
      <Button
        highlighted={open}
        text="Apply for this job"
        handleClick={handleButtonClick}
        value={job.sourceid}
      />
    </JobListingContainer>
  );
};

export default JobListing;
