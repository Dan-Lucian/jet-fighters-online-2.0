import { useEffect } from 'react';
import useToggle from 'hooks/useToggle';
import useOutsideClick from 'hooks/useOutsideClick';
import bookIconSrc from 'assets/images/book.svg';
import GuideMenu from 'modules/Guide/components/GuideMenu/GuideMenu';
import Styles from 'modules/Guide/Guide.module.scss';

const Guide = () => {
  const [isActive, toggleIsActive] = useToggle(false);
  const [ref, isClickOutside] = useOutsideClick();

  // closes the menu if click outside happened
  // using useEffect instead of state directly because button needs callback to modify state
  useEffect(() => {
    if (isClickOutside) toggleIsActive(false);
  }, [isClickOutside, toggleIsActive]);

  const wrapperClassName = `${Styles.wrapper} ${isActive && Styles['wrapper--active']}`;

  return (
    <div ref={ref} className={wrapperClassName}>
      <button onClick={() => toggleIsActive()} className={Styles.button} type="button">
        <img width="22px" height="22px" src={bookIconSrc} alt="book" className={Styles.icon} />
      </button>
      {isActive && <GuideMenu />}
    </div>
  );
};

export default Guide;
