import { lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { SingleFileNavigation } from './components/layout/SingleFileNavigation';
import { AppRoutes } from './AppRoutes';
import { BotProvider } from './bot/botProvider';
import { CHAT_ENABLED } from './bot/constants';
import { isBotContentEnabled } from './bot/createBotAdapter';
import { HeaderVisibilityProvider } from './hooks/useHeaderVisibility';
import { ThemeProvider } from './hooks/useTheme';
import { IS_SINGLE_FILE } from './lib/isSingleFile';

const ChatWidget = lazy(() =>
  import('./components/chat/ChatWidget').then((module) => ({ default: module.ChatWidget })),
);

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '');
const showChatWidget = CHAT_ENABLED && isBotContentEnabled();

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
      {showChatWidget && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <HeaderVisibilityProvider>
        {IS_SINGLE_FILE ? (
          <HashRouter>
            <BotProvider>
              <AppShell />
            </BotProvider>
          </HashRouter>
        ) : (
          <BrowserRouter basename={routerBasename || undefined}>
            <BotProvider>
              <AppShell />
            </BotProvider>
          </BrowserRouter>
        )}
      </HeaderVisibilityProvider>
    </ThemeProvider>
  );
}
