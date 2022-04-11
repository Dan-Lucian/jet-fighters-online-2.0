import { useEffect, lazy, Suspense } from 'react';

// shared hooks
import useClickOutside from '../../../../hooks/useClickOutside';
import useToggle from '../../../../hooks/useToggle';
import { useContextSettings } from '../../../../providers/ProviderSettings';

// shared components
import ErrorBoundary from '../../../../components/ErrorBoundary/ErrorBoundary';
import ErrorRouteFallback from '../../../../components/ErrorRouteFallback/ErrorRouteFallback';

// styles
import styles from './JetSelected.module.scss';

// lazy loaded components
const SelectJet = lazy(() => import('../SelectJet/SelectJet'));

const JetSelected = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [ref, isClickOutside] = useClickOutside();
  const [settings] = useContextSettings();

  useEffect(() => {
    if (isClickOutside) {
      toggleIsOpen(false);
    }
  }, [isClickOutside, toggleIsOpen]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <h3>Selected Jet</h3>
      <button
        onClick={() => toggleIsOpen()}
        className={styles.btn}
        type="button"
      >
        <img width="48px" height="48px" src={settings.imgJet} alt="jet" />
      </button>
      <ErrorBoundary FallbackComponent={ErrorRouteFallback}>
        <Suspense fallback={<span />}>
          <SelectJet isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default JetSelected;
