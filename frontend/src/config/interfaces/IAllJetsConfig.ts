import { JetTypeEnum } from 'config/enums/JetTypeEnum';
import { IJetConfig } from 'config/interfaces/IJetConfig';

export interface IAllJetsConfig {
  [JetTypeEnum.Balanced]: IJetConfig;
  [JetTypeEnum.Speedster]: IJetConfig;
  [JetTypeEnum.Trickster]: IJetConfig;
  [JetTypeEnum.Tank]: IJetConfig;
  [JetTypeEnum.Micro]: IJetConfig;
  [JetTypeEnum.FastBullet]: IJetConfig;
}
