import { ButtonProps } from './Button.types';
import { StyledButton, LoadingSpinner, IconWrapper } from './Button.styled';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      
      {!loading && leftIcon && (
        <IconWrapper>{leftIcon}</IconWrapper>
      )}
      
      <span>{children}</span>
      
      {!loading && rightIcon && (
        <IconWrapper>{rightIcon}</IconWrapper>
      )}
    </StyledButton>
  );
};