import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { FormField } from './FormField';

describe('FormField component', () => {
  const defaultProps = {
    icon: 'circle-user' as const,
    label: 'Test Label',
    value: 'Test Value',
  };

  it('renders correctly with required props', () => {
    render(
      <ThemeProvider theme={theme}>
        <FormField {...defaultProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
    // Check if the icon is rendered (we can check by its parent's existence)
    expect(screen.getByText('Test Label').closest('div')?.previousSibling).toBeInTheDocument();
  });

  it('displays the correct label and value', () => {
    render(
      <ThemeProvider theme={theme}>
        <FormField {...defaultProps} label="Full Name" value="John Doe" />
      </ThemeProvider>
    );

    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders correctly without an icon', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <FormField label="No Icon Label" value="No Icon Value" />
      </ThemeProvider>
    );

    expect(screen.getByText('No Icon Label')).toBeInTheDocument();
    expect(screen.getByText('No Icon Value')).toBeInTheDocument();
    // Check that no icon is rendered
    const iconWrapper = container.querySelector('div > svg');
    expect(iconWrapper).not.toBeInTheDocument();
  });
});
