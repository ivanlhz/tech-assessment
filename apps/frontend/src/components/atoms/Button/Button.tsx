// src/components/ui/Button/Button.tsx
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.dark};
      border-color: ${({ theme }) => theme.colors.primary.dark};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.dark};
      transform: translateY(1px);
    }
  `,
  
  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary.main};
    border: 1px solid ${({ theme }) => theme.colors.secondary.main};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary.main};
      color: ${({ theme }) => theme.colors.secondary.contrastText};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary.dark};
      border-color: ${({ theme }) => theme.colors.secondary.dark};
      transform: translateY(1px);
    }
  `,
  
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.neutral.gray100};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.neutral.gray200};
      transform: translateY(1px);
    }
  `,
  
  danger: css`
    background-color: ${({ theme }) => theme.colors.status.error};
    color: ${({ theme }) => theme.colors.neutral.white};
    border: 1px solid ${({ theme }) => theme.colors.status.error};

    &:hover:not(:disabled) {
      background-color: #d14841;
      border-color: #d14841;
    }

    &:active:not(:disabled) {
      background-color: #bf3f39;
      border-color: #bf3f39;
      transform: translateY(0.0625rem);
    }
  `
};

const buttonSizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    min-height: 32px;
  `,
  
  md: css`
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    min-height: 40px;
  `,
  
  lg: css`
    padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    min-height: 48px;
  `
};

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $loading: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => 
    `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeInOut}`
  };
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  position: relative;
  overflow: hidden;

  ${({ $variant }) => buttonVariants[$variant]}
  ${({ $size }) => buttonSizes[$size]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    border-color: ${({ theme }) => theme.colors.border.light};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme, $variant }) => 
      $variant === 'primary' ? 
        theme.colors.primary.light + '40' : 
        theme.colors.secondary.light + '40'
    };
  }

  ${({ $loading }) => $loading && css`
    color: transparent;
  `}
`;

const LoadingSpinner = styled.div.attrs({ role: 'status' })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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