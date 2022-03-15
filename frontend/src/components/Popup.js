import { useEffect, useRef } from 'react';

// shared hooks
import { useContextGlobal } from '../providers/ProviderGlobal';

// styles
import styles from './Popup.module.scss';

const Popup = () => {
  const [global, setGlobal] = useContextGlobal();
  const msgSaved = useRef(null);

  const { msgPopup } = global;

  useEffect(() => {
    if (msgPopup) {
      msgSaved.current = msgPopup;
    }
  }, [msgPopup, setGlobal]);

  const stylesPopup = msgPopup
    ? `${styles.wrapper} ${styles.visible}`
    : `${styles.wrapper}`;

  const hidePopup = () => {
    setGlobal((prev) => ({ ...prev, msgPopup: null }));
  };

  return (
    <div className={stylesPopup}>
      <p>{msgPopup || msgSaved.current}</p>
      <button onClick={hidePopup} className={styles.btn} type="button">
        <div className={styles.cross} />
      </button>
    </div>
  );
};

export default Popup;
