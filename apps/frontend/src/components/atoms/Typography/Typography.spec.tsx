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
});
