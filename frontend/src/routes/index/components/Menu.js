import { Outlet } from 'react-router-dom';

// local components
import Customization from './Customization';

import styles from './Menu.module.scss';

const Menu = () => (
  <main className={styles.menu}>
    <Outlet />
    <Customization />
  </main>
);

export default Menu;
