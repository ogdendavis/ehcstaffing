import React, { useState } from 'react';
import styled from 'styled-components';

import Opener from './Opener';
import Button from './Button';

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
  align-items: flex-end;

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
    option {
      transition: all 0.25s ease;
    }
  }

  button {
    cursor: pointer;
  }
`;

const pickStates = States.map(state => (
  <option key={`pick${state.abbreviation}`} value={state.abbreviation}>
    {state.name}
  </option>
));

const JobFilter = ({ allJobs, setDisplayJobs }) => {
  const [open, setOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState([]);

  // Fired by click event
  const getSelectedStates = ev => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    if (!selectedStates.includes(ev.target.value)) {
      setSelectedStates(selectedStates.concat(ev.target.value));
    } else {
      setSelectedStates(selectedStates.filter(st => st !== ev.target.value));
    }
  };

  const filterJobs = () => {
    console.log(selectedStates);
    if (selectedStates.includes('ALL') || selectedStates.length === 0) {
      console.log('all states');
      setDisplayJobs(allJobs);
    } else {
      setDisplayJobs(allJobs.filter(job => selectedStates.includes(job.state)));
    }
  };

  return (
    <SortContainer>
      <SortUpper onClick={() => setOpen(!open)}>
        <h2>Filter Jobs</h2>
        <Opener open={open} addClass="job-filter-arrow" />
      </SortUpper>
      <SortOptions className={open ? 'open' : ''}>
        <div>
          <label htmlFor="states">State</label>
          <select
            name="states"
            id="states"
            value={selectedStates}
            onChange={() => console.log('change')}
            onClick={getSelectedStates}
            multiple
          >
            <option value="ALL">All States</option>
            {pickStates}
          </select>
        </div>
        <div>
          <label htmlFor="specialties">Specialty</label>
          <select name="specialties" id="specialties" multiple>
            <option value="SpecialtyOne">One</option>
            <option value="SpecialtyTwo">Two</option>
            <option value="SpecialtyThree">Three</option>
          </select>
        </div>
        <div>
          <Button text="Filter" inactive={true} handleClick={filterJobs} />
        </div>
      </SortOptions>
    </SortContainer>
  );
};

export default JobFilter;
