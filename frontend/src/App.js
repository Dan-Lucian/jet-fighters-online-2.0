import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

// shared components
import TogglerTheme from './components/TogglerTheme';

// shared hooks
import { useLocalStorage } from './hooks/useLocalStorage';

// scss styles
import './styles/reset.scss';
import './styles/colors.scss';
import './styles/global.scss';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

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
      <TogglerTheme theme={theme} getTogglerTheme={getTogglerTheme} />
      <nav>
        <Link to="/">To index</Link>
        <Link to="/about">To about</Link>
        <Link to="/asadasd">To nonexistent</Link>
        <Outlet />
      </nav>
    </>
  );
};

export default App;
