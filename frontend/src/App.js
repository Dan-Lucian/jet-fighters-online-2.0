import { Link, Outlet } from 'react-router-dom';

import './reset.scss';
import './App.scss';

const App = () => (
  <div>
    <Link to="/">To index</Link>
    <Link to="/about">To about</Link>
    <Link to="/asadasd">To nonexistent</Link>
    <Outlet />
  </div>
);

export default App;
