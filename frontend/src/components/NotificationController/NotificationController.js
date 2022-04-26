import PropTypes from 'prop-types';

// utils
import typeNotification from '../../utils/type-notification';

// styles
import styles from './NotificationController.module.scss';

// shared components
import NotificationFriendshipRequest from '../NotificationFriendshipRequest/NotificationFriendshipRequest';
import NotificationFriendshipResponse from '../NotificationFriendshipResponse/NotificationFriendshipResponse';
import NotificationText from '../NotificationText/NotificationText';

const propTypes = {
  notification: PropTypes.object,
};

const NotificationController = ({ notification }) => {
  const { type } = notification;

  if (type === typeNotification.friendshipRequest)
    return <NotificationFriendshipRequest notification={notification} />;

  if (type === typeNotification.friendshipResponse)
    return <NotificationFriendshipResponse notification={notification} />;

  if (type === typeNotification.welcome)
    return <NotificationText notification={notification} />;

  return <div className={styles.wrapper}>Uknown notification: {type}</div>;
};

NotificationController.propTypes = propTypes;

export default NotificationController;
