import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// shared components
import AppWrapper from './components/AppWrapper/AppWrapper';
import PageWrapper from './components/PageWrapper/PageWrapper';
import Nav from './components/Nav/Nav';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorRouteFallback from './components/ErrorRouteFallback/ErrorRouteFallback';
import Loader from './components/Loader/Loader';
import Popup from './components/Popup/Popup';
import { ProviderSettings } from './providers/ProviderSettings';
import { ProviderWebsocket } from './providers/ProviderWebsocket';
import { ProviderLobby } from './providers/ProviderLobby';
import { ProviderGlobal } from './providers/ProviderGlobal';
import { ProviderAuth } from './providers/ProviderAuth';
import { ProviderTheme } from './providers/ProviderTheme';

// styles
import './styles/index.scss';
import PhoneOverlay from './components/PhoneOverlay/PhoneOverlay';

const App = () => (
  <ProviderGlobal>
    <ProviderTheme>
      <AppWrapper>
        <ProviderAuth>
          <Nav />
          <PhoneOverlay />
          <PageWrapper>
            <ProviderSettings>
              <ProviderLobby>
                <ProviderWebsocket>
                  <ErrorBoundary FallbackComponent={ErrorRouteFallback}>
                    <Suspense fallback={<Loader />}>
                      <Outlet />
                    </Suspense>
                  </ErrorBoundary>
                </ProviderWebsocket>
              </ProviderLobby>
            </ProviderSettings>
          </PageWrapper>
          <Popup />
        </ProviderAuth>
      </AppWrapper>
    </ProviderTheme>
  </ProviderGlobal>
);

export default App;
