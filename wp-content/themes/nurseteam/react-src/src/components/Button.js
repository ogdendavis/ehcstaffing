import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  cursor: ${props => (props.inactive ? 'default' : 'pointer')};
  background: ${props =>
    props.highlighted
      ? props.theme.secondaryColor
      : props.inactive
      ? 'gray'
      : props.theme.primaryColor};
  padding: 0.75rem 1.5rem;
  color: #fff;
  border-radius: 100px;
  border: 0;
  box-shadow: 0;
  transition: ${props => props.theme.transition};

  &:hover {
    transform: ${props => (props.inactive ? 'none' : 'scale(1.1)')};
  }
`;

const Button = ({ text, highlighted, handleClick, value, inactive }) => {
  return (
    <ButtonContainer
      highlighted={highlighted}
      onClick={handleClick}
      value={value}
      inactive={inactive}
    >
      {text}
    </ButtonContainer>
  );
};

export default Button;
