import { useEffect } from 'react';

// shared hooks
import { useContextGlobal } from '../providers/ProviderGlobal';

// styles
import styles from './Popup.module.scss';

const Popup = () => {
  const [global, setGlobal] = useContextGlobal();

  const { msgPopup } = global;

  useEffect(() => {
    let idTimeout;
    if (msgPopup) {
      idTimeout = setTimeout(() => {
        setGlobal((prev) => ({ ...prev, msgPopup: null }));
      }, 2000);
    }

    return () => clearTimeout(idTimeout);
  }, [msgPopup, setGlobal]);

  const stylesPopup = msgPopup
    ? `${styles.wrapper} ${styles.visible}`
    : `${styles.wrapper}`;

  return <div className={stylesPopup}>{msgPopup}</div>;
};

export default Popup;
