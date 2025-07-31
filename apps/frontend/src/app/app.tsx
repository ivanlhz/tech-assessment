import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../theme/GlobalStyles';
import { theme } from '../theme/theme';
import { UsersPage } from '../components/pages/UsersPage';
import { MainTemplate } from '../components/templates/MainTemplate';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainTemplate>
        <UsersPage />
      </MainTemplate>
    </ThemeProvider>
  );
}

export default App;