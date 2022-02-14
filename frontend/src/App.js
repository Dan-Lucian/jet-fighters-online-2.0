import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// shared components
import WrapperApp from './components/WrapperApp';
import Nav from './components/Nav';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorRouteFallback from './components/ErrorRouteFallback';
import Loader from './components/Loader';
import { ProviderSettings } from './providers/ProviderSettings';

// shared hooks
import { useLocalStorage } from './hooks/useLocalStorage';

// scss styles
import './styles/index.scss';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

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
      <ProviderSettings>
        <ErrorBoundary FallbackComponent={ErrorRouteFallback}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </ProviderSettings>
    </WrapperApp>
  );
};

export default App;
