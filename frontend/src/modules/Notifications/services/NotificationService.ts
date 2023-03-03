import axios from 'axios';
import { authorize, decodeJwtToken } from 'utils/fetchUtils';
import { NotificationTypeEnum } from 'modules/Notifications/enums/NotificationTypeEnum';
import { getMockNotification } from 'modules/Notifications/utils/notificationsUtils';
import { INotification } from 'modules/Notifications/interfaces/INotification';

const BASE_URL = '/api/notifications';

// TODO: refactor to reduce code duplication, mybe decode jwt in account service upon jwt renewal
export class NotificationService {
  public static async getNotifications(jwtToken: string): Promise<INotification[]> {
    const { userName } = decodeJwtToken(jwtToken);
    const { data } = await axios.get<INotification[]>(`${BASE_URL}/${userName}`, authorize(jwtToken));
    return data;
  }

  public static async createNotification(jwtToken: string, type: NotificationTypeEnum): Promise<INotification> {
    const { userName } = decodeJwtToken(jwtToken);
    const { data } = await axios.post<INotification>(
      `${BASE_URL}/${userName}`,
      getMockNotification(type, userName),
      authorize(jwtToken)
    );
    return data;
  }

  public static async markNotificationAsRead(jwtToken: string, id: string): Promise<INotification> {
    const { userName } = decodeJwtToken(jwtToken);
    const { data } = await axios.post<INotification>(`${BASE_URL}/${userName}/read/${id}`, {}, authorize(jwtToken));
    return data;
  }
}
