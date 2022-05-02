import useLocalStorage from '../../hooks/useLocalStorage';

// styles
import styles from './Menu.module.scss';

// local components
import { Button } from './Button';

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
    items: [
      'Left arrow - steer left.',
      'Right arrow - steer right.',
      'Spacebar - shoot.',
    ],
  },
};

const Menu = () => {
  const [tab, setTab] = useLocalStorage('tabInGuideMenu', 'create');

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Game guide</h2>
      <ul className={styles.listButtons}>
        {Object.keys(text).map((nameButton, idx) => (
          <li key={idx}>
            <Button tab={tab} setTab={setTab}>
              {nameButton}
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles.wrapperInner}>
        <h3 className={styles.subtitle}>{text[tab].title}</h3>
        <ol className={styles.listItems}>
          {text[tab].items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export { Menu };
