import PropTypes from 'prop-types';

// styles
import styles from './BtnJoin.module.scss';

const BtnJoin = ({ onClick }) => (
  <button onClick={onClick} className={styles.btnJoin} type="button">
    Join a lobby
  </button>
);
BtnJoin.propTypes = {
  onClick: PropTypes.func,
};

export default BtnJoin;
