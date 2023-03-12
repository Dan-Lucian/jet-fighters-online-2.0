import { IJetStats } from 'config/interfaces/IAllJetsStats';
import { UserRoleEnum } from 'modules/Auth/enums/UserRoleEnum';

export interface IAccount {
  created: string;
  email: string;
  id: string;
  isVerfified: boolean;
  role: UserRoleEnum;
  stats: IJetStats;
  tokenJwt: string;
  userName: string;
}
