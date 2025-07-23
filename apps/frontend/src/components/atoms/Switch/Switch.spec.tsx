import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Switch } from './Switch';
import { theme } from '../../../theme';
import userEvent from '@testing-library/user-event'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Switch', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <Switch 
        checked={false} 
        onChange={() => {}} 
        label="Test Switch"
        data-testid="switch"
      />
    );
    
    expect(screen.getByTestId('switch')).toBeInTheDocument();
    expect(screen.getByText('Test Switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    renderWithTheme(
      <Switch 
        checked={false} 
        onChange={handleChange} 
        label="Test Switch"
        data-testid="switch"
      />
    );
    
    await user.click(screen.getByTestId('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('is keyboard navigable', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    renderWithTheme(
      <Switch 
        checked={false} 
        onChange={handleChange} 
        label="Test Switch"
        data-testid="switch"
      />
    );
    
    const switchElement = screen.getByTestId('switch');
    
    await user.tab();
    expect(switchElement).toHaveFocus();
    
    await user.keyboard(' ');
    expect(handleChange).toHaveBeenCalledWith(true);
    
    handleChange.mockClear();
    await user.keyboard('{Enter}');
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    const handleChange = vi.fn();
    
    renderWithTheme(
      <Switch 
        checked={false} 
        onChange={handleChange} 
        disabled
        label="Disabled Switch"
        data-testid="switch"
      />
    );
    
    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveAttribute('aria-disabled', 'true');
    
    fireEvent.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders different sizes correctly', () => {
    const { rerender } = renderWithTheme(
      <Switch 
        checked={false} 
        onChange={() => {}} 
        size="sm"
        data-testid="switch"
      />
    );
    
    expect(screen.getByTestId('switch')).toBeInTheDocument();
    
    rerender(
      <ThemeProvider theme={theme}>
        <Switch 
          checked={false} 
          onChange={() => {}} 
          size="lg"
          data-testid="switch"
        />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });

  it('works without label', () => {
    renderWithTheme(
      <Switch 
        checked={false} 
        onChange={() => {}} 
        aria-label="Switch without visible label"
        data-testid="switch"
      />
    );
    
    expect(screen.getByTestId('switch')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch without visible label')).toBeInTheDocument();
  });
});