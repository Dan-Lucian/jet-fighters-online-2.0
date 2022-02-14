import PropTypes from 'prop-types';

// styles
import styles from './IdLobby.module.scss';

const IdLobby = ({ idLobby }) => (
  <h2 className={styles.idLobby}>Lobby ID: {idLobby}</h2>
);
IdLobby.propTypes = {
  idLobby: PropTypes.string,
};

export default IdLobby;
