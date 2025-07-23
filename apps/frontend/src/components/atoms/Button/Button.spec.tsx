import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { Button, ButtonProps } from './Button';
import 'jest-styled-components';
import { theme } from '../../../theme';

const renderWithTheme = (props: ButtonProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>
  );
};

describe('Button component', () => {
  it('should render with default props', () => {
    renderWithTheme({ children: 'Click me' });
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyleRule('background-color', theme.colors.primary.main);
    expect(button).toHaveStyleRule('padding', `${theme.spacing[3]} ${theme.spacing[4]}`);
  });

  it('should render a secondary button', () => {
    renderWithTheme({ children: 'Secondary', variant: 'secondary' });
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveStyleRule('background-color', 'transparent');
    expect(button).toHaveStyleRule('color', theme.colors.secondary.main);
  });

  it('should render a ghost button', () => {
    renderWithTheme({ children: 'Ghost', variant: 'ghost' });
    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toHaveStyleRule('background-color', 'transparent');
    expect(button).toHaveStyleRule('color', theme.colors.text.primary);
  });
  
  it('should render a danger button', () => {
    renderWithTheme({ children: 'Danger', variant: 'danger' });
    const button = screen.getByRole('button', { name: /danger/i });
    expect(button).toHaveStyleRule('background-color', theme.colors.status.error);
    expect(button).toHaveStyleRule('color', theme.colors.neutral.white);
  });

  it('should render a small button', () => {
    renderWithTheme({ children: 'Small', size: 'sm' });
    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveStyleRule('padding', `${theme.spacing[2]} ${theme.spacing[3]}`);
    expect(button).toHaveStyleRule('font-size', theme.typography.fontSize.sm);
  });

  it('should render a large button', () => {
    renderWithTheme({ children: 'Large', size: 'lg' });
    const button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveStyleRule('padding', `${theme.spacing[4]} ${theme.spacing[6]}`);
    expect(button).toHaveStyleRule('font-size', theme.typography.fontSize.lg);
  });

  it('should render a full width button', () => {
    renderWithTheme({ children: 'Full Width', fullWidth: true });
    const button = screen.getByRole('button', { name: /full width/i });
    expect(button).toHaveStyleRule('width', '100%');
  });

    it('should render a disabled button', () => {
    renderWithTheme({ children: 'Disabled', disabled: true });
    
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveStyleRule('cursor', 'not-allowed', { modifier: ':disabled' }); // Esto es un poco tricky, sino le pones modifier: ':disabled' no funciona el test pq no coje pseudoclases
  });

  it('should render in a loading state', () => {
    renderWithTheme({ children: 'Loading', loading: true });
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    // The spinner is present, but the text is visually hidden
    expect(button).toHaveStyleRule('color', 'transparent');
    // Check for the spinner via a test id or role if available
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should render with left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const RightIcon = () => <span data-testid="right-icon">R</span>;
    renderWithTheme({ children: 'Icons', leftIcon: <LeftIcon />, rightIcon: <RightIcon /> });
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should not render icons when loading', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    renderWithTheme({ children: 'No Icons', loading: true, leftIcon: <LeftIcon /> });
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme({ children: 'Clickable', onClick: handleClick });
    const button = screen.getByRole('button', { name: /clickable/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick handler when disabled', () => {
    const handleClick = vi.fn();
    renderWithTheme({ children: 'Not Clickable', onClick: handleClick, disabled: true });
    const button = screen.getByRole('button', { name: /not clickable/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  it('should not call onClick handler when loading', () => {
    const handleClick = vi.fn();
    renderWithTheme({ children: 'Not Clickable', onClick: handleClick, loading: true });
    const button = screen.getByRole('button', { name: /not clickable/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
