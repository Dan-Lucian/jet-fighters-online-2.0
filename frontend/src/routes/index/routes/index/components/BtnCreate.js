import PropTypes from 'prop-types';

// styles
import styles from './BtnCreate.module.scss';

const BtnCreate = ({ onClick }) => (
  <button onClick={onClick} className={styles.btnCreate} type="button">
    Create a lobby
  </button>
);
BtnCreate.propTypes = {
  onClick: PropTypes.func,
};

export default BtnCreate;
