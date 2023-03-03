// assets
import blackJetImageSrc from 'assets/images/jet-000.webp';
import whiteJetImageSrc from 'assets/images/jet-fff.webp';
import greenJetImageSrc from 'assets/images/jet-66ff66.webp';
import purpleJetImageSrc from 'assets/images/jet-ff91ff.webp';
import yellowJetImageSrc from 'assets/images/jet-f4f445.webp';
import azureJetImageSrc from 'assets/images/jet-4ae9f7.webp';
import { JetHexColorEnum } from 'config/enums/JetHexColorEnum';
import { JetTypeEnum } from 'config/enums/JetTypeEnum';
import { IAllJetsConfig } from 'config/interfaces/IAllJetsConfig';
import { standartizeJetTypesConfig } from 'config/configUtils';

export const jetTypesConfig: IAllJetsConfig = {
  [JetTypeEnum.Balanced]: {
    type: JetTypeEnum.Balanced,
    sensitivityRotation: 3.5,
    speed: 4,
    color: JetHexColorEnum.Black,
    speedBullet: 7,
    timeAliveMaxBullet: 60,
    scale: 1,
    jetImageSrc: blackJetImageSrc,
  },
  [JetTypeEnum.Speedster]: {
    type: JetTypeEnum.Speedster,
    sensitivityRotation: 2.5,
    speed: 5,
    color: JetHexColorEnum.White,
    speedBullet: 8,
    timeAliveMaxBullet: 55,
    scale: 0.9,
    jetImageSrc: whiteJetImageSrc,
  },
  [JetTypeEnum.Trickster]: {
    type: JetTypeEnum.Trickster,
    sensitivityRotation: 4.5,
    speed: 3.5,
    color: JetHexColorEnum.Green,
    speedBullet: 7,
    timeAliveMaxBullet: 65,
    scale: 1.2,
    jetImageSrc: greenJetImageSrc,
  },
  [JetTypeEnum.Tank]: {
    type: JetTypeEnum.Tank,
    sensitivityRotation: 4.5,
    speed: 2,
    color: JetHexColorEnum.Purple,
    speedBullet: 9,
    timeAliveMaxBullet: 50,
    scale: 1.5,
    jetImageSrc: purpleJetImageSrc,
  },
  [JetTypeEnum.Micro]: {
    type: JetTypeEnum.Micro,
    sensitivityRotation: 3,
    speed: 3,
    color: JetHexColorEnum.Yellow,
    speedBullet: 6,
    timeAliveMaxBullet: 65,
    scale: 0.6,
    jetImageSrc: yellowJetImageSrc,
  },
  [JetTypeEnum.FastBullet]: {
    type: JetTypeEnum.FastBullet,
    sensitivityRotation: 3,
    speed: 4,
    color: JetHexColorEnum.Azure,
    speedBullet: 9,
    timeAliveMaxBullet: 50,
    scale: 0.8,
    jetImageSrc: azureJetImageSrc,
  },
};

// simillar to typesJet but the raw stat numbers are transformed into
// numbers relative to the stats of other jets
export const standartizedJetTypesConfig = standartizeJetTypesConfig(jetTypesConfig);
