import Styles from 'modules/Guide/components/GuideButton/GuideButton.module.scss';

interface IGuideButtonProps {
  tab: string;
  text: string;
  setTab: (text: string) => void;
}

const GuideButton = ({ tab, text, setTab }: IGuideButtonProps) => {
  const handleClick = () => {
    setTab(text);
  };

  const isActive = text === tab;
  const classNameWrapper = `${Styles.button} ${isActive && Styles['button-active']}`;

  const capitalizedText = text[0].toUpperCase() + text.slice(1);

  return (
    <button onClick={handleClick} type="button" className={classNameWrapper}>
      {capitalizedText}
    </button>
  );
};

export default GuideButton;
