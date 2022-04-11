import PropTypes from 'prop-types';

// styles
import styles from './ErrorRouteFallback.module.scss';

const ErrorRouteFallback = ({ error }) => (
  <div className={styles.wrapper} role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);
ErrorRouteFallback.propTypes = {
  error: PropTypes.object,
};

export default ErrorRouteFallback;
