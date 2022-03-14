import PropTypes from 'prop-types';

// styles
import styles from './FormAuth.module.scss';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const FormAuth = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className={styles.form}>
    {children}
  </form>
);

FormAuth.propTypes = propTypes;

export default FormAuth;
