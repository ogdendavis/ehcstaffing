import React, { useState } from 'react';
import styled from 'styled-components';

import Opener from './Opener';
import Button from './Button';

// JSON list of states
import States from '../assets/states';
import Specialties from '../assets/specialties';

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
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;

  &.open {
    max-height: 100vh;
  }

  div {
    padding: 1rem;
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
    option.option--all {
      font-weight: 700;
      border-bottom: 1px solid #888;
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

const pickSpecialties = Specialties.map(sp => (
  <option key={`pick ${sp.name}`} value={sp.name}>
    {sp.name}
  </option>
));

const JobFilter = ({ allJobs, update }) => {
  const [open, setOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);

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

  const getSelectedSpecs = ev => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    if (!selectedSpecs.includes(ev.target.value)) {
      setSelectedSpecs(selectedSpecs.concat(ev.target.value));
    } else {
      setSelectedSpecs(selectedSpecs.filter(sp => sp !== ev.target.value));
    }
  };

  const filterJobs = () => {
    // Check if filtering by state and/or specialty
    const filterByState = !(
      selectedStates.includes('ALL') || selectedStates.length === 0
    );
    const filterBySpec = !(
      selectedSpecs.includes('ALL') || selectedSpecs.length === 0
    );

    if (!filterByState && !filterBySpec) {
      // No filtering
      update(allJobs);
    } else {
      // Filter by each -- if only filtering by one, will include all values of other
      let filtered = allJobs.slice();
      if (filterByState) {
        filtered = filtered.filter(job => selectedStates.includes(job.state));
      }
      if (filterBySpec) {
        filtered = filtered.filter(job =>
          selectedSpecs.includes(job.specialty)
        );
      }
      update(filtered);
    }
  };

  const showAllJobs = () => {
    setSelectedStates([]);
    setSelectedSpecs([]);
    update(allJobs);
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
            onChange={() => console.log('change state')}
            onClick={getSelectedStates}
            multiple
          >
            <option value="ALL" className="option--all">
              All States
            </option>
            {pickStates}
          </select>
        </div>
        <div>
          <label htmlFor="specialties">Specialty</label>
          <select
            name="specialties"
            id="specialties"
            value={selectedSpecs}
            onChange={() => console.log('change specialty')}
            onClick={getSelectedSpecs}
            multiple
          >
            <option value="ALL" className="option--all">
              All Specialties
            </option>
            {pickSpecialties}
          </select>
        </div>
        <div>
          <Button text="Filter" inactive={true} handleClick={filterJobs} />
        </div>
        <div>
          <Button text="Show All" inactive={true} handleClick={showAllJobs} />
        </div>
      </SortOptions>
    </SortContainer>
  );
};

export default JobFilter;
