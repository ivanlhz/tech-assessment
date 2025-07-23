import React from 'react';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { FormFieldWrapper, IconWrapper, TextWrapper } from './FormField.styled';
import { FormFieldProps } from './FormField.types';

export const FormField: React.FC<FormFieldProps> = ({ icon, label, value, className }) => {
  return (
    <FormFieldWrapper className={className}>
      {icon && (
        <IconWrapper>
          <Icon name={icon} size={24} />
        </IconWrapper>
      )}
      <TextWrapper>
        <Typography variant="caption" color="secondary">
          {label}
        </Typography>
        <Typography variant="body" fontWeight="medium">
          {value}
        </Typography>
      </TextWrapper>
    </FormFieldWrapper>
  );
};

export default FormField;
