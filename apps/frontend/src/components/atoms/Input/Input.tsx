import React from 'react';
import { InputWrapper, Label, StyledInput } from './Input.styled';
import { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({ label, className, ...rest }) => {
  return (
    <InputWrapper className={className}>
      <Label htmlFor={label}>{label}</Label>
      <StyledInput aria-labelledby={label} {...rest} />
    </InputWrapper>
  );
};

export default Input;
