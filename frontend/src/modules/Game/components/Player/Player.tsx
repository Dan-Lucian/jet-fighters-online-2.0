import { IPlayer } from 'modules/Game/interfaces/IPlayer';
import Styles from 'modules/Game/components/Player/Player.module.scss';

interface IPlayerProps {
  player: IPlayer;
}

const Player = ({ player }: IPlayerProps) => {
  const { name, score, type } = player;

  return (
    <div className={Styles.mainWrapper}>
      <div className={Styles.onlineStatusCircle} />
      <p className={Styles.name}>
        {name}: {score}
      </p>
      <p className={Styles.jetType}>Jet type: {type}</p>
      <div className={Styles.colorWrapper}>
        <p className={Styles.textColor}>Color:</p>
        <div style={{ backgroundColor: player.color }} className={Styles.colorSquare} />
      </div>
    </div>
  );
};

export default Player;
