import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// services
import notificationService from '../../services/notification.service';

// styles
import styles from './NotificationFriendshipResponse.module.scss';

// shared components
import TimeAgo from '../TimeAgo/TimeAgo';
import CloseNotificationButton from '../CloseNotificationButton/CloseNotificationButton';

const propTypes = {
  notification: PropTypes.object.isRequired,
  tokenJwt: PropTypes.string.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};
const NotificationFriendshipResponse = ({ notification, tokenJwt, deleteNotification }) => {
  const { actor, created, id } = notification;

  const handleClick = () => {
    notificationService.markNotificationAsRead(tokenJwt, id);
    deleteNotification(id);
  };

  return (
    <div className={styles.wrapper}>
      <p>
        <Link to={`/profile/${actor}`} className={styles.link}>
          {actor}
        </Link>{' '}
        accepted your friendship request
      </p>
      <TimeAgo timestamp={created} />
      <CloseNotificationButton onClick={handleClick} />
    </div>
  );
};

NotificationFriendshipResponse.propTypes = propTypes;

export default NotificationFriendshipResponse;
