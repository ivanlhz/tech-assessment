import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Input } from './Input';

describe('Input', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      label: 'Test Label',
      name: 'test-input',
      value: '',
      onChange: vi.fn(),
      ...props,
    };

    return render(
      <ThemeProvider theme={theme}>
        <Input {...defaultProps} />
      </ThemeProvider>
    );
  };

  it('should render the label and input', () => {
    setup();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    const onChange = vi.fn();
    setup({ onChange });

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
