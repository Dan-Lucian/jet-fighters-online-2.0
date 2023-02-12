import { JetTypeEnum } from 'config/enums/JetTypeEnum';
import { IStandartizedJetConfig } from 'config/interfaces/IStandartizedJetConfig';

export interface IAllStandartizedJetsConfig {
  [JetTypeEnum.Balanced]: IStandartizedJetConfig;
  [JetTypeEnum.Speedster]: IStandartizedJetConfig;
  [JetTypeEnum.Trickster]: IStandartizedJetConfig;
  [JetTypeEnum.Tank]: IStandartizedJetConfig;
  [JetTypeEnum.Micro]: IStandartizedJetConfig;
  [JetTypeEnum.FastBullet]: IStandartizedJetConfig;
}
