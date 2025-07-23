import React from 'react';
import { SwitchProps } from './Switch.types';
import {
  SwitchContainer,
  HiddenInput,
  SwitchTrack,
  SwitchLabel,
} from './Switch.styled';

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  id,
  name,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
  'data-testid': testId
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = label ? `${switchId}-label` : undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!disabled) {
        onChange(!checked);
      }
    }
  };

  return (
    <SwitchContainer>
      <div>
        <HiddenInput
          type="checkbox"
          id={switchId}
          name={name}
          checked={checked}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy || labelId}
          data-testid={testId}
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
        />
        
        <SwitchTrack
          htmlFor={switchId}
          $checked={checked}
          $disabled={disabled}
          $size={size}
          role="presentation"
        />
      </div>
      
      {label && (
        <SwitchLabel id={labelId} $size={size}>
          {label}
        </SwitchLabel>
      )}
    </SwitchContainer>
  );
};