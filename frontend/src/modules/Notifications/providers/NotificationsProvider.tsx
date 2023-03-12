import { createContext, useContext } from 'react';
import { IProviderProps } from 'interfaces/generalInterfaces';
import { isNull } from 'utils/generalTypeUtils';

interface INotificationsContextProps {
  deleteNotificationById: (id: string) => void;
}

const NotificationsContext = createContext<INotificationsContextProps | null>(null);
NotificationsContext.displayName = 'NotificationsContext';

export const NotificationsProvider = (props: IProviderProps<INotificationsContextProps>) => {
  return <NotificationsContext.Provider {...props} />;
};

export const useNotificationsContext = () => {
  const contextValue = useContext(NotificationsContext);

  if (isNull(contextValue)) {
    throw new Error('useNotificationsContext must be used within NotificationsProvider');
  }

  return contextValue;
};
