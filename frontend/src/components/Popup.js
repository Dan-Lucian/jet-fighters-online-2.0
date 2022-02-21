import { useEffect, useRef } from 'react';

// shared hooks
import { useContextGlobal } from '../providers/ProviderGlobal';

// styles
import styles from './Popup.module.scss';

const Popup = () => {
  const [global, setGlobal] = useContextGlobal();
  const msgPrevious = useRef(null);

  const { msgPopup } = global;

  useEffect(() => {
    if (msgPopup) {
      msgPrevious.current = msgPopup;
      const idTimeout = setTimeout(() => {
        setGlobal((prev) => ({ ...prev, msgPopup: null }));
      }, 2500);

      return () => clearTimeout(idTimeout);
    }
  }, [msgPopup, setGlobal]);

  const stylesPopup = msgPopup
    ? `${styles.wrapper} ${styles.visible}`
    : `${styles.wrapper}`;

  return <div className={stylesPopup}>{msgPopup || msgPrevious.current}</div>;
};

export default Popup;
