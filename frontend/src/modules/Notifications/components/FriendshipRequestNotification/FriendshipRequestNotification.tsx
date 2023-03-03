import { Link } from 'react-router-dom';
import TimeAgo from 'modules/Notifications/components/TimeAgo/TimeAgo';
import { INotification } from 'modules/Notifications/interfaces/INotification';
import Styles from 'modules/Notifications/components/FriendshipRequestNotification/FriendshipRequestNotification.module.scss';

interface IFriendshipRequestNotificationProps {
  notification: INotification;
}

const FriendshipRequestNotification = ({ notification }: IFriendshipRequestNotificationProps) => {
  const { actor, created } = notification;

  const acceptFriendshipRequest = () => {
    console.log('Friendship accepted');
  };

  const declineFriendshipRequest = () => {
    console.log('Friendship declined');
  };

  return (
    <div className={Styles.mainWrapper}>
      <div className={Styles.textWrapper}>
        <p>
          <Link to={`/profile/${actor}`} className={Styles.link}>
            {actor}
          </Link>{' '}
          wants to be friends
        </p>
        <TimeAgo timestamp={created} />
      </div>
      <div className={Styles.buttonsWrapper}>
        <button onClick={acceptFriendshipRequest} className={`${Styles.button} ${Styles.acceptButton}`} type="button">
          Accept
        </button>
        <button onClick={declineFriendshipRequest} className={`${Styles.button} ${Styles.declineButton}`} type="button">
          Decline
        </button>
      </div>
    </div>
  );
};

export default FriendshipRequestNotification;
