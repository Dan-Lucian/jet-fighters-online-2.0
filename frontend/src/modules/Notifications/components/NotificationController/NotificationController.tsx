import FriendshipRequestNotification from 'modules/Notifications/components/FriendshipRequestNotification/FriendshipRequestNotification';
import FriendshipResponseNotification from 'modules/Notifications/components/FriendshipResponseNotification/FriendshipResponseNotification';
import TextNotification from 'modules/Notifications/components/TextNotification/TextNotification';
import { INotification } from 'modules/Notifications/interfaces/INotification';
import { NotificationTypeEnum } from 'modules/Notifications/enums/NotificationTypeEnum';
import Styles from 'modules/Notifications/components/NotificationController/NotificationController.module.scss';

interface INotificationControllerProps {
  notification: INotification;
}

const NotificationController = ({ notification }: INotificationControllerProps) => {
  const { type } = notification;

  switch (type) {
    case NotificationTypeEnum.FriendshipRequest:
      return <FriendshipRequestNotification notification={notification} />;
    case NotificationTypeEnum.FriendshipResponse:
      return <FriendshipResponseNotification notification={notification} />;
    case NotificationTypeEnum.Welcome:
    case NotificationTypeEnum.FeatureNotReady:
      return <TextNotification notification={notification} />;
    default:
      return <div className={Styles.unknownNotification}>Uknown notification: {type}</div>;
  }
};

export default NotificationController;
