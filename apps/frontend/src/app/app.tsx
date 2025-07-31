import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../theme/GlobalStyles';
import { theme } from '../theme/theme';
import { MainTemplate } from '../components/templates/MainTemplate';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const UsersPage = lazy(() =>
  import('../components/pages/UsersPage').then(({ UsersPage }) => ({ default: UsersPage }))
);

const TechInfoPage = lazy(() => 
  import('../components/pages/TechInfoPage').then(({ TechInfoPage }) => ({ default: TechInfoPage }))
);

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <MainTemplate>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/tech-info" element={<TechInfoPage />} />
            </Routes>
          </Suspense>
        </MainTemplate>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;