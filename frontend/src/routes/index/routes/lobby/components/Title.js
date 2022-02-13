import PropTypes from 'prop-types';

// styles
import styles from './Title.module.scss';

const Title = ({ children }) => <h2 className={styles.title}>{children}</h2>;
Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
