import { jetTypesConfig } from 'config/jetTypesConfig';
import Jet from 'components/Jet/Jet';
import Styles from 'modules/Profile/components/FavouriteJet/FavouriteJet.module.scss';
import { JetTypeEnum } from 'config/enums/JetTypeEnum';
import { capitalize } from 'utils/generalUtils';

interface IFavouriteJetProps {
  jetType: JetTypeEnum;
  wins: number;
  loses: number;
  draws: number;
}

const FavouriteJet = ({ jetType, wins, loses, draws }: IFavouriteJetProps) => {
  const total = wins + loses + draws;

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.jetWrapper}>
        <Jet onClick={() => {}} jetImageSrc={jetTypesConfig[jetType].jetImageSrc} />
        <div className={Styles.jetTypeWrapper}>
          <p>{capitalize(jetType)}</p>
          <p className={Styles.games}>{total} games</p>
        </div>
      </div>
      <div className={Styles.stats}>
        <p className={Styles.wins}>{wins}W</p>
        <p className={Styles.loses}>{loses}L</p>
        <p className={Styles.draws}>{draws}D</p>
      </div>
    </div>
  );
};

export default FavouriteJet;
