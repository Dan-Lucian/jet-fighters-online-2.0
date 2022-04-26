import PropTypes from 'prop-types';

// styles
import styles from './NotificationText.module.scss';

// shared components
import TimeAgo from '../TimeAgo/TimeAgo';

const propTypes = {
  notification: PropTypes.object.isRequired,
};

const NotificationText = ({ notification }) => {
  const { content, created } = notification;

  return (
    <div className={styles.wrapper}>
      <p>{content}</p>
      <TimeAgo timestamp={created} />
    </div>
  );
};

NotificationText.propTypes = propTypes;

export default NotificationText;
