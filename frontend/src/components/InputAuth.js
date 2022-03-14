import PropTypes from 'prop-types';

// styles
import styles from './InputAuth.module.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  undertext: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const InputAuth = ({ id, type, label, undertext, pattern, name }) => (
  <div className={styles.wrapper}>
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
    <div className={styles.wrapperInner}>
      <input
        required
        pattern={pattern}
        className={styles.input}
        id={id}
        type={type}
        name={name}
      />
      <p className={styles.undertext}>{undertext}</p>
    </div>
  </div>
);

InputAuth.propTypes = propTypes;

export default InputAuth;
