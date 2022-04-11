import PropTypes from 'prop-types';
import styles from './Heading.module.scss';

const Heading = ({ children }) => (
  <h2 className={styles.heading}>{children}</h2>
);
Heading.propTypes = {
  children: PropTypes.node,
};

export default Heading;
