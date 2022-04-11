import PropTypes from 'prop-types';

// styles
import styles from './TitleSmall.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TitleSmall = ({ children }) => (
  <h2 className={styles.titleSmall}>{children}</h2>
);

TitleSmall.propTypes = propTypes;

export default TitleSmall;
