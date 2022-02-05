import PropTypes from 'prop-types';

import styles from './WrapperApp.module.scss';

const WrapperApp = ({ theme, ...props }) => (
  <div data-theme={theme} className={styles.wrapperApp} {...props} />
);
WrapperApp.propTypes = {
  theme: PropTypes.string,
};

export default WrapperApp;
