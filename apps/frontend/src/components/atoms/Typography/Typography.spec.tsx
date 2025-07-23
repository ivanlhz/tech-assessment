import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { Typography } from './Typography';

describe('Typography component', () => {
  it('renders with default props', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography>Default Text</Typography>
      </ThemeProvider>
    );

    const textElement = screen.getByText('Default Text');
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
  });

  it('renders with a different element using "as" prop', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography as="h1">Heading 1</Typography>
      </ThemeProvider>
    );

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Heading 1');
  });

  it('applies the correct variant styles', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography variant="h1">H1 Variant</Typography>
      </ThemeProvider>
    );

    const element = screen.getByText('H1 Variant');
    expect(element).toHaveStyle(`font-size: ${theme.typography.fontSize['4xl']}`);
    expect(element).toHaveStyle(`font-weight: ${theme.typography.fontWeight.bold}`);
  });

  it('applies custom color', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography color="primary">Primary Color</Typography>
      </ThemeProvider>
    );

    const element = screen.getByText('Primary Color');
    expect(element).toHaveStyle(`color: ${theme.colors.primary}`);
  });

  it('applies custom font weight', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography fontWeight="semibold">Semibold Text</Typography>
      </ThemeProvider>
    );

    const element = screen.getByText('Semibold Text');
    expect(element).toHaveStyle(`font-weight: ${theme.typography.fontWeight.semibold}`);
  });
});
