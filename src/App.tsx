import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { AppRoutes } from './AppRoutes';
import { HeaderVisibilityProvider } from './hooks/useHeaderVisibility';
import { ThemeProvider } from './hooks/useTheme';

export function App() {
  return (
    <ThemeProvider>
      <HeaderVisibilityProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </BrowserRouter>
      </HeaderVisibilityProvider>
    </ThemeProvider>
  );
}
