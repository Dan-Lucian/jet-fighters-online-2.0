import PropTypes from 'prop-types';

import styles from './Title.module.scss';

const Title = ({ children }) => <h1 className={styles.title}>{children}</h1>;
Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
