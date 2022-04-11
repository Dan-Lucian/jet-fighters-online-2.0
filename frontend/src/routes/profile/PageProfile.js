import { useLayoutEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';
import { useContextGlobal } from '../../providers/ProviderGlobal';
import useAsync from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

// shared components
import PageNonexistent from '../../components/PageNonexistent';
import Loader from '../../components/Loader';

// local components
import JetFav from './components/JetFav';

// utils
import getFormattedTime from './utils/getFormatedTime';
import sortJetsByGames from './utils/sortJetsByGames';

// styles
import styles from './PageProfile.module.scss';

// assets
import { typesJet } from '../../config/typesJet';

const PageProfile = () => {
  const { account, logout, loading } = useContextAuth();
  const { status, data: dataReceived, run } = useAsync();
  const jetsSorted = useRef(null);
  const { userName } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [dataGlobal, setDataGlobal] = useContextGlobal();

  useLayoutEffect(() => {
    if (!loading) run(accountService.getByUserName(userName));
  }, [loading, run, userName]);

  const isWaiting = loading || status === 'pending' || status === 'idle';
  if (isWaiting) return <Loader />;
  if (!dataReceived) return <PageNonexistent />;

  const isHisAccount = userName === account?.userName;
  if (!jetsSorted.current) {
    jetsSorted.current = sortJetsByGames(dataReceived.stats).slice(1, 4);
  }

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  const handleFriendRequest = () => {
    if (!account) {
      navigate('/login');
      setDataGlobal({ ...dataGlobal, pathBeforeLogin: pathname });
      return;
    }
    // if acc not logged prompt to register or login
    // make lobby entry error to show error popup
    accountService.sendFriendRequest(dataReceived.userName);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.wrapperJet}>
          <div className={styles.backgroundHalf} />
          <div className={styles.jet}>
            <img
              className={styles.img}
              src={typesJet[jetsSorted.current[0][0]].imgJet}
              alt="jet"
            />
          </div>
        </div>

        <section className={styles.wrapperName}>
          <h1 className={styles.name}>{dataReceived.userName}</h1>
          {isHisAccount && (
            <>
              <p className={styles.email}>{dataReceived.email}</p>
              <p>{getFormattedTime(dataReceived.created)}</p>
              <button
                className={styles.btnLogout}
                onClick={handleLogout}
                type="button"
              >
                Log out
              </button>
            </>
          )}
          {!isHisAccount && (
            <button
              className={styles.btnAddFriend}
              onClick={handleFriendRequest}
              type="button"
            >
              Add friend
            </button>
          )}
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
          {jetsSorted.current.map((jet, idx) => (
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

export default PageProfile;
