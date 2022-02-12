import { useEffect, lazy, Suspense } from 'react';

// assets
import ImgJet from '../../../assets/jet.png';

// shared hooks
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useToggle } from '../../../hooks/useToggle';

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
      <Suspense fallback={<div />}>
        <SelectJet isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      </Suspense>
    </div>
  );
};

export default JetSelected;
