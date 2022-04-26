import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// services
import notificationService from '../../services/notification.service';

// styles
import styles from './NotificationFriendshipResponse.module.scss';

// shared components
import TimeAgo from '../TimeAgo/TimeAgo';
import ButtonCloseNotification from '../ButtonCloseNotification/ButtonCloseNotification';

const propTypes = {
  notification: PropTypes.object.isRequired,
  tokenJwt: PropTypes.string.isRequired,
  removeNotification: PropTypes.func.isRequired,
};
const NotificationFriendshipResponse = ({
  notification,
  tokenJwt,
  removeNotification,
}) => {
  const { actor, created, id } = notification;

  const handleClick = () => {
    notificationService.markNotificationAsRead(tokenJwt, id);
    removeNotification(id);
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
      <ButtonCloseNotification onClick={handleClick} />
    </div>
  );
};

NotificationFriendshipResponse.propTypes = propTypes;

export default NotificationFriendshipResponse;
