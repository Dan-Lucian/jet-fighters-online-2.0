import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

// shared components
import TogglerTheme from './components/TogglerTheme';
import Nav from './components/Nav';

// shared hooks
import { useLocalStorage } from './hooks/useLocalStorage';

// scss styles
import './styles/reset.scss';
import './styles/colors.scss';
import './styles/global.scss';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  // not changing theme in another way because I need the <body>
  // making <App> 100% height will lead to problems with scrollbars in future
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
    <>
      <Nav theme={theme} getTogglerTheme={getTogglerTheme} />
      <Outlet />
    </>
  );
};

export default App;
