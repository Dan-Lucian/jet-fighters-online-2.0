import PropTypes from 'prop-types';

// styles
import styles from './BtnSubmit.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

const BtnSubmit = ({ disabled, children }) => (
  <button disabled={disabled} type="submit" className={styles.btn}>
    {children}
  </button>
);

BtnSubmit.propTypes = propTypes;

export default BtnSubmit;
