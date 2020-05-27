import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  cursor: pointer;
  background: ${props =>
    props.highlighted ? props.theme.secondaryColor : props.theme.primaryColor};
  padding: 0.75rem 1.5rem;
  color: #fff;
  border-radius: 100px;
  border: 0;
  box-shadow: 0;
  transition: ${props => props.theme.transition};

  &:hover {
    transform: scale(1.1);
  }
`;

const Button = ({ text, highlighted }) => {
  return <ButtonContainer highlighted={highlighted}>{text}</ButtonContainer>;
};

export default Button;
