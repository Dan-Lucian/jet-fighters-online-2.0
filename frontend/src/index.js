import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import App from './App';
import PageAbout from './routes/about/PageAbout';
import PageIndex from './routes/index/PageIndex';
import PageNonexistent from './routes/nonexistent/PageNonexistent';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PageIndex />} />
          <Route path="about" element={<PageAbout />} />
          <Route path="*" element={<PageNonexistent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
