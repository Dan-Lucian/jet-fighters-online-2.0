import PropTypes from 'prop-types';

// styles
import styles from './Button.module.scss';

const propTypes = {
  tab: PropTypes.string,
  setTab: PropTypes.func,
  children: PropTypes.string,
};

const Button = ({ tab, setTab, children }) => {
  const handleClick = () => {
    setTab(children);
  };

  const isActive = children === tab;
  const classNameWrapper = `${styles.button} ${
    isActive && styles['button-active']
  }`;

  const text = children[0].toUpperCase() + children.slice(1);

  return (
    <button onClick={handleClick} type="button" className={classNameWrapper}>
      {text}
    </button>
  );
};

Button.propTypes = propTypes;

export { Button };
