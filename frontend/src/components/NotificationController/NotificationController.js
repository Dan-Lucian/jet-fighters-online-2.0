import PropTypes from 'prop-types';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';
import { useContextNotifications } from '../../providers/ProviderNotifications';

// utils
import typesNotifications from '../../utils/type-notification';

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
  const { account } = useContextAuth();
  const { removeNotification } = useContextNotifications();

  const { type } = notification;
  const { tokenJwt } = account;

  if (type === typesNotifications.friendshipRequest)
    return (
      <NotificationFriendshipRequest
        notification={notification}
        tokenJwt={tokenJwt}
        removeNotification={removeNotification}
      />
    );

  if (type === typesNotifications.friendshipResponse)
    return (
      <NotificationFriendshipResponse
        notification={notification}
        tokenJwt={tokenJwt}
        removeNotification={removeNotification}
      />
    );

  if (type === typesNotifications.welcome)
    return (
      <NotificationText
        notification={notification}
        tokenJwt={tokenJwt}
        removeNotification={removeNotification}
      />
    );

  if (type === typesNotifications.featureNotReady)
    return (
      <NotificationText
        notification={notification}
        tokenJwt={tokenJwt}
        removeNotification={removeNotification}
      />
    );

  return <div className={styles.unknown}>Uknown notification: {type}</div>;
};

NotificationController.propTypes = propTypes;

export default NotificationController;
