import { NotificationTypeEnum } from 'modules/Notifications/enums/NotificationTypeEnum';

// TODO: make a base notification interface which will be extended by other specific notifications
export interface INotification {
  id: string;
  actor: string;
  content: string;
  created: string;
  type: NotificationTypeEnum;
}
