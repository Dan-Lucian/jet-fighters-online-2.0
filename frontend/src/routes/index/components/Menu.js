import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary';

// shared components
import ErrorBoundary from '../../../components/ErrorBoundary';
import ErrorRouteFallback from '../../../components/ErrorRouteFallback';

// local components
import Customization from './Customization';

// styles
import styles from './Menu.module.scss';

const Menu = () => (
  <main className={styles.menu}>
    <ErrorBoundary FallbackComponent={ErrorRouteFallback}>
      <Suspense fallback={<div style={{ width: '41.5em' }}>Loading...</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
    <Customization />
  </main>
);

export default Menu;
