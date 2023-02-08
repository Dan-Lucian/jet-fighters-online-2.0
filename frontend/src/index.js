import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import App from './App';
import IndexPage from './routes/index/IndexPage';
import PreLobby from './routes/index/routes/index/PreLobby';

// lazy loaded components
const Lobby = lazy(() => import('./routes/index/routes/lobby/Lobby'));
const AboutPage = lazy(() => import('./routes/about/AboutPage'));
const ProfilePage = lazy(() => import('./routes/profile/ProfilePage'));
const LoginPage = lazy(() => import('./routes/login/LoginPage'));
const RegisterPage = lazy(() => import('./routes/register/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./routes/forgot-password/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./routes/reset-password/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('./routes/verify-email/VerifyEmailPage'));
const PageGame = lazy(() => import('./routes/game/PageGame'));
const PageNonexistent = lazy(() => import('./components/PageNonexistent/PageNonexistent'));

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
          <Route path="/" element={<IndexPage />}>
            <Route path="/" element={<PreLobby />} />
            <Route path="lobby" element={<Lobby />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="profile/:userName" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="game" element={<PageGame />} />
          <Route path="*" element={<PageNonexistent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
