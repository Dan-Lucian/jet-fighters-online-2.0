import { IAllJetsStats } from 'routes/profile/interfaces/IAllJetsStats';

export interface ISemiProfileResponse {
  id: string;
  userName: string;
  stats: IAllJetsStats;
}
