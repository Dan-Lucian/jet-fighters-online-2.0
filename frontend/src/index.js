import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import App from './App';
import PageIndex from './routes/index/PageIndex';
import PreLobby from './routes/index/routes/index/PreLobby';

// lazy loaded components
const Lobby = lazy(() => import('./routes/index/routes/lobby/Lobby'));
const PageAbout = lazy(() => import('./routes/about/PageAbout'));
const PageProfile = lazy(() => import('./routes/profile/PageProfile'));
const PageLogin = lazy(() => import('./routes/login/PageLogin'));
const PageRegister = lazy(() => import('./routes/register/PageRegister'));
const PageForgotPassword = lazy(() =>
  import('./routes/forgot-password/PageForgotPassword')
);
const PageResetPassword = lazy(() =>
  import('./routes/reset-password/PageResetPassword')
);
const PageVerifyEmail = lazy(() =>
  import('./routes/verify-email/PageVerifyEmail')
);
const PageGame = lazy(() => import('./routes/game/PageGame'));
const PageNonexistent = lazy(() =>
  import('./components/PageNonexistent/PageNonexistent')
);

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.debug = () => {};
}

// <Suspense> is put around <Outlet> in App
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
          <Route path="profile/:userName" element={<PageProfile />} />
          <Route path="login" element={<PageLogin />} />
          <Route path="register" element={<PageRegister />} />
          <Route path="verify-email" element={<PageVerifyEmail />} />
          <Route path="forgot-password" element={<PageForgotPassword />} />
          <Route path="reset-password" element={<PageResetPassword />} />
          <Route path="game" element={<PageGame />} />
          <Route path="*" element={<PageNonexistent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
