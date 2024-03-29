import NotificationController from 'modules/Notifications/components/NotificationController/NotificationController';
import { INotification } from 'modules/Notifications/interfaces/INotification';
import Styles from 'modules/Notifications/components/NotificationsWrapper/NotificationsWrapper.module.scss';
import { isArrayDefined } from 'utils/generalUtils';

interface INotificationsWrapperProps {
  notifications: INotification[];
}

const NotificationsWrapper = ({ notifications }: INotificationsWrapperProps) => {
  const areThereAnyNotifications = isArrayDefined(notifications);

  return (
    <div className={Styles.mainWrapper}>
      <h2 className={Styles.heading}>Notifications</h2>
      {!areThereAnyNotifications && <div className={Styles.noNotifications}>No notifications</div>}
      {areThereAnyNotifications &&
        notifications.map((notification) => (
          <NotificationController key={notification.id} notification={notification} />
        ))}
    </div>
  );
};

export default NotificationsWrapper;
