import PropTypes from 'prop-types';
import NotificationController from '../NotificationController/NotificationController';

// styles
import styles from './WrapperNotifications.module.scss';

const propTypes = {
  notifications: PropTypes.array.isRequired,
};

const WrapperNotifications = ({ notifications }) => {
  const areThereAnyNotifications = notifications.length > 0;

  return (
    <div className={styles.wrapperNotifications}>
      <h2 className={styles.title}>Notifications</h2>
      {!areThereAnyNotifications && (
        <div className={styles.noNotifications}>No notifications</div>
      )}
      {areThereAnyNotifications &&
        notifications.map((notification) => (
          <NotificationController
            key={notification.id}
            notification={notification}
          />
        ))}
    </div>
  );
};

WrapperNotifications.propTypes = propTypes;

export default WrapperNotifications;
