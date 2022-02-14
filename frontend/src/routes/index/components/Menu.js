import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary';

// shared components
import ErrorBoundary from '../../../components/ErrorBoundary';
import ErrorRouteFallback from '../../../components/ErrorRouteFallback';
import Loader from '../../../components/Loader';

// local components
import Customization from './Customization';

// styles
import styles from './Menu.module.scss';

const Menu = () => (
  <main className={styles.menu}>
    <ErrorBoundary FallbackComponent={ErrorRouteFallback}>
      <Suspense
        fallback={<Loader style={{ width: '41.5em', paddingTop: '1em' }} />}
      >
        <Outlet />
      </Suspense>
    </ErrorBoundary>
    <Customization />
  </main>
);

export default Menu;
