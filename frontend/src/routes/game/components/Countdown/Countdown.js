import { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './Countdown.module.scss';

const Countdown = ({ handleCountownEnd }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const idInterval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, []);

  useLayoutEffect(() => {
    if (count < 1) handleCountownEnd();
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.count}>{count}</div>
    </div>
  );
};
Countdown.propTypes = {
  handleCountownEnd: PropTypes.func,
};

export default Countdown;
