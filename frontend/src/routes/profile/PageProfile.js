import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';
import { useAsync } from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

// shared components
import PageNonexistent from '../../components/PageNonexistent';
import Loader from '../../components/Loader';

// styles
import styles from './PageProfile.module.scss';

// assets
import { typesJet } from '../../config/typesJet';

const PageProfile = () => {
  console.log('I RENDERED');
  const navigate = useNavigate();
  const { status, data: dataReceived, run } = useAsync();
  const { account, logout, loading } = useContextAuth();
  debugger;

  useLayoutEffect(() => {
    // don't make request if no account
    if (!account) return;
    run(accountService.getById(account.id));
  }, [account]);

  const handleClick = () => {
    navigate('/');
    logout();
  };

  if (loading) return <Loader />;
  if (status === 'pending' || status === 'idle') return <Loader />;
  if (!account) return <PageNonexistent />;

  return (
    <main className={styles.wrapper}>
      <div className={styles.jet}>
        <img
          className={styles.img}
          src={typesJet[getJetMostPlayed(dataReceived.stats)].imgJet}
          alt="jet"
        />
      </div>

      <div className={styles.card}>
        <div className={styles.wrapperName}>
          <h1 className={styles.name}>{dataReceived.userName}</h1>
          <p className={styles.email}>{dataReceived.email}</p>
          <p>{getFormattedTime(dataReceived.created)}</p>
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
            <p>{dataReceived.stats.wins}</p>
          </div>
          <div className={styles.stat}>
            <p>Loses</p>
            <p>{dataReceived.stats.loses}</p>
          </div>
          <div className={styles.stat}>
            <p>Draws</p>
            <p>{dataReceived.stats.draws}</p>
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
