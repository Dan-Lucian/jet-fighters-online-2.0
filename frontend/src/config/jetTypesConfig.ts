// assets
import ImgJetBlack from 'assets/images/jet-000.webp';
import ImgJetWhite from 'assets/images/jet-fff.webp';
import ImgJetGreen from 'assets/images/jet-66ff66.webp';
import ImgJetPurple from 'assets/images/jet-ff91ff.webp';
import ImgJetYellow from 'assets/images/jet-f4f445.webp';
import ImgJetAzure from 'assets/images/jet-4ae9f7.webp';
import { JetHexColorEnum } from 'config/enums/JetHexColorEnum';
import { JetTypeEnum } from 'config/enums/JetTypeEnum';
import { IAllJetsConfig } from 'config/interfaces/IAllJetsConfig';
import { standartizeJetTypesConfig } from './ConfigUtils';

export const jetTypesConfig: IAllJetsConfig = {
  [JetTypeEnum.Balanced]: {
    type: JetTypeEnum.Balanced,
    sensitivityRotation: 3.5,
    speed: 4,
    color: JetHexColorEnum.Black,
    speedBullet: 7,
    timeAliveMaxBullet: 60,
    scale: 1,
    imgJet: ImgJetBlack,
  },
  [JetTypeEnum.Speedster]: {
    type: JetTypeEnum.Speedster,
    sensitivityRotation: 2.5,
    speed: 5,
    color: JetHexColorEnum.White,
    speedBullet: 8,
    timeAliveMaxBullet: 55,
    scale: 0.9,
    imgJet: ImgJetWhite,
  },
  [JetTypeEnum.Trickster]: {
    type: JetTypeEnum.Trickster,
    sensitivityRotation: 4.5,
    speed: 3.5,
    color: JetHexColorEnum.Green,
    speedBullet: 7,
    timeAliveMaxBullet: 65,
    scale: 1.2,
    imgJet: ImgJetGreen,
  },
  [JetTypeEnum.Tank]: {
    type: JetTypeEnum.Tank,
    sensitivityRotation: 4.5,
    speed: 2,
    color: JetHexColorEnum.Purple,
    speedBullet: 9,
    timeAliveMaxBullet: 50,
    scale: 1.5,
    imgJet: ImgJetPurple,
  },
  [JetTypeEnum.Micro]: {
    type: JetTypeEnum.Micro,
    sensitivityRotation: 3,
    speed: 3,
    color: JetHexColorEnum.Yellow,
    speedBullet: 6,
    timeAliveMaxBullet: 65,
    scale: 0.6,
    imgJet: ImgJetYellow,
  },
  [JetTypeEnum.FastBullet]: {
    type: JetTypeEnum.FastBullet,
    sensitivityRotation: 3,
    speed: 4,
    color: JetHexColorEnum.Azure,
    speedBullet: 9,
    timeAliveMaxBullet: 50,
    scale: 0.8,
    imgJet: ImgJetAzure,
  },
};

// simillar to typesJet but the raw stat numbers are transformed into
// numbers relative to the stats of other jets
export const standartizedJetTypesConfig = standartizeJetTypesConfig(jetTypesConfig);
