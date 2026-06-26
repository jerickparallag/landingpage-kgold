import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { SingleFileNavigation } from './components/layout/SingleFileNavigation';
import { AppRoutes } from './AppRoutes';
import { HeaderVisibilityProvider } from './hooks/useHeaderVisibility';
import { ThemeProvider } from './hooks/useTheme';
import { IS_SINGLE_FILE } from './lib/isSingleFile';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '');

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <SingleFileNavigation />
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <HeaderVisibilityProvider>
        {IS_SINGLE_FILE ? (
          <HashRouter>
            <AppShell />
          </HashRouter>
        ) : (
          <BrowserRouter basename={routerBasename || undefined}>
            <AppShell />
          </BrowserRouter>
        )}
      </HeaderVisibilityProvider>
    </ThemeProvider>
  );
}
