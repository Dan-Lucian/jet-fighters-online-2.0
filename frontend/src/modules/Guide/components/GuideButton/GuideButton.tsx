import Styles from 'modules/Guide/components/GuideButton/GuideButton.module.scss';
import { GuideTabEnum } from 'modules/Guide/enums/GuideTabEnum';

interface IGuideButtonProps {
  isActive: boolean;
  tab: GuideTabEnum;
  setTab: (tab: GuideTabEnum) => void;
}

const GuideButton = ({ isActive, tab, setTab }: IGuideButtonProps) => {
  const classNameWrapper = `${Styles.button} ${isActive && Styles['button-active']}`;
  const capitalizedText = tab[0].toUpperCase() + tab.slice(1);
  const handleClick = () => {
    setTab(tab);
  };

  return (
    <button onClick={handleClick} type="button" className={classNameWrapper}>
      {capitalizedText}
    </button>
  );
};

export default GuideButton;
