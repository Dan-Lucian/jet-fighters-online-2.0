import { Link } from 'react-router-dom';
import { NotificationService } from 'modules/Notifications/services/NotificationService';
import TimeAgo from 'modules/Notifications/components/TimeAgo/TimeAgo';
import CloseNotificationButton from 'modules/Notifications/components/CloseNotificationButton/CloseNotificationButton';
import { INotification } from 'modules/Notifications/interfaces/INotification';
import Styles from 'modules/Notifications/components/FriendshipResponseNotification/FriendshipResponseNotification.module.scss';
import { useAuthContext } from 'modules/Auth/providers/AuthProvider';
import { useNotificationsContext } from 'modules/Notifications/providers/NotificationsProvider';
import { isDefined } from 'utils/generalTypeUtils';

interface IFriendshipResponseNotificationProps {
  notification: INotification;
}

const FriendshipResponseNotification = ({ notification }: IFriendshipResponseNotificationProps) => {
  const { deleteNotificationById } = useNotificationsContext();
  const { account } = useAuthContext();
  const { id, actor, created } = notification;

  const consumeNotifcation = () => {
    if (isDefined(account)) {
      NotificationService.markNotificationAsRead(account.tokenJwt, id);
      deleteNotificationById(id);
    }
  };

  return (
    <div className={Styles.wrapper}>
      <p>
        <Link to={`/profile/${actor}`} className={Styles.link}>
          {actor}
        </Link>{' '}
        accepted your friendship request
      </p>
      <TimeAgo timestamp={created} />
      <CloseNotificationButton onClick={consumeNotifcation} />
    </div>
  );
};

export default FriendshipResponseNotification;
