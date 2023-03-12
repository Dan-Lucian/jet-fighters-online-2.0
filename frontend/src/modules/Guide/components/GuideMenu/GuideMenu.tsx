import useLocalStorage from 'hooks/useLocalStorage';
import GuideButton from 'modules/Guide/components/GuideButton/GuideButton';
import Styles from 'modules/Guide/components/GuideMenu/GuideMenu.module.scss';
import { GuideTabEnum } from 'modules/Guide/enums/GuideTabEnum';

const GuideMenu = () => {
  const [tab, setTab]: [tab: GuideTabEnum, setTab: (tab: GuideTabEnum) => void] = useLocalStorage(
    'tabInGuideMenu',
    GuideTabEnum.Create
  );

  return (
    <div className={Styles.wrapper}>
      <h2 className={Styles.title}>Website guide</h2>
      <ul className={Styles.listButtons}>
        {Object.keys(text).map((buttonName, idx) => (
          <li key={idx}>
            <GuideButton isActive={buttonName === tab} tab={buttonName as GuideTabEnum} setTab={setTab} />
          </li>
        ))}
      </ul>
      <div className={Styles.innerWrapper}>
        <h3 className={Styles.subtitle}>{text[tab].title}</h3>
        <ol className={Styles.listItems}>
          {text[tab].items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const text = {
  [GuideTabEnum.Create]: {
    title: 'Create a game:',
    items: [
      'Create a lobby.',
      'Share the code with a friend.',
      'Customize game settings.',
      'Press "Ready" button.',
      'Press "Start" button when both players are ready.',
    ],
  },
  [GuideTabEnum.Join]: {
    title: 'Join a game:',
    items: [
      'Paste the received code.',
      'Press "Join a lobby"',
      'Customize game settings.',
      'Press "Ready" button.',
      'Press "Start" button when both players are ready.',
    ],
  },
  [GuideTabEnum.Play]: {
    title: 'Play the game:',
    items: ['Left arrow - steer left.', 'Right arrow - steer right.', 'Spacebar - shoot.'],
  },
};

export default GuideMenu;
