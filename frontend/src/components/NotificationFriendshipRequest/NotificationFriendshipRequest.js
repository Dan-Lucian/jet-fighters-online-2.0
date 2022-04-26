import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// styles
import styles from './NotificationFriendshipRequest.module.scss';

// shared components
import TimeAgo from '../TimeAgo/TimeAgo';

const propTypes = {
  notification: PropTypes.object.isRequired,
  tokenJwt: PropTypes.string.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

const NotificationFriendshipRequest = ({
  notification,
  tokenJwt,
  deleteNotification,
}) => {
  const { actor, created } = notification;

  const acceptFriendshipRequest = () => {
    console.log('Friendship accepted');
  };

  const declineFriendshipRequest = () => {
    console.log('Friendship declined');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperText}>
        <p>
          <Link to={`/profile/${actor}`} className={styles.link}>
            {actor}
          </Link>{' '}
          wants to be friends
        </p>
        <TimeAgo timestamp={created} />
      </div>
      <div className={styles.wrapperButtons}>
        <button
          onClick={acceptFriendshipRequest}
          className={`${styles.button} ${styles.accept}`}
          type="button"
        >
          Accept
        </button>
        <button
          onClick={declineFriendshipRequest}
          className={`${styles.button} ${styles.decline}`}
          type="button"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

NotificationFriendshipRequest.propTypes = propTypes;

export default NotificationFriendshipRequest;
