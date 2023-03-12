import { NotificationService } from 'modules/Notifications/services/NotificationService';
import TimeAgo from 'modules/Notifications/components/TimeAgo/TimeAgo';
import CloseNotificationButton from 'modules/Notifications/components/CloseNotificationButton/CloseNotificationButton';
import { INotification } from 'modules/Notifications/interfaces/INotification';
import { useNotificationsContext } from 'modules/Notifications/providers/NotificationsProvider';
import { useAuthContext } from 'modules/Auth/providers/AuthProvider';
import Styles from 'modules/Notifications/components/TextNotification/TextNotification.module.scss';
import { isDefined } from 'utils/generalTypeUtils';

interface ITextNotificationProps {
  notification: INotification;
}

const TextNotification = ({ notification }: ITextNotificationProps) => {
  const { deleteNotificationById } = useNotificationsContext();
  const { account } = useAuthContext();
  const { id, created, content } = notification;

  const consumeNotifcation = () => {
    if (isDefined(account)) {
      NotificationService.markNotificationAsRead(account.tokenJwt, id);
      deleteNotificationById(id);
    }
  };

  return (
    <div className={Styles.wrapper}>
      <p>{content}</p>
      <TimeAgo timestamp={created} />
      <CloseNotificationButton onClick={consumeNotifcation} />
    </div>
  );
};

export default TextNotification;
