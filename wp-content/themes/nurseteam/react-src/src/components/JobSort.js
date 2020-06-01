import React, { useState } from 'react';
import styled from 'styled-components';

import Opener from './Opener';

// JSON list of states
import States from '../assets/states';

const SortContainer = styled.div`
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.bgColor};
  padding: 1rem;
  margin: 2rem 0 1rem;
`;

const SortUpper = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .job-filter-arrow {
    .left-bar::after,
    .right-bar::after {
      background-color: #fff;
    }
  }
`;

const SortOptions = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &.open {
    max-height: 100vh;
  }

  div {
    padding: 0 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.headingFontFamily};
    font-weight: 700;
    font-size: 1.1rem;
  }

  select {
    padding: 0 0.5rem;
  }
`;

const pickStates = States.map(state => (
  <option key={`pick${state.abbreviation}`} value={state.abbreviation}>
    {state.name}
  </option>
));

const JobSort = ({ allJobs }) => {
  const [open, setOpen] = useState(false);

  return (
    <SortContainer>
      <SortUpper onClick={() => setOpen(!open)}>
        <h2>Filter Jobs</h2>
        <Opener open={open} addClass="job-filter-arrow" />
      </SortUpper>
      <SortOptions className={open ? 'open' : ''}>
        <div>
          <label for="states">Filter by State</label>
          <select name="states" multiple>
            {pickStates}
          </select>
        </div>
        <div>
          <label for="specialties">Filter by Specialty</label>
          <select name="specialties" multiple>
            <option value="SpecialtyOne">One</option>
            <option value="SpecialtyTwo">Two</option>
            <option value="SpecialtyThree">Three</option>
          </select>
        </div>
      </SortOptions>
    </SortContainer>
  );
};

export default JobSort;
