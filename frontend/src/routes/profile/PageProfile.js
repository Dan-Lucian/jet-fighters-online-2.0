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

// local components
import JetFav from './components/JetFav';

// styles
import styles from './PageProfile.module.scss';

// assets
import { typesJet } from '../../config/typesJet';

const PageProfile = () => {
  console.log('I RENDERED');
  const navigate = useNavigate();
  const { status, data: dataReceived, run } = useAsync();
  const { account, logout, loading } = useContextAuth();

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

  const jetsSorted = sortJetsByGames(dataReceived.stats).slice(1, 4);

  return (
    <main className={styles.wrapper}>
      <div className={styles.jet}>
        <img
          className={styles.img}
          src={typesJet[jetsSorted[0][0]].imgJet}
          alt="jet"
        />
      </div>

      <div className={styles.card}>
        <section className={styles.wrapperName}>
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
        </section>

        <section className={styles.stats}>
          <div className={styles.wrapperWins}>
            <p>Wins</p>
            <p>{dataReceived.stats.total.wins}</p>
          </div>
          <div className={styles.wrapperLoses}>
            <p>Loses</p>
            <p>{dataReceived.stats.total.loses}</p>
          </div>
          <div className={styles.wrapperDraws}>
            <p>Draws</p>
            <p>{dataReceived.stats.total.draws}</p>
          </div>
        </section>

        <section className={styles.wrapperMostPlayed}>
          <h2 className={styles.heading}>Most played jets</h2>
          {jetsSorted.map((jet, idx) => (
            <JetFav
              key={idx}
              typeJet={jet[0]}
              wins={jet[1].wins}
              loses={jet[1].loses}
              draws={jet[1].draws}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

const sortJetsByGames = (jets) =>
  Object.entries(jets).sort(
    (x, y) =>
      y[1].wins +
      y[1].loses +
      y[1].draws -
      (x[1].wins + x[1].loses + x[1].draws)
  );

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
