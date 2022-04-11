import PropTypes from 'prop-types';

// styles
import styles from './ErrorRouteFallback.module.scss';

const propTypes = {
  error: PropTypes.object.isRequired,
};

const ErrorRouteFallback = ({ error }) => (
  <div className={styles.wrapper} role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);

ErrorRouteFallback.propTypes = propTypes;

export default ErrorRouteFallback;
