import PropTypes from 'prop-types';

// services
import notificationService from '../../services/notification.service';

// styles
import styles from './NotificationText.module.scss';

// shared components
import TimeAgo from '../TimeAgo/TimeAgo';
import ButtonCloseNotification from '../ButtonCloseNotification/ButtonCloseNotification';

const propTypes = {
  notification: PropTypes.object.isRequired,
  tokenJwt: PropTypes.string.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

const NotificationText = ({ notification, tokenJwt, deleteNotification }) => {
  const { id, content, created } = notification;

  const handleClick = () => {
    notificationService.markNotificationAsRead(tokenJwt, id);
    deleteNotification(id);
  };

  return (
    <div className={styles.wrapper}>
      <p>{content}</p>
      <TimeAgo timestamp={created} />
      <ButtonCloseNotification onClick={handleClick} />
    </div>
  );
};

NotificationText.propTypes = propTypes;

export default NotificationText;
