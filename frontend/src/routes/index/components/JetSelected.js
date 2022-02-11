import { useEffect } from 'react';

// assets
import ImgJet from '../../../assets/jet.png';

// local components
import SelectJet from './SelectJet';

// shared hooks
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useToggle } from '../../../hooks/useToggle';

// styles
import styles from './JetSelected.module.scss';

const JetSelected = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [ref, isClickOutside] = useClickOutside();

  useEffect(() => {
    if (isClickOutside) {
      toggleIsOpen();
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
      <SelectJet isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
    </div>
  );
};

export default JetSelected;
