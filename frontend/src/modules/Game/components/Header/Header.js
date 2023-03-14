import PropTypes from 'prop-types';

// styles
import styles from './Header.module.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
};

const Header = ({ text }) => <h2 className={styles.header}>{text}</h2>;

Header.propTypes = propTypes;

export default Header;
