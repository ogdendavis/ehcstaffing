import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import Opener from './Opener';

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
  opacity: 0;
  transition: max-height 0.5s ease, opacity 0.5s ease 0.1s;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;

  @media only screen and (max-width: 640px) {
    justify-content: center;
  }

  &.open {
    max-height: 100vh;
    opacity: 1;
    overflow: visible;
  }

  .jobsortrow {
    padding: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.headingFontFamily};
    font-weight: 700;
    font-size: 1.1rem;
  }

  .ehc-select {
    min-width: 220px;
    padding: 0 0.5rem;

    .ehc-select__menu {
      color: #333333;
    }

    option {
      cursor: pointer;
      transition: all 0.25s ease;
    }
    option.option--all {
      font-weight: 700;
      border-bottom: 1px solid #888;
    }
  }
`;

const stateOptions = States.map(state => ({
  value: state.abbreviation,
  label: state.name,
}));
stateOptions.unshift({
  value: 'ALL',
  label: 'All States',
});

const specialtyOptions = Specialties.map(sp => ({
  value: sp.name,
  label: sp.name,
}));
specialtyOptions.unshift({
  value: 'ALL',
  label: 'All Specialties',
});

const JobFilter = ({ allJobs, update }) => {
  const [open, setOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState(['ALL']);
  const [selectedSpecs, setSelectedSpecs] = useState(['ALL']);

  useEffect(() => {
    function filterJobs(aj) {
      // Check if filtering by state and/or specialty
      const filterByState = !(
        selectedStates.includes('ALL') || selectedStates.length === 0
      );
      const filterBySpec = !(
        selectedSpecs.includes('ALL') || selectedSpecs.length === 0
      );

      if (!filterByState && !filterBySpec) {
        // No filtering
        update(aj);
      } else {
        // Filter by each -- if only filtering by one, will include all values of other
        let filtered = aj.slice();
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
    }
    filterJobs(allJobs);
  }, [update, allJobs, selectedStates, selectedSpecs]);

  // Fired by onChange event
  // React-select just sends an array of objects with the value & lable of the
  // selected options, not the whole event
  const getSelectedStates = sel => {
    // react-select sends null if no items are selected. handle that!
    if (sel === null) {
      setSelectedStates(['ALL']);
    } else {
      // Pull the values out of the objects in the react-select generated array,
      // and use them to set the state
      const newStates = sel.map(st => st.value);
      setSelectedStates(newStates);
    }
  };

  const getSelectedSpecs = sel => {
    // Same logic as getSelectedStates
    if (sel === null) {
      setSelectedSpecs(['ALL']);
    } else {
      const newSpecs = sel.map(sp => sp.value);
      setSelectedSpecs(newSpecs);
    }
  };

  return (
    <SortContainer>
      <SortUpper onClick={() => setOpen(!open)}>
        <h2>Filter Jobs</h2>
        <Opener open={open} addClass="job-filter-arrow" />
      </SortUpper>
      <SortOptions className={open ? 'open' : ''}>
        <div className="jobsortrow">
          <label htmlFor="states">State</label>
          <Select
            options={stateOptions}
            onChange={s => getSelectedStates(s)}
            closeMenuOnSelect={false}
            isMulti
            className="ehc-select"
            classNamePrefix="ehc-select"
          />
        </div>
        <div className="jobsortrow">
          <label htmlFor="specialties">Specialty</label>
          <Select
            options={specialtyOptions}
            onChange={s => getSelectedSpecs(s)}
            closeMenuOnSelect={false}
            isMulti
            className="ehc-select"
            classNamePrefix="ehc-select"
          />
        </div>
      </SortOptions>
    </SortContainer>
  );
};

export default JobFilter;
