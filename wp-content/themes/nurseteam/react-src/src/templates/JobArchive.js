// TODO: Add paging

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import JobListing from '../components/JobListing';
import JobAppModal from '../components/JobAppModal';

const JobPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 2rem 2rem;
  margin: 0 auto;
`;

const JobArchive = props => {
  const [jobs, setJobs] = useState([]);
  const [apply, setApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState('initial');
  const [applicantInfo, setApplicantInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });

  // Passed to modal to toggle visibility
  const toggleApply = () => {
    setApply(!apply);
  };

  // Passed to each job listing to toggle modal visibility and indicate the job whose 'Apply' button was clicked
  const handleButtonClick = ev => {
    setApply(!apply);
    setSelectedJob(ev.target.value);
  };

  useEffect(() => {
    async function getJobs() {
      await fetch(`${process.env.REACT_APP_HOME}/wp-json/ehcapi/v1/jobs`)
        .then(res => res.json())
        .then(j => setJobs(j));
    }
    getJobs();
  }, []);

  // Simplify job info into an array for the application modal
  const jobsForModal = [];
  for (const key in jobs) {
    jobsForModal.push({
      sourceid: jobs[key].sourceid,
      display_title: jobs[key].display_title,
    });
  }

  return (
    <JobPageMain>
      <h1>Here are some jobs!</h1>
      {jobs.map(job => {
        const startDate = new Intl.DateTimeFormat('en-US').format(
          new Date(job.startdate)
        );
        job.startdate = startDate;

        return (
          <JobListing
            job={job}
            key={`${job.city}-${job.startdate}`}
            handleButtonClick={handleButtonClick}
          />
        );
      })}
      {apply && (
        <JobAppModal
          selectedJob={selectedJob}
          toggleModal={toggleApply}
          jobs={jobsForModal}
          visible={apply}
          info={applicantInfo}
          setInfo={setApplicantInfo}
        />
      )}
    </JobPageMain>
  );
};

export default JobArchive;
