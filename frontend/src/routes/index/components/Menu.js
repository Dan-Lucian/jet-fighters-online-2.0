import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// local components
import Customization from './Customization';

import styles from './Menu.module.scss';

const Menu = () => (
  <main className={styles.menu}>
    <Suspense fallback={<div style={{ width: '41.5em' }}>Loading...</div>}>
      <Outlet />
    </Suspense>
    <Customization />
  </main>
);

export default Menu;
