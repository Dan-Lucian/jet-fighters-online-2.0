import { IAllJetsStats } from 'routes/profile/interfaces/IAllJetsStats';

export interface IFullProfileResponse {
  id: string;
  userName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date;
  isVerified: boolean;
  stats: IAllJetsStats;
}
