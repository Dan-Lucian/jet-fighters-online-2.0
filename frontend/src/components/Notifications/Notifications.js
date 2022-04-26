import { useEffect } from 'react';

// shared hooks
import useToggle from '../../hooks/useToggle';
import useAsync from '../../hooks/useAsync';
import { useContextAuth } from '../../providers/ProviderAuth';
import useOutsideClick from '../../hooks/useOutsideClick';

// services
import notificationService from '../../services/notification.service';

// assets
import srcBell from '../../assets/bell.svg';

// styles
import styles from './Notifications.module.scss';

// shared components
import WrapperNotifications from '../WrapperNotifications/WrapperNotifications';

const Notifications = () => {
  const { data: notificationsReceived, run } = useAsync();
  const [isActive, toggleIsActive] = useToggle(false);
  const { account } = useContextAuth();
  const [ref, isClickOutside] = useOutsideClick();

  useEffect(() => {
    if (isClickOutside) toggleIsActive(false);
  }, [isClickOutside, toggleIsActive]);

  useEffect(() => {
    if (account) run(notificationService.getNotifications(account.tokenJwt));
  }, [account, run]);

  const handleClickIcon = () => {
    toggleIsActive();
  };

  const classNameWrapper = `${styles.wrapper} ${
    isActive && styles['wrapper--active']
  }`;

  console.log('notificationsReceived: ', notificationsReceived);
  const numNotifications = notificationsReceived
    ? notificationsReceived.length
    : 0;

  return (
    <div ref={ref} className={classNameWrapper}>
      <button onClick={handleClickIcon} className={styles.button} type="button">
        <img
          width="22px"
          height="22px"
          src={srcBell}
          alt="magnifying glass"
          className={styles.icon}
        />
        {Boolean(numNotifications) && (
          <div className={styles.counter}>{numNotifications}</div>
        )}
      </button>
      {isActive && (
        <WrapperNotifications notifications={notificationsReceived || []} />
      )}
    </div>
  );
};

export default Notifications;
