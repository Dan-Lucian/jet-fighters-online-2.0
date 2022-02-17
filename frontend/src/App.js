import { Suspense, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';

// shared components
import WrapperApp from './components/WrapperApp';
import WrapperPage from './components/WrapperPage';
import Nav from './components/Nav';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorRouteFallback from './components/ErrorRouteFallback';
import Loader from './components/Loader';
import { ProviderSettings } from './providers/ProviderSettings';
import { ProviderWebsocket } from './providers/ProviderWebsocket';
import { ProviderGame } from './providers/ProviderGame';
import { ProviderUser } from './providers/ProviderUser';

// shared hooks
import { useLocalStorage } from './hooks/useLocalStorage';

// scss styles
import './styles/index.scss';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
  });

  const getTogglerTheme = () => {
    switch (theme) {
      case 'dark':
        return () => setTheme('light');

      case 'light':
        return () => setTheme('dark');

      default:
        return () => console.log('no such theme');
    }
  };

  return (
    <WrapperApp theme={theme}>
      <Nav theme={theme} getTogglerTheme={getTogglerTheme} />
      <WrapperPage>
        <ProviderUser>
          <ProviderSettings>
            <ProviderGame>
              <ProviderWebsocket>
                <ErrorBoundary FallbackComponent={ErrorRouteFallback}>
                  <Suspense fallback={<Loader />}>
                    <Outlet />
                  </Suspense>
                </ErrorBoundary>
              </ProviderWebsocket>
            </ProviderGame>
          </ProviderSettings>
        </ProviderUser>
      </WrapperPage>
    </WrapperApp>
  );
};

export default App;
