import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../theme/GlobalStyles';
import { theme } from '../theme/theme';
import { UsersPage } from '../components/pages/UsersPage';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <UsersPage />
    </ThemeProvider>
  );
}

export default App;