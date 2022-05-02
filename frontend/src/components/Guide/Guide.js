import { useEffect } from 'react';

// shared hooks
import useToggle from '../../hooks/useToggle';
import useOutsideClick from '../../hooks/useOutsideClick';

// styles
import styles from './Guide.module.scss';

// assets
import srcBook from '../../assets/images/book.svg';

// shared components
import { Menu } from './Menu';

const Guide = () => {
  const [isActive, toggleIsActive] = useToggle(false);
  const [ref, isClickOutside] = useOutsideClick();

  // closes the menu if click outside happened
  useEffect(() => {
    if (isClickOutside) toggleIsActive(false);
  }, [isClickOutside, toggleIsActive]);

  const classNameWrapper = `${styles.wrapper} ${
    isActive && styles['wrapper--active']
  }`;

  return (
    <div ref={ref} className={classNameWrapper}>
      <button
        onClick={() => toggleIsActive()}
        className={styles.button}
        type="button"
      >
        <img
          width="22px"
          height="22px"
          src={srcBook}
          alt="magnifying glass"
          className={styles.icon}
        />
      </button>
      {isActive && <Menu />}
    </div>
  );
};

export { Guide };
