import { MouseEvent } from 'react';
import Styles from 'components/Jet/Jet.module.scss';

interface IJetProps {
  imgJet: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Jet = ({ imgJet, onClick }: IJetProps) => {
  return (
    <button onClick={onClick} className={Styles.jet} type="button">
      <img width="48px" height="48px" src={imgJet} alt="jet" />
    </button>
  );
};

export default Jet;
