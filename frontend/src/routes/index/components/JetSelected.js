import { useEffect, lazy, Suspense } from 'react';

// assets
import ImgJet from '../../../assets/jet-black.webp';

// shared hooks
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useToggle } from '../../../hooks/useToggle';

// shared components
import ErrorBoundary from '../../../components/ErrorBoundary';
import ErrorRouteFallback from '../../../components/ErrorRouteFallback';

// styles
import styles from './JetSelected.module.scss';

// lazy loaded components
const SelectJet = lazy(() => import('./SelectJet'));

const JetSelected = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [ref, isClickOutside] = useClickOutside();

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
        <img src={ImgJet} alt="jet" />
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
