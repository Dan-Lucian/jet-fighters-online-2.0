import PropTypes from 'prop-types';

// local compoenents
import Carousel from './Carousel';
import StatsJet from './StatsJet';

// styles
import styles from './SelectJet.module.scss';

const SelectJet = ({ isOpen, toggleIsOpen }) => (
  <aside className={`${styles.selectJet} ${isOpen && styles.isOpen}`}>
    <Carousel />
    <StatsJet toggleIsOpen={toggleIsOpen} />
  </aside>
);
SelectJet.propTypes = {
  isOpen: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
};

export default SelectJet;
