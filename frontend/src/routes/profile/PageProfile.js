import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';

// shared components
import PageNonexistent from '../../components/PageNonexistent';

// styles
import styles from './PageProfile.module.scss';

// assets
import { typesJet } from '../../config/typesJet';

const PageProfile = () => {
  const navigate = useNavigate();
  const { account, logout } = useContextAuth();

  if (!account) return <PageNonexistent />;

  const handleClick = () => {
    navigate('/');
    logout();
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.jet}>
        <img
          className={styles.img}
          src={typesJet[getJetMostPlayed(account.stats)].imgJet}
          alt="jet"
        />
      </div>

      <div className={styles.card}>
        <div className={styles.wrapperName}>
          <h1 className={styles.name}>{account.userName}</h1>
          <p className={styles.email}>{account.email}</p>
          <p>{getFormattedTime(account.created)}</p>
          <button
            className={styles.btnLogout}
            onClick={handleClick}
            type="button"
          >
            Log out
          </button>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p>Wins</p>
            <p>{account.stats.wins}</p>
          </div>
          <div className={styles.stat}>
            <p>Loses</p>
            <p>{account.stats.loses}</p>
          </div>
          <div className={styles.stat}>
            <p>Draws</p>
            <p>{account.stats.draws}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

const getJetMostPlayed = (stats) => {
  let max = -1;
  let typeJet = '';

  for (const [prop, value] of Object.entries(stats)) {
    if (prop.startsWith('gamesWith')) {
      if (value > max) {
        max = value;
        typeJet = prop;
      }
    }
  }

  switch (typeJet) {
    case 'gamesWithBalanced':
      return 'balanced';

    case 'gamesWithSpeedster':
      return 'speedster';

    case 'gamesWithTrickster':
      return 'trickster';

    case 'gamesWithTank':
      return 'tank';

    case 'gamesWithLongLaster':
      return 'long-laster';

    case 'gamesWithFastBullet':
      return 'fast-bullet';

    default:
      console.error('No such jet');
      return 'balanced';
  }
};

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getFormattedTime = (time) => {
  const date = new Date(time);
  const text =
    `Joined ${date.getUTCDate()} ` +
    `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

  return text;
};

export default PageProfile;
