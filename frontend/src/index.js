import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import App from './App';
import PageIndex from './routes/index/PageIndex';
import PreLobby from './routes/index/routes/index/PreLobby';

// lazy loaded components
const Lobby = lazy(() => import('./routes/index/routes/lobby/Lobby'));
const PageAbout = lazy(() => import('./routes/about/PageAbout'));
const PageLogin = lazy(() => import('./routes/login/PageLogin'));
const PageGame = lazy(() => import('./routes/game/PageGame'));
const PageNonexistent = lazy(() =>
  import('./routes/nonexistent/PageNonexistent')
);

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

// <Suspense> is put around outlets inside components and not here because
// Error if attempt to put <Suspense> around nested routes here
// and nested routes are needed in order to save the same nav throught the app
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<PageIndex />}>
            <Route path="/" element={<PreLobby />} />
            <Route path="lobby" element={<Lobby />} />
          </Route>
          <Route path="about" element={<PageAbout />} />
          <Route path="login" element={<PageLogin />} />
          <Route path="game" element={<PageGame />} />
          <Route path="*" element={<PageNonexistent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
