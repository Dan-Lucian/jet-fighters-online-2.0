import { MouseEvent } from 'react';
import Styles from 'components/Jet/Jet.module.scss';

interface IJetProps {
  jetImageSrc: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Jet = ({ jetImageSrc, onClick }: IJetProps) => {
  return (
    <button onClick={onClick} className={Styles.jet} type="button">
      <img width="48px" height="48px" src={jetImageSrc} alt="jet" />
    </button>
  );
};

export default Jet;
