import styled, { ThemeProvider } from 'styled-components';

import NxWelcome from './nx-welcome';
import { theme } from '../theme/theme';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <NxWelcome title="frontend" />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
