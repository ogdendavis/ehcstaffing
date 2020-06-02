// TODO: Add paging

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import JobFilter from '../components/JobFilter';
import JobListing from '../components/JobListing';
import JobAppModal from '../components/JobAppModal';

const JobPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 2rem 2rem;
  margin: 0 auto;
`;

const JobArchive = props => {
  const [allJobs, setAllJobs] = useState([]);
  const [apply, setApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState('initial');
  const [applicantInfo, setApplicantInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });
  const [displayJobs, setDisplayJobs] = useState([]);

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
        .then(j => {
          // Store all the jobs
          setAllJobs(j);
          // Set the jobs that will initialy be displayed
          // For now, it's just all the jobs again
          // Need to add pagination and filtering
          setDisplayJobs(j);
        });
    }
    getJobs();
  }, []);

  // Simplify job info into an array for the application modal
  const jobsForModal = [];
  for (const key in allJobs) {
    jobsForModal.push({
      sourceid: allJobs[key].sourceid,
      display_title: allJobs[key].display_title,
    });
  }

  return (
    <JobPageMain>
      <h1>Travel Nurse Jobs</h1>
      <p>
        These listings are updated regularly. If you don't see an opportunity
        that fits what you're looking for, you can{' '}
        <Link to="/contact">send us your info</Link> to be considered for future
        openings, and check this page regularly for new listings.
      </p>
      <JobFilter allJobs={allJobs} setDisplayJobs={setDisplayJobs} />
      {displayJobs.map(job => {
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
