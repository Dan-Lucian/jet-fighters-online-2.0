import { NotificationService } from 'modules/Notifications/services/NotificationService';
import TimeAgo from 'modules/Notifications/components/TimeAgo/TimeAgo';
import CloseNotificationButton from 'modules/Notifications/components/CloseNotificationButton/CloseNotificationButton';
import { INotification } from 'modules/Notifications/interfaces/INotification';
import { useNotificationsContext } from 'modules/Notifications/providers/NotificationsProvider';
import { useContextAuth } from 'providers/ProviderAuth';
import { FixMeLater } from 'types/FixMeLater';
import Styles from 'modules/Notifications/components/TextNotification/TextNotification.module.scss';

interface ITextNotificationProps {
  notification: INotification;
}

const TextNotification = ({ notification }: ITextNotificationProps) => {
  const { deleteNotificationById } = useNotificationsContext();
  const { account }: FixMeLater = useContextAuth();
  const { id, created, content } = notification;

  const consumeNotifcation = () => {
    NotificationService.markNotificationAsRead(account.tokenJwt, id);
    deleteNotificationById(id);
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
