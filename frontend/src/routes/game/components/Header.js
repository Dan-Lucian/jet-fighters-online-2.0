import PropTypes from 'prop-types';

// styles
import styles from './Header.module.scss';

const Header = ({ text }) => <h2 className={styles.header}>{text}</h2>;
Header.propTypes = {
  text: PropTypes.string,
};

export default Header;
