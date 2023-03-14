import { IPlayer } from 'modules/Game/interfaces/IPlayer';

interface IGameSettings {
  maxScore: number;
}

export interface IGameState {
  owner: IPlayer;
  joiner: IPlayer;
  settings: IGameSettings;
}
