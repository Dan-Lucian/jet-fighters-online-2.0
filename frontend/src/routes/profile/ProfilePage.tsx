import { useLayoutEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AsyncStatusEnum, useAsync } from 'hooks/useAsync2';
import { useAuthContext } from 'modules/Auth/providers/AuthProvider';
import { useContextGlobal } from 'providers/ProviderGlobal';
import { AccountService } from 'modules/Auth/services/AccountService';
import Loader from 'components/Loader/Loader';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import FavouriteJet from 'routes/profile/components/FavouriteJet/FavouriteJet';
import formatTime from 'utils/formatTime';
import { sumAllJetsStats, sortJetsDescendingByTotalGamesAmount } from 'routes/profile/utils/ProfilePageUtils';
import Styles from 'routes/profile/ProfilePage.module.scss';
import { isFullProfileResponse } from 'routes/profile/utils/ProfilePageTypeUtils';
import { FixMeLater } from 'types/FixMeLater';
import { IFullProfileResponse } from 'routes/profile/interfaces/IFullProfileResponse';
import { IJetStats } from 'config/interfaces/IAllJetsStats';
import { ISemiProfileResponse } from 'routes/profile/interfaces/ISemiProfileResponse';
import { jetTypesConfig } from 'config/jetTypesConfig';
import { JetTypeEnum } from 'config/enums/JetTypeEnum';
import { isDefined, isStringDefined } from 'utils/generalTypeUtils';
import { accountService } from 'services/GlobalServices';

// TODO: code styles fixes
const ProfilePage = () => {
  const [global, setGlobal] = useContextGlobal();
  const { account, logout, loading }: FixMeLater = useAuthContext();
  const { run, status, data: profileData } = useAsync<IFullProfileResponse | ISemiProfileResponse>();
  const sortedJets = useRef<[JetTypeEnum, IJetStats][] | null>(null);
  const allJetsStatsSummedUp = useRef<IJetStats | null>(null);
  const { userName } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!loading && isStringDefined(userName)) {
      run(accountService.getByUserName(userName));
    }
  }, [loading, run, userName]);

  const isWaiting = loading || status === AsyncStatusEnum.Pending || status === AsyncStatusEnum.Idle;
  if (isWaiting) return <Loader />;
  if (!isDefined(profileData)) return <PageNonexistent />;

  const isHisAccount = isFullProfileResponse(profileData);

  if (!sortedJets.current || !allJetsStatsSummedUp.current) {
    sortedJets.current = sortJetsDescendingByTotalGamesAmount(profileData.stats).slice(1, 4);
    allJetsStatsSummedUp.current = sumAllJetsStats(sortedJets.current);
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

    AccountService.sendFriendRequest(profileData.userName);
    // NotificationService.createNotification(
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
        <div className={Styles.jetWrapper}>
          <div className={Styles.backgroundFiller} />
          <div className={Styles.jet}>
            <img className={Styles.img} src={jetTypesConfig[sortedJets.current[0][0]].jetImageSrc} alt="jet" />
          </div>
        </div>

        <section className={Styles.nameWrapper}>
          <h1 className={Styles.name}>{profileData.userName}</h1>
          {isHisAccount && (
            <>
              <p className={Styles.email}>{profileData.email}</p>
              <p>{formatTime(profileData.created)}</p>
              <button className={Styles.logoutButton} onClick={handleLogout} type="button">
                Log out
              </button>
            </>
          )}
          {!isHisAccount && (
            <button className={Styles.addFriendButton} onClick={handleFriendRequest} type="button">
              Add friend
            </button>
          )}
        </section>

        <section className={Styles.stats}>
          <div className={Styles.winsWrapper}>
            <p>Wins</p>
            <p>{allJetsStatsSummedUp.current.wins}</p>
          </div>
          <div className={Styles.losesWrapper}>
            <p>Loses</p>
            <p>{allJetsStatsSummedUp.current.loses}</p>
          </div>
          <div className={Styles.drawsWrapper}>
            <p>Draws</p>
            <p>{allJetsStatsSummedUp.current.draws}</p>
          </div>
        </section>

        <section className={Styles.mostPlayedJetsWrapper}>
          <h2 className={Styles.heading}>Most played jets</h2>
          {sortedJets.current.map((jet, idx) => (
            <FavouriteJet key={idx} jetType={jet[0]} wins={jet[1].wins} loses={jet[1].loses} draws={jet[1].draws} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
