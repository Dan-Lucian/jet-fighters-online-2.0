import { ArrowDirectionEnum } from 'routes/index/components/ArrowButton/enums/ArrowDirectionEnum';
import Styles from 'routes/index/components/ArrowButton/ArrowButton.module.scss';

interface IArrowButtonProps {
  direction: ArrowDirectionEnum;
  onClick: () => void;
}

const ArrowButton = ({ direction, onClick }: IArrowButtonProps) => {
  return (
    <button onClick={onClick} className={Styles.arrowButton} type="button">
      {direction}
    </button>
  );
};

export default ArrowButton;
