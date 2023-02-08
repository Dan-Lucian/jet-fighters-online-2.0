import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import ErrorRouteFallback from 'components/ErrorRouteFallback/ErrorRouteFallback';
import Loader from 'components/Loader/Loader';
import Customization from 'routes/index/components/Customization/Customization';
import Styles from 'routes/index/IndexPage.module.scss';

const IndexPage = () => (
  <main className={Styles.menu}>
    <ErrorBoundary FallbackComponent={ErrorRouteFallback}>
      <Suspense fallback={<Loader style={{ width: '41.5em', paddingTop: '1em' }} />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
    <Customization />
  </main>
);

export default IndexPage;
