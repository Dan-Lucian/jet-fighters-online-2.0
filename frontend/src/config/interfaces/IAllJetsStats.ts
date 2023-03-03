import { JetTypeEnum } from 'config/enums/JetTypeEnum';

export interface IJetStats {
  wins: number;
  loses: number;
  draws: number;
}

export interface IAllJetsStats {
  [JetTypeEnum.Balanced]: IJetStats;
  [JetTypeEnum.FastBullet]: IJetStats;
  [JetTypeEnum.Micro]: IJetStats;
  [JetTypeEnum.Speedster]: IJetStats;
  [JetTypeEnum.Tank]: IJetStats;
  [JetTypeEnum.Trickster]: IJetStats;
}
