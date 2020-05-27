import React from 'react';
import styled from 'styled-components';

const OpenerContainer = styled.span`
  height: 2.8em;
  width: 2.8em;
  padding: 0.5em 1.5em;
  position: relative;
  cursor: pointer;
  border-radius: 4px;

  .left-bar {
    position: absolute;
    background-color: transparent;
    bottom: 50%;
    left: 0;
    width: 40px;
    height: 10px;
    display: block;
    transform: rotate(35deg);
    float: right;
    border-radius: 2px;
    &:after {
      content: '';
      background-color: ${props => props.theme.secondaryColor};
      width: 40px;
      height: 10px;
      display: block;
      float: right;
      border-radius: 6px 10px 10px 6px;
      transition: ${props => props.theme.transition};
      z-index: -1;
    }
  }

  .right-bar {
    position: absolute;
    background-color: transparent;
    bottom: 50%;
    left: 26px;
    width: 40px;
    height: 10px;
    display: block;
    transform: rotate(-35deg);
    float: right;
    border-radius: 2px;
    &:after {
      content: '';
      background-color: ${props => props.theme.secondaryColor};
      width: 40px;
      height: 10px;
      display: block;
      float: right;
      border-radius: 10px 6px 6px 10px;
      transition: ${props => props.theme.transition};
      z-index: -1;
    }
  }

  &.open {
    .left-bar:after {
    transform-origin: center center;
    transform: rotate(-70deg);
    background-color: ${props => props.theme.primaryColor};
  }
  .right-bar:after {
    transform-origin: center center;
    transform: rotate(70deg);
    background-color: ${props => props.theme.primaryColor};
  }
`;

const Opener = ({ open }) => {
  return (
    <OpenerContainer className={open ? 'open' : ''}>
      <span className="left-bar" />
      <span className="right-bar" />
    </OpenerContainer>
  );
};

export default Opener;
