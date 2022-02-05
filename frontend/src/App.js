import { Outlet } from 'react-router-dom';

// shared components
import WrapperApp from './components/WrapperApp';
import Nav from './components/Nav';

// shared hooks
import { useLocalStorage } from './hooks/useLocalStorage';

// scss styles
import './styles/index.scss';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

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
    <WrapperApp theme={theme}>
      <Nav theme={theme} getTogglerTheme={getTogglerTheme} />
      <Outlet />
    </WrapperApp>
  );
};

export default App;
