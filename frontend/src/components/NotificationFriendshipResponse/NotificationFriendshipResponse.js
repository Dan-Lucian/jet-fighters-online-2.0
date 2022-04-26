import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// styles
import styles from './NotificationFriendshipResponse.module.scss';

// shared components
import TimeAgo from '../TimeAgo/TimeAgo';

const propTypes = {
  notification: PropTypes.object.isRequired,
};

const NotificationFriendshipResponse = ({ notification }) => {
  const { actor, created } = notification;

  return (
    <div className={styles.wrapper}>
      <p>
        <Link to={`/profile/${actor}`} className={styles.link}>
          {actor}
        </Link>{' '}
        accepted your friendship request
      </p>
      <TimeAgo timestamp={created} />
    </div>
  );
};

NotificationFriendshipResponse.propTypes = propTypes;

export default NotificationFriendshipResponse;
