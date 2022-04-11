import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// shared components
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import ErrorRouteFallback from '../../components/ErrorRouteFallback/ErrorRouteFallback';
import Loader from '../../components/Loader/Loader';

// local components
import Customization from './components/Customization/Customization';

// styles
import styles from './PageIndex.module.scss';

const PageIndex = () => (
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

export default PageIndex;
