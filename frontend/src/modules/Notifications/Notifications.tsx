import { useEffect, useCallback, useRef } from 'react';
import useToggle from 'hooks/useToggle';
import { AsyncStatusEnum, useAsync } from 'hooks/useAsync2';
import useOutsideClick from 'hooks/useOutsideClick';
import { useContextAuth } from 'providers/ProviderAuth';
import { NotificationService } from './services/NotificationService';
import bellIconSrc from 'assets/images/bell.svg';
import NotificationsWrapper from 'modules/Notifications/components/NotificationsWrapper/NotificationsWrapper';
import { NotificationsProvider } from 'modules/Notifications/providers/NotificationsProvider';
import { INotification } from './interfaces/INotification';
import { FixMeLater } from 'types/FixMeLater';
import Styles from 'modules/Notifications/Notifications.module.scss';
import { NOTIFICATION_REFRESH_INTERVAL } from 'modules/Notifications/config/notificationsConfig';

const Notifications = () => {
  // keeps track of deleted notifications
  const removedNotificationIds = useRef<string[]>([]);
  // keeps track of the last valid array of notifications because
  // during pending data is null
  const previousNotifications = useRef<INotification[]>([]);
  const [isActive, toggleIsActive] = useToggle(false);
  const { account }: FixMeLater = useContextAuth();
  const [ref, isClickOutside] = useOutsideClick();
  const {
    data: getNotificationsResponse,
    setData: setNotificationsResponse,
    run,
  } = useAsync<INotification[]>({ status: AsyncStatusEnum.Idle, data: [] });

  // sets up the periodic notification fetching
  useEffect(() => {
    if (!account) {
      setNotificationsResponse([]);
      previousNotifications.current = [];
      return;
    }

    run(NotificationService.getNotifications(account.tokenJwt));

    const interval = setInterval(() => {
      run(NotificationService.getNotifications(account.tokenJwt));
    }, NOTIFICATION_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [account, run, setNotificationsResponse]);

  // closes the menu if click outside happened
  useEffect(() => {
    if (isClickOutside) toggleIsActive(false);
  }, [isClickOutside, toggleIsActive]);

  // reverts to previously saved notification if current are null
  if (getNotificationsResponse) {
    previousNotifications.current = getNotificationsResponse;
  }

  // filters out previously deleted notifications which where closed during "pending" because
  // newly received data hasn't caught up with requests during "pending"
  const currentNotifications = previousNotifications.current.filter(
    (notification) => !removedNotificationIds.current.includes(notification.id)
  );

  // besides deleting a notifcation
  // it also keeps track of deleted notification
  const deleteNotificationById = useCallback(
    (id: string) => {
      removedNotificationIds.current.push(id);
      setNotificationsResponse(currentNotifications.filter((notification) => notification.id !== id));
    },
    [currentNotifications, setNotificationsResponse]
  );

  const wrapperClassName = `${Styles.wrapper} ${isActive && Styles['wrapper--active']}`;

  return (
    <div ref={ref} className={wrapperClassName}>
      <NotificationsProvider value={{ deleteNotificationById: deleteNotificationById }}>
        <button onClick={() => toggleIsActive()} className={Styles.button} type="button">
          <img width="22px" height="22px" src={bellIconSrc} alt="bell" className={Styles.icon} />
          {Boolean(currentNotifications.length) && <div className={Styles.counter}>{currentNotifications.length}</div>}
        </button>
        {isActive && <NotificationsWrapper notifications={currentNotifications} />}
      </NotificationsProvider>
    </div>
  );
};

export default Notifications;
