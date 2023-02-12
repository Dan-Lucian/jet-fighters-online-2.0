import { IAllJetsStats } from 'config/interfaces/IAllJetsStats';

export interface ISemiProfileResponse {
  id: string;
  userName: string;
  stats: IAllJetsStats;
}
