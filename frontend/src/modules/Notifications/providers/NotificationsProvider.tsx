import { IProviderProps } from 'interfaces/GeneralInterfaces';
import { createContext, useContext } from 'react';

interface INotificationsContextProps {
  deleteNotificationById: (id: string) => void;
}

const NotificationsContext = createContext<INotificationsContextProps | null>(null);
NotificationsContext.displayName = 'NotificationsContext';

export const NotificationsProvider = (props: IProviderProps<INotificationsContextProps>) => {
  return <NotificationsContext.Provider {...props} />;
};

export const useNotificationsContext = () => {
  const data = useContext(NotificationsContext);
  if (data === null) throw new Error('useNotificationsContext must be used within NotificationsProvider');

  return data;
};
