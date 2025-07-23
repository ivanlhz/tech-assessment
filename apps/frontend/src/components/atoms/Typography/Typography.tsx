import React from 'react';
import { StyledTypography } from './Typography.styled';
import { TypographyProps } from './Typography.types';

export const Typography: React.FC<TypographyProps> = ({
  children,
  as = 'p',
  variant = 'body',
  ...props
}) => {
  return (
    <StyledTypography as={as} variant={variant} {...props}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
