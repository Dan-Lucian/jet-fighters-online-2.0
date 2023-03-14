import Header from 'modules/Game/components/Header/Header';
import Player from 'modules/Game/components/Player/Player';
import Styles from 'modules/Game/components/PlayersTable/PlayersTable.module.scss';
import { IGameState } from 'modules/Game/interfaces/IGameState';

interface IPlayerTableProps {
  gameState: IGameState;
}

const TablePlayers = ({ gameState }: IPlayerTableProps) => {
  const { owner, joiner } = gameState;
  const { maxScore } = gameState.settings;

  return (
    <div className={Styles.table}>
      <Header text={`Max score: ${maxScore}`} />
      <Player player={owner} />
      <Player player={joiner} />
    </div>
  );
};

export default TablePlayers;
