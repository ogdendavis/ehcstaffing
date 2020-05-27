// TODO: Add paging

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import JobListing from '../components/JobListing';

const JobPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 2rem 2rem;
  margin: 0 auto;
`;

const JobArchive = props => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      await fetch(`${process.env.REACT_APP_HOME}/wp-json/ehcapi/v1/jobs`)
        .then(res => res.json())
        .then(j => setJobs(j));
    }
    getJobs();
  }, []);

  return (
    <JobPageMain>
      <h1>Here are some jobs!</h1>
      {jobs.map(job => {
        const startDate = new Intl.DateTimeFormat('en-US').format(
          new Date(job.startdate)
        );
        job.startdate = startDate;

        return <JobListing job={job} key={`${job.city}-${job.startdate}`} />;
      })}
    </JobPageMain>
  );
};

export default JobArchive;
