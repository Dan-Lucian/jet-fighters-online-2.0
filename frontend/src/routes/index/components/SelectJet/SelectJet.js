import PropTypes from 'prop-types';

// local compoenents
import Carousel from '../Carousel/Carousel';
import StatsJet from '../StatsJet/StatsJet';

// styles
import styles from './SelectJet.module.scss';

const propTypes = {
  isOpen: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
};

const SelectJet = ({ isOpen, toggleIsOpen }) => (
  <aside className={`${styles.selectJet} ${isOpen && styles.isOpen}`}>
    <div className={styles.wrapperContent}>
      <Carousel />
      <StatsJet toggleIsOpen={toggleIsOpen} />
    </div>
  </aside>
);

SelectJet.propTypes = propTypes;

export default SelectJet;
