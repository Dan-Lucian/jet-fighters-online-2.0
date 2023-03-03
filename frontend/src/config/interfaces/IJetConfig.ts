import { JetHexColorEnum } from 'config/enums/JetHexColorEnum';
import { JetTypeEnum } from 'config/enums/JetTypeEnum';

export interface IJetConfig {
  type: JetTypeEnum;
  sensitivityRotation: number;
  speed: number;
  color: JetHexColorEnum;
  speedBullet: number;
  timeAliveMaxBullet: number;
  scale: number;
  jetImageSrc: string;
}
