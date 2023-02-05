import { useLayoutEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'hooks/useAsync2';
import { useContextAuth } from 'providers/ProviderAuth';
import { useContextGlobal } from 'providers/ProviderGlobal';
import accountService from 'services/account.service';
import Loader from 'components/Loader/Loader';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import FavouriteJet from 'routes/profile/components/FavouriteJet/FavouriteJet';
import formatTime from 'utils/formatTime';
import { sumAllJetsStats, sortJetsDescendingByTotalGamesAmount } from 'routes/profile/utils/PageProfileUtils';
import Styles from 'routes/profile/PageProfile.module.scss';
import { isFullProfileResponse } from 'routes/profile/utils/PageProfileTypeUtils';
import { FixMeLater } from 'types/FixMeLater';
import { IFullProfileResponse } from 'routes/profile/interfaces/IFullProfileResponse';
import { IJetStats } from 'routes/profile/interfaces/IAllJetsStats';
import { ISemiProfileResponse } from 'routes/profile/interfaces/ISemiProfileResponse';
import { jetTypesConfig } from 'config/jetTypesConfig';
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
    <main className={Styles.wrapper}>
      <div className={Styles.card}>
        <div className={Styles.wrapperJet}>
          <div className={Styles.backgroundHalf} />
          <div className={Styles.jet}>
            <img className={Styles.img} src={jetTypesConfig[jetsSorted.current[0][0]].imgJet} alt="jet" />
          </div>
        </div>

        <section className={Styles.wrapperName}>
          <h1 className={Styles.name}>{dataReceived.userName}</h1>
          {isHisAccount && (
            <>
              <p className={Styles.email}>{dataReceived.email}</p>
              <p>{formatTime(dataReceived.created)}</p>
              <button className={Styles.btnLogout} onClick={handleLogout} type="button">
                Log out
              </button>
            </>
          )}
          {!isHisAccount && (
            <button className={Styles.btnAddFriend} onClick={handleFriendRequest} type="button">
              Add friend
            </button>
          )}
        </section>

        <section className={Styles.stats}>
          <div className={Styles.wrapperWins}>
            <p>Wins</p>
            <p>{computedStats.current.wins}</p>
          </div>
          <div className={Styles.wrapperLoses}>
            <p>Loses</p>
            <p>{computedStats.current.loses}</p>
          </div>
          <div className={Styles.wrapperDraws}>
            <p>Draws</p>
            <p>{computedStats.current.draws}</p>
          </div>
        </section>

        <section className={Styles.wrapperMostPlayed}>
          <h2 className={Styles.heading}>Most played jets</h2>
          {jetsSorted.current.map((jet, idx) => (
            <FavouriteJet key={idx} jetType={jet[0]} wins={jet[1].wins} loses={jet[1].loses} draws={jet[1].draws} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default PageProfile;
