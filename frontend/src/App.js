import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// shared components
import WrapperApp from './components/WrapperApp/WrapperApp';
import WrapperPage from './components/WrapperPage/WrapperPage';
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
import OverlayPhone from './components/OverlayPhone/OverlayPhone';

const App = () => (
  <ProviderGlobal>
    <ProviderTheme>
      <WrapperApp>
        <ProviderAuth>
          <Nav />
          <OverlayPhone />
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
