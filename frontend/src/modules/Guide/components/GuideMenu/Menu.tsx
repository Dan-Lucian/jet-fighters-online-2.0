import useLocalStorage from 'hooks/useLocalStorage';
import GuideButton from 'modules/Guide/components/GuideButton/GuideButton';
import Styles from 'modules/Guide/components/GuideMenu/GuideMenu.module.scss';

const GuideMenu = () => {
  const [tab, setTab]: [tab: keyof typeof text, setTab: (s: string) => void] = useLocalStorage(
    'tabInGuideMenu',
    'create'
  );

  return (
    <div className={Styles.wrapper}>
      <h2 className={Styles.title}>Website guide</h2>
      <ul className={Styles.listButtons}>
        {Object.keys(text).map((buttonName, idx) => (
          <li key={idx}>
            <GuideButton tab={tab} setTab={setTab} text={buttonName} />
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
  create: {
    title: 'Create a game:',
    items: [
      'Create a lobby.',
      'Share the code with a friend.',
      'Customize game settings.',
      'Press "Ready" button.',
      'Press "Start" button when both players are ready.',
    ],
  },
  join: {
    title: 'Join a game:',
    items: [
      'Paste the received code.',
      'Press "Join a lobby"',
      'Customize game settings.',
      'Press "Ready" button.',
      'Press "Start" button when both players are ready.',
    ],
  },
  play: {
    title: 'Play the game:',
    items: ['Left arrow - steer left.', 'Right arrow - steer right.', 'Spacebar - shoot.'],
  },
};

export default GuideMenu;
