import PropTypes from 'prop-types';

// assets
import ImgJet from '../../../assets/jet.png';

// styles
import styles from './Jet.module.scss';

const Jet = ({ onClick }) => (
  <button onClick={onClick} className={styles.jet} type="button">
    <img src={ImgJet} alt="jet" />
  </button>
);
Jet.propTypes = {
  onClick: PropTypes.func,
};

export default Jet;
