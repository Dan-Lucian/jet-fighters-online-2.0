import PropTypes from 'prop-types';

// styles
import styles from './Heading.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Heading = ({ children }) => (
  <h2 className={styles.heading}>{children}</h2>
);

Heading.propTypes = propTypes;

export default Heading;
