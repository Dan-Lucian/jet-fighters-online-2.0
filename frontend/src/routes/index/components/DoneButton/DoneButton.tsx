import Styles from 'routes/index/components/DoneButton/DoneButton.module.scss';

interface IDoneButtonProps {
  onClick: () => void;
}

const DoneButton = ({ onClick }: IDoneButtonProps) => {
  return (
    <button onClick={onClick} className={Styles.btnDone} type="button">
      Done
    </button>
  );
};

export default DoneButton;
