import { useLayoutEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'hooks/useAsync2';
import { useContextAuth } from 'providers/ProviderAuth';
import { useContextGlobal } from 'providers/ProviderGlobal';
import accountService from 'services/account.service';
import Loader from 'components/Loader/Loader';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import JetFav from 'routes/profile/components/JetFav/JetFav';
import formatTime from 'utils/formatTime';
import { sumAllJetsStats, sortJetsDescendingByTotalGamesAmount } from 'routes/profile/utils/PageProfileUtils';
import styles from 'routes/profile/PageProfile.module.scss';
import { isFullProfileResponse } from 'routes/profile/utils/PageProfileTypeUtils';
import { FixMeLater } from 'types/FixMeLater';
import { IFullProfileResponse } from 'routes/profile/interfaces/IFullProfileResponse';
import { IJetStats } from 'routes/profile/interfaces/IAllJetsStats';
import { ISemiProfileResponse } from 'routes/profile/interfaces/ISemiProfileResponse';
import { typesJet } from 'config/typesJet';
import { JetTypeEnum } from 'enums/JetTypeEnum';

const PageProfile = () => {
  const [global, setGlobal] = useContextGlobal();
  const { account, logout, loading }: { account: FixMeLater; logout: FixMeLater; loading: FixMeLater } =
    useContextAuth();
  const { run, status, data: dataReceived } = useAsync<IFullProfileResponse | ISemiProfileResponse>();
  const jetsSorted = useRef<[JetTypeEnum, IJetStats][] | null>(null);
  const computedStats = useRef<IJetStats | null>(null);
  const { userName } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!loading) run(accountService.getByUserName(userName));
  }, [loading, run, userName]);

  const isWaiting = loading || status === 'pending' || status === 'idle';
  if (isWaiting) return <Loader />;
  if (!dataReceived) return <PageNonexistent />;

  const isHisAccount = isFullProfileResponse(dataReceived);

  if (!jetsSorted.current || !computedStats.current) {
    jetsSorted.current = sortJetsDescendingByTotalGamesAmount(dataReceived.stats).slice(1, 4);
    computedStats.current = sumAllJetsStats(jetsSorted.current);
  }

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  const handleFriendRequest = () => {
    // TODO:
    // if acc not logged prompt to register or login
    // after login/register return to this page

    if (!account) {
      // navigate('/login');
      // setGlobal({ ...global, pathBeforeLogin: pathname });
      setGlobal({
        ...global,
        msgPopup: `You have to login to add friends.`,
      });
      return;
    }

    accountService.sendFriendRequest(dataReceived.userName);
    // notificationService.createNotification(
    //   account.tokenJwt,
    //   typesNotifications.featureNotReady
    // );

    setGlobal({
      ...global,
      msgPopup: `We're still working on the friendship feature, thanks for your patience.`,
    });
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.wrapperJet}>
          <div className={styles.backgroundHalf} />
          <div className={styles.jet}>
            <img className={styles.img} src={typesJet[jetsSorted.current[0][0]].imgJet} alt="jet" />
          </div>
        </div>

        <section className={styles.wrapperName}>
          <h1 className={styles.name}>{dataReceived.userName}</h1>
          {isHisAccount && (
            <>
              <p className={styles.email}>{dataReceived.email}</p>
              <p>{formatTime(dataReceived.created)}</p>
              <button className={styles.btnLogout} onClick={handleLogout} type="button">
                Log out
              </button>
            </>
          )}
          {!isHisAccount && (
            <button className={styles.btnAddFriend} onClick={handleFriendRequest} type="button">
              Add friend
            </button>
          )}
        </section>

        <section className={styles.stats}>
          <div className={styles.wrapperWins}>
            <p>Wins</p>
            <p>{computedStats.current.wins}</p>
          </div>
          <div className={styles.wrapperLoses}>
            <p>Loses</p>
            <p>{computedStats.current.loses}</p>
          </div>
          <div className={styles.wrapperDraws}>
            <p>Draws</p>
            <p>{computedStats.current.draws}</p>
          </div>
        </section>

        <section className={styles.wrapperMostPlayed}>
          <h2 className={styles.heading}>Most played jets</h2>
          {jetsSorted.current.map((jet, idx) => (
            <JetFav key={idx} typeJet={jet[0]} wins={jet[1].wins} loses={jet[1].loses} draws={jet[1].draws} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default PageProfile;
