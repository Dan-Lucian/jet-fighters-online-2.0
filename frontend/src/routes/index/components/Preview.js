import PropTypes from 'prop-types';

// local components
import WrapperStats from './WrapperStats';
import WrapperColors from './WrapperColors';

import styles from './Preview.module.scss';

const Preview = ({ toggleIsOpen }) => (
  <div className={styles.preview}>
    <WrapperStats />
    <WrapperColors toggleIsOpen={toggleIsOpen} />
  </div>
);
Preview.propTypes = {
  toggleIsOpen: PropTypes.func,
};

export default Preview;
