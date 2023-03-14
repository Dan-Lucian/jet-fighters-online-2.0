import { JetTypeEnum } from 'config/enums/JetTypeEnum';
import { JetHexColorEnum } from 'config/enums/JetHexColorEnum';

export interface IPlayer {
  name: string;
  score: string;
  color: JetHexColorEnum;
  type: JetTypeEnum;
}
