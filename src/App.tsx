import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { SingleFileNavigation } from './components/layout/SingleFileNavigation';
import { AppRoutes } from './AppRoutes';
import { HeaderVisibilityProvider } from './hooks/useHeaderVisibility';
import { ThemeProvider } from './hooks/useTheme';
import { IS_SINGLE_FILE } from './lib/isSingleFile';

const Router = IS_SINGLE_FILE ? HashRouter : BrowserRouter;

export function App() {
  return (
    <ThemeProvider>
      <HeaderVisibilityProvider>
        <Router>
          <ScrollToTop />
          <SingleFileNavigation />
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </Router>
      </HeaderVisibilityProvider>
    </ThemeProvider>
  );
}
