import { useEffect, useCallback, useRef } from 'react';

// shared hooks
import useToggle from '../../hooks/useToggle';
import useAsync from '../../hooks/useAsync';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useContextAuth } from '../../providers/ProviderAuth';

// services
import notificationService from '../../services/notification.service';

// assets
import srcBell from '../../assets/bell.svg';

// styles
import styles from './Notifications.module.scss';

// shared components
import WrapperNotifications from '../WrapperNotifications/WrapperNotifications';
import { ProviderNotifications } from '../../providers/ProviderNotifications';

const MS_DELAY = 30000;

const Notifications = () => {
  // keeps track of deleted notifications
  const idNotificationsRemoved = useRef([]);
  // keeps track of the last valid array of notifications because
  // during pending data is null
  const notificationsPrevious = useRef([]);
  const [isActive, toggleIsActive] = useToggle(false);
  const { account } = useContextAuth();
  const [ref, isClickOutside] = useOutsideClick();
  const {
    data: notificationsReceived,
    setData: setNotificationsReceived,
    run,
  } = useAsync({ status: 'idle', data: [] });

  // sets up the periodic notification fetching
  useEffect(() => {
    if (!account) {
      setNotificationsReceived([]);
      notificationsPrevious.current = [];
      return;
    }

    run(notificationService.getNotifications(account.tokenJwt));

    const interval = setInterval(() => {
      run(notificationService.getNotifications(account.tokenJwt));
    }, MS_DELAY);

    return () => clearInterval(interval);
  }, [account, run, setNotificationsReceived]);

  // closes the menu if click outside happened
  useEffect(() => {
    if (isClickOutside) toggleIsActive(false);
  }, [isClickOutside, toggleIsActive]);

  // reverts to previously saved notification if current are null
  if (notificationsReceived)
    notificationsPrevious.current = notificationsReceived;

  // filters out previously deleted notifications which where closed during "pending" because
  // newly received data hasn't caught up with requests during "pending"
  const notificationsCurrent = notificationsPrevious.current.filter(
    (notification) => !idNotificationsRemoved.current.includes(notification.id)
  );

  // besides deleting a notifcation
  // it also keeps track of deleted notification
  const deleteNotification = useCallback(
    (id) => {
      idNotificationsRemoved.current.push(id);
      setNotificationsReceived(
        notificationsCurrent.filter((notification) => notification.id !== id)
      );
    },
    [notificationsCurrent, setNotificationsReceived]
  );

  const classNameWrapper = `${styles.wrapper} ${
    isActive && styles['wrapper--active']
  }`;

  return (
    <div ref={ref} className={classNameWrapper}>
      <ProviderNotifications value={{ deleteNotification }}>
        <button
          onClick={() => toggleIsActive()}
          className={styles.button}
          type="button"
        >
          <img
            width="22px"
            height="22px"
            src={srcBell}
            alt="magnifying glass"
            className={styles.icon}
          />
          {Boolean(notificationsCurrent.length) && (
            <div className={styles.counter}>{notificationsCurrent.length}</div>
          )}
        </button>
        {isActive && (
          <WrapperNotifications notifications={notificationsCurrent} />
        )}
      </ProviderNotifications>
    </div>
  );
};

export default Notifications;
