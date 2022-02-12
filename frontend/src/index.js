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
const PageNonexistent = lazy(() =>
  import('./routes/nonexistent/PageNonexistent')
);

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
          <Route path="*" element={<PageNonexistent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
