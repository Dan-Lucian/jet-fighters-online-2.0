import PropTypes from 'prop-types';

// local compoenents
import Carousel from './Carousel';
import Preview from './Preview';
import { ProviderJet } from '../providers/ProviderJet';

// styles
import styles from './SelectJet.module.scss';

const SelectJet = ({ isOpen, toggleIsOpen }) => (
  <aside className={`${styles.selectJet} ${isOpen && styles.isOpen}`}>
    <ProviderJet>
      <Carousel />
      <Preview toggleIsOpen={toggleIsOpen} />
    </ProviderJet>
  </aside>
);
SelectJet.propTypes = {
  isOpen: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
};

export default SelectJet;
