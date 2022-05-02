// shared hooks
import useToggle from '../../hooks/useToggle';

// styles
import styles from './Guide.module.scss';

// assets
import srcBook from '../../assets/images/book.svg';

const Guide = () => {
  const [isActive, toggleIsActive] = useToggle(false);

  return (
    <div className={styles.wrapper}>
      {' '}
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
    </div>
  );
};

export { Guide };
