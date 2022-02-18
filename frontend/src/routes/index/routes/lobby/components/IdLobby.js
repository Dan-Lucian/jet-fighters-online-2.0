import { useState } from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './IdLobby.module.scss';

const IdLobby = ({ idLobby }) => {
  const [isCopied, setIsCopied] = useState();

  const getHandlerClick = () => {
    if (isCopied) return null;

    return () => {
      navigator.clipboard.writeText(idLobby);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    };
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Lobby ID:{' '}
        <button
          onClick={getHandlerClick()}
          className={styles.btn}
          type="button"
        >
          {isCopied && 'Copied'}
          {!isCopied && idLobby}
        </button>
      </h2>
    </div>
  );
};
IdLobby.propTypes = {
  idLobby: PropTypes.string,
};

export default IdLobby;
