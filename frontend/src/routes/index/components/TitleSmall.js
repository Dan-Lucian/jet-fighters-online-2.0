import PropTypes from 'prop-types';

import styles from './TitleSmall.module.scss';

const TitleSmall = ({ children }) => (
  <h2 className={styles.titleSmall}>{children}</h2>
);
TitleSmall.propTypes = {
  children: PropTypes.node,
};

export default TitleSmall;
