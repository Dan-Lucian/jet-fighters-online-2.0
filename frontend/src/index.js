import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import App from './App';
import PageAbout from './routes/about/PageAbout';
import PageIndex from './routes/index/PageIndex';
import PageLogin from './routes/login/PageLogin';
import PageNonexistent from './routes/nonexistent/PageNonexistent';
import Lobby from './routes/index/routes/lobby/Lobby';
import PreLobby from './routes/index/routes/index/PreLobby';

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
