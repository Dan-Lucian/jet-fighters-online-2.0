import { Suspense, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';

// shared components
import WrapperApp from './components/WrapperApp';
import WrapperPage from './components/WrapperPage';
import Nav from './components/Nav';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorRouteFallback from './components/ErrorRouteFallback';
import Loader from './components/Loader';
import Popup from './components/Popup';
import { ProviderSettings } from './providers/ProviderSettings';
import { ProviderWebsocket } from './providers/ProviderWebsocket';
import { ProviderLobby } from './providers/ProviderLobby';
import { ProviderGlobal } from './providers/ProviderGlobal';
import { ProviderAuth } from './providers/ProviderAuth';
import { ProviderTheme } from './providers/ProviderTheme';

// scss styles
import './styles/index.scss';

const App = () => (
  <ProviderGlobal>
    <ProviderTheme>
      <WrapperApp>
        <ProviderAuth>
          <Nav />
          <WrapperPage>
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
          </WrapperPage>
          <Popup />
        </ProviderAuth>
      </WrapperApp>
    </ProviderTheme>
  </ProviderGlobal>
);

export default App;
