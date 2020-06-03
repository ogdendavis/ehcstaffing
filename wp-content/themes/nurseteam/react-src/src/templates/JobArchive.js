// TODO: Add paging

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import JobFilter from '../components/JobFilter';
import JobListing from '../components/JobListing';
import JobAppModal from '../components/JobAppModal';
import Button from '../components/Button';

const JobPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto 2rem;
`;

const Pager = styled.div`
  margin-top: 2rem;
  text-align: center;
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
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [numJobsVisible, setNumJobsVisible] = useState(10);
  const [visibleJobs, setVisibleJobs] = useState([]);

  // Passed to modal to toggle visibility
  const toggleApply = () => {
    setApply(!apply);
  };

  // Passed to each job listing to toggle modal visibility and indicate the job whose 'Apply' button was clicked
  const handleButtonClick = ev => {
    setApply(!apply);
    setSelectedJob(ev.target.value);
  };

  // Passed to JobFilter to handle filtering and paging together
  const updateJobsWithPaging = j => {
    setFilteredJobs(j);
    doPaging({ fj: j, reset: true });
  };

  // Pass filtered jobs in, get paged jobs out!
  // Used to load more jobs with "more" button at bottom of page
  const doPaging = ({ fj, reset = false }) => {
    const numViz = reset ? 10 : numJobsVisible + 10;
    // If there are 10 or fewer jobs to start with, do nothing
    if (fj.length <= numViz) {
      setVisibleJobs(fj);
    } else {
      const numViz = reset ? 10 : numJobsVisible + 10;
      setVisibleJobs(fj.slice(0, numViz));
      setNumJobsVisible(numViz);
    }
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
          setFilteredJobs(j);
          setVisibleJobs(j.slice(0, 10));
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
      <JobFilter allJobs={allJobs} update={updateJobsWithPaging} />
      {visibleJobs.map(job => {
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
      {filteredJobs.length > visibleJobs.length && (
        <Pager>
          <Button
            text="Load More Jobs &#8595;"
            handleClick={() => doPaging({ fj: filteredJobs })}
          />
        </Pager>
      )}

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
