import PropTypes from 'prop-types';

// styles
import styles from './Title.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Title = ({ children }) => <h1 className={styles.title}>{children}</h1>;

Title.propTypes = propTypes;

export default Title;
