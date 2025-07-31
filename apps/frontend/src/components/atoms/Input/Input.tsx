import React, { forwardRef } from 'react';
import { InputWrapper, Label, StyledInput } from './Input.styled';
import { InputProps } from './Input.types';
import { Typography } from '../Typography';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, error, ...rest }, ref) => {
    const labelId = `${rest.name || 'input'}-label`;
    
    return (
      <InputWrapper className={className}>
        <Label id={labelId} htmlFor={rest.name}>{label}</Label>
        <StyledInput 
          ref={ref}
          id={rest.name} 
          aria-labelledby={labelId} 
          {...rest} 
        />
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
export default Input;